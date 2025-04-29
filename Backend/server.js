const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const oracledb = require("oracledb");
const sequelize = require("./config/database");
const forumRoutes = require("./routes/forum.routes"); // ← se mantiene
const normalizeKeys = require("./src/middlewares/normalizeKeys");
console.log("normalizeKeys: ", normalizeKeys);

const app = express();
app.use(cors());
app.use(express.json());
app.use(normalizeKeys);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("typeof forumRoutes:", typeof forumRoutes);
console.log(
  "forumRoutes === express.Router instance?",
  forumRoutes instanceof require("express").Router,
);

app.use("/api/forum", forumRoutes);
app.use((_, res, next) => {
  res.type("application/json");
  next();
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function initPool() {
  await oracledb.createPool({
    user: "uach_as",
    password: "password",
    connectString: "localhost/XEPDB1",
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 2,
  });
  console.log("🏛️  Oracle pool creado");
}

// Reemplaza ? → :b0, :b1…  y crea binds
function prepareBinds(sql, params = []) {
  let i = 0,
    binds = {};
  const parsed = sql.replace(/\?/g, () => {
    const k = "b" + i;
    binds[k] = params[i++];
    return ":" + k;
  });
  return { sql: parsed, binds };
}

// Ejecuta queries al "parsear" los binds (variables) y parametros
async function runQuery(sql, params = [], opts = {}) {
  const { sql: parsed, binds } = prepareBinds(sql, params);
  const conn = await oracledb.getConnection();
  try {
    return await conn.execute(parsed, binds, { autoCommit: true, ...opts });
  } finally {
    await conn.close();
  }
}

// Crea una transaccion para poder dar rollback en caso de fallo
async function runTx(callback) {
  const conn = await oracledb.getConnection();
  try {
    await callback(conn);
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    await conn.close();
  }
}
initPool().catch((e) => {
  console.error("Pool error:", e);
  process.exit(1);
});

// Multer para los formatos de las imagenes
const allowedImg = [".jpg", ".jpeg", ".png"];
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads"),
  filename: (_, f, cb) => cb(null, Date.now() + path.extname(f.originalname)),
});
const upload = multer({
  storage,
  fileFilter: (_, file, cb) =>
    allowedImg.includes(path.extname(file.originalname).toLowerCase()) ||
    path.extname(file.originalname).toLowerCase() === ".pdf"
      ? cb(null, true)
      : cb(new Error("Solo imágenes JPG/PNG o PDF"), false),
});

// Login al hacer queries en los usuarios
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = `
    SELECT 'admin' AS role, admin_id AS id, contrasena AS password,
           nombre AS name, perfil AS profilepicture, apellido1 AS lastname, rol AS rol
      FROM administrador WHERE LOWER(correo)=LOWER(?)
    UNION
    SELECT 'student', matricula, contra_alum, nombre, perfil, ape1, rol
      FROM alumnos WHERE LOWER(correo)=LOWER(?)
    UNION
    SELECT 'teacher', id_docente, contra_docente, nombre_doc, perfil, apellido, rol_doc
      FROM docentes WHERE LOWER(correo)=LOWER(?)`;
  try {
    const r = await runQuery(sql, [email, email, email]);
    if (!r.rows.length)
      return res.status(401).json({ message: "Correo incorrecto" });
    const u = r.rows[0];
    if (!bcrypt.compareSync(password, u.PASSWORD))
      return res.status(401).json({ message: "Contraseña incorrecta" });
    const token = jwt.sign(
      {
        id: u.ID,
        role: u.ROLE,
        name: u.NAME,
        lastName: u.LASTNAME,
        rol: u.ROL,
      },
      "tu_secreto",
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error", error: e });
  }
});

// -- Asesorias
// Obtener asesorias de un alumno
app.get("/asesorias/alumno/:id", async (req, res) => {
  const sql = `
    SELECT a.id_as,h.dia,h.hora_inicio,
           d.nombre_doc AS nombre_docente,d.apellido AS apellido_docente,
           m.n_mat AS nombre_materia,
           CASE WHEN a.modalidad=1 THEN 'Presencial' ELSE 'Virtual' END AS modalidad
      FROM asesorias a
      JOIN docente_horario dh ON a.id_docente_horario=dh.id_docente_horario
      JOIN horarios h         ON dh.id_horario       =h.id_horario
      JOIN docentes d         ON dh.id_docente       =d.id_docente
      JOIN materias m         ON a.id_materia        =m.id_materia
     WHERE a.id_alumno = ?`;
  try {
    res.json((await runQuery(sql, [req.params.id])).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener asesorias de un docente
app.get("/asesorias/docente/:id", async (req, res) => {
  const sql = `
    SELECT a.id_as,a.id_docente_horario,h.dia,h.hora_inicio,
           al.nombre AS nombre_alumno, al.ape1 AS apellido_alumno,
           m.n_mat   AS nombre_materia,
           CASE WHEN a.modalidad=1 THEN 'Presencial' ELSE 'Virtual' END AS modalidad
      FROM asesorias a
      JOIN docente_horario dh ON a.id_docente_horario=dh.id_docente_horario
      JOIN horarios h         ON dh.id_horario       =h.id_horario
      JOIN alumnos  al        ON a.id_alumno         =al.matricula
      JOIN materias m         ON a.id_materia        =m.id_materia
     WHERE a.id_docente = ?`;
  try {
    res.json((await runQuery(sql, [req.params.id])).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Crear una asesoria
app.post("/asesorias", async (req, res) => {
  const {
    id_alumno,
    id_docente,
    id_docente_horario,
    id_materia,
    modalidad, // true = Presencial, false = Virtual
  } = req.body;

  // Oracle -> NUMBER(1): 1 = true, 0 = false
  const mod = modalidad ? 1 : 0;

  try {
    await runTx(async (c) => {
      /* Insertar asesoría */
      await c.execute(
        `INSERT INTO asesorias
           (id_alumno, id_docente, id_docente_horario, id_materia, modalidad)
         VALUES (:al, :doc, :dh, :mat, :mod)`,
        {
          al: id_alumno,
          doc: id_docente,
          dh: id_docente_horario,
          mat: id_materia,
          mod,
        },
      );

      /* Marcar horario como ocupado */
      await c.execute(
        `UPDATE docente_horario
            SET ocupado = 1
          WHERE id_docente_horario = :dh`,
        { dh: id_docente_horario },
      );
    });

    res.status(201).json({ message: "Asesoría creada correctamente" });
  } catch (e) {
    console.error("Error al crear asesoría:", e);
    res.status(500).json({ message: "Error al crear asesoría", error: e });
  }
});

// Eliminar asesoría de un docente
app.delete("/asesorias/docente/:id", async (req, res) => {
  const { teacherId, scheduleId } = req.body,
    asesoriaId = req.params.id;
  try {
    await runTx(async (c) => {
      await c.execute(`DELETE FROM asesorias WHERE id_as=:id`, {
        id: asesoriaId,
      });
      await c.execute(
        `UPDATE docente_horario SET ocupado=0
                       WHERE id_docente_horario=:sh AND id_docente=:t`,
        { sh: scheduleId, t: teacherId },
      );
    });
    res.json({ message: "Asesoría eliminada" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// -- Administrador
// Crear un usuario administrador
app.post("/admin", async (req, res) => {
  const { admin_id, correo, contraseña, nombre, apellido1, apellido2, rol } =
    req.body;
  try {
    await runQuery(
      `INSERT INTO administrador
        (admin_id,correo,contrasena,nombre,apellido1,apellido2,rol)
        VALUES (?,?,?,?,?,?,?)`,
      [
        admin_id,
        correo,
        bcrypt.hashSync(contraseña, 10),
        nombre,
        apellido1,
        apellido2,
        rol,
      ],
    );
    res.status(201).json({ message: "Admin creado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener un usuario administrador
app.get("/admin/:id", async (req, res) => {
  try {
    res.json(
      (
        await runQuery(`SELECT * FROM administrador WHERE admin_id=?`, [
          req.params.id,
        ])
      ).rows,
    );
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener foto de perfil de un administrador
app.get("/admin/profile-image/:id", async (req, res) => {
  const r = await runQuery(
    `SELECT perfil FROM administrador WHERE admin_id=?`,
    [req.params.id],
  );
  if (!r.rows.length)
    return res.status(404).json({ message: "Imagen no encontrada" });
  res.json(r.rows[0].PERFIL);
});

// Subir una foto de perfil para un administrador
app.post(
  "/admin/upload-profile/:id",
  upload.single("perfil"),
  async (req, res) => {
    try {
      await runQuery(`UPDATE administrador SET perfil=? WHERE admin_id=?`, [
        `/uploads/${req.file.filename}`,
        req.params.id,
      ]);
      res.status(201).json({ message: "Foto subida" });
    } catch (e) {
      res.status(500).json({ message: "Error", error: e });
    }
  },
);

// -- Alumnos
// Obtener los alumnos
app.get("/alumnos", async (_, res) => {
  try {
    res.json((await runQuery(`SELECT * FROM alumnos`)).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener un alumno en especifico
app.get("/alumnos/:id", async (req, res) => {
  try {
    res.json(
      (
        await runQuery(`SELECT * FROM alumnos WHERE matricula=?`, [
          req.params.id,
        ])
      ).rows,
    );
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener los alumnos de un programa en especifico
app.get("/alumnos/carrera/:id", async (req, res) => {
  const sql = `SELECT alumnos.programa,
                    carrera.id_carrera AS id_carrera,
                    carrera.nombre_carrera
               FROM alumnos
               JOIN carrera ON alumnos.programa=carrera.id_carrera
              WHERE alumnos.matricula=?`;
  try {
    const r = await runQuery(sql, [req.params.id]);
    if (!r.rows.length)
      return res.status(404).json({ message: "Alumno no encontrado" });
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener los alumnos de los programas
app.get("/students/carreras", async (_, res) => {
  const sql = `SELECT alumnos.*, carrera.nombre_carrera, semestre.sem AS nombre_semestre
               FROM alumnos
               JOIN carrera  ON alumnos.programa = carrera.id_carrera
               JOIN semestre ON alumnos.semestre = semestre.id`;
  try {
    res.json((await runQuery(sql)).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener foto de perfil de un alumno
app.get("/student/profile-image/:id", async (req, res) => {
  const r = await runQuery(`SELECT perfil FROM alumnos WHERE matricula=?`, [
    req.params.id,
  ]);
  if (!r.rows.length)
    return res.status(404).json({ message: "Imagen no encontrada" });
  res.json(r.rows[0].PERFIL);
});

// Crear un alumno
app.post("/alumnos", async (req, res) => {
  const a = req.body;
  try {
    await runQuery(
      `INSERT INTO alumnos
      (matricula,nombre,ape1,ape2,programa,semestre,correo,perfil,rol,contra_alum)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        a.matricula,
        a.nombre,
        a.ape1,
        a.ape2,
        a.programa,
        a.semestre,
        a.correo,
        a.perfil,
        a.rol,
        bcrypt.hashSync(a.Contra_alum, 10),
      ],
    );
    res.status(201).json({ message: "Alumno creado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Actualizar datos de un alumno
app.put("/alumnos/:matricula", async (req, res) => {
  const a = req.body;
  try {
    await runQuery(
      `UPDATE alumnos SET nombre=?,ape1=?,ape2=?,programa=?,semestre=?,
                    correo=?,perfil=?,rol=? WHERE matricula=?`,
      [
        a.nombre,
        a.ape1,
        a.ape2,
        a.programa,
        a.semestre,
        a.correo,
        a.perfil,
        a.rol,
        req.params.matricula,
      ],
    );
    res.json({ message: "Alumno actualizado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Eliminar un alumno
app.delete("/alumnos/:matricula", async (req, res) => {
  try {
    await runQuery(`DELETE FROM alumnos WHERE matricula=?`, [
      req.params.matricula,
    ]);
    res.json({ message: "Alumno eliminado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Actualizar foto de perfil de alumno
app.post(
  "/student/upload-profile/:id",
  upload.single("perfil"),
  async (req, res) => {
    try {
      await runQuery(`UPDATE alumnos SET perfil=? WHERE matricula=?`, [
        `/uploads/${req.file.filename}`,
        req.params.id,
      ]);
      res.json({ message: "Foto subida" });
    } catch (e) {
      res.status(500).json({ message: "Error", error: e });
    }
  },
);

// -- Programas / Carreras
// Obtener los programas
app.get("/carrera", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM carrera`)).rows);
});

// Obtener id de los programas
app.get("/carreras/ids", async (_, res) => {
  const r = await runQuery(`SELECT id_carrera FROM carrera`);
  res.json(r.rows.map((o) => o.ID_CARRERA));
});

// Crear un programa
app.post("/carrera", async (req, res) => {
  try {
    await runQuery(
      `INSERT INTO carrera (id_carrera,nombre_carrera) VALUES (?,?)`,
      [req.body.Id_Carreras, req.body.Nombre_Carrera],
    );
    res.status(201).json({ message: "Carrera creada" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Actualizar un programa
app.put("/carrera/:id", async (req, res) => {
  try {
    await runQuery(`UPDATE carrera SET nombre_carrera=? WHERE id_carrera=?`, [
      req.body.Nombre_Carrera,
      req.params.id,
    ]);
    res.json({ message: "Carrera actualizada" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Eliminar un programa
app.delete("/carrera/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await runTx(async (c) => {
      await c.execute(
        `UPDATE docentes SET id_mat_as=0,id_carrera_mat=0 WHERE id_carrera_mat=:id`,
        { id },
      );
      await c.execute(
        `DELETE FROM docente_materia WHERE id_materia IN
                       (SELECT id_materia FROM materias WHERE n_carr=:id)`,
        { id },
      );
      await c.execute(
        `DELETE FROM asesorias WHERE id_materia IN
                       (SELECT id_materia FROM materias WHERE n_carr=:id)`,
        { id },
      );
      await c.execute(`DELETE FROM materias WHERE n_carr=:id`, { id });
      await c.execute(`DELETE FROM carrera WHERE id_carrera=:id`, { id });
    });
    res.json({ message: "Carrera y dependencias eliminadas" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// -- Semestres
// Obtener los semestres
app.get("/semestres", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM semestre`)).rows);
});

// Crear un semestre
app.post("/semestres", async (req, res) => {
  try {
    await runQuery(`INSERT INTO semestre (id,sem) VALUES (?,?)`, [
      req.body.id,
      req.body.sem,
    ]);
    res.status(201).json({ message: "Semestre creado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Actualizar un semestre
app.put("/semestres/:id", async (req, res) => {
  try {
    await runQuery(`UPDATE semestre SET sem=? WHERE id=?`, [
      req.body.sem,
      req.params.id,
    ]);
    res.json({ message: "Semestre actualizado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Eliminar un semestre
app.delete("/semestres/:id", async (req, res) => {
  try {
    await runQuery(`DELETE FROM semestre WHERE id=?`, [req.params.id]);
    res.json({ message: "Semestre eliminado" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// -- Materias
// Obtener materias
app.get("/materias", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM materias`)).rows);
});

// Obtener materias de una carrera
app.get("/materias/carreras", async (_, res) => {
  const sql = `SELECT m.*, c.nombre_carrera, s.sem AS nombre_semestre
               FROM materias m
               JOIN carrera  c ON m.n_carr = c.id_carrera
               JOIN semestre s ON m.n_sem  = s.id`;
  try {
    res.json((await runQuery(sql)).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

app.get("/materias/:N_Carr", async (req, res) => {
  try {
    res.json(
      (
        await runQuery(`SELECT * FROM materias WHERE n_carr=?`, [
          req.params.N_Carr,
        ])
      ).rows,
    );
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Crear una materia
app.post("/materias", async (req, res) => {
  const m = req.body;
  try {
    await runQuery(
      `INSERT INTO materias (id_materia,n_carr,n_sem,n_mat)
                    VALUES (?,?,?,?)`,
      [m.Id_Materias, m.N_Carr, m.N_Sem, m.N_Mat],
    );
    res.status(201).json({ message: "Materia creada" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Actualizar una materia
app.put("/materias/:id", async (req, res) => {
  const m = req.body;
  try {
    await runQuery(
      `UPDATE materias SET n_carr=?,n_sem=?,n_mat=? WHERE id_materia=?`,
      [m.N_Carr, m.N_Sem, m.N_Mat, req.params.id],
    );
    res.json({ message: "Materia actualizada" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Eliminar una materia
app.delete("/materias/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await runTx(async (c) => {
      await c.execute(`UPDATE docentes SET id_mat_as=0 WHERE id_mat_as=:id`, {
        id,
      });
      await c.execute(`DELETE FROM docente_materia WHERE id_materia=:id`, {
        id,
      });
      await c.execute(`DELETE FROM asesorias WHERE id_materia=:id`, { id });
      await c.execute(`DELETE FROM materias  WHERE id_materia=:id`, { id });
    });
    res.json({ message: "Materia y dependencias eliminadas" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// -- Docentes
// Obtener docentes
app.get("/docentes", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM docentes`)).rows);
});

// Obtener un docente en especifico
app.get("/docentes/:id", async (req, res) => {
  res.json(
    (
      await runQuery(`SELECT * FROM docentes WHERE id_docente=?`, [
        req.params.id,
      ])
    ).rows,
  );
});

// Obtener las materias que imparte un docente
app.get("/docentes/materia/:id", async (req, res) => {
  const sql = `SELECT d.id_docente,d.nombre_doc,d.apellido,d.id_mat_as,d.id_carrera_mat,
                    d.correo,d.apei2,d.perfil,d.rol_doc
               FROM docentes d
               JOIN docente_materia dm ON d.id_docente=dm.id_docente
              WHERE dm.id_materia=?`;
  try {
    res.json((await runQuery(sql, [req.params.id])).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener los horrios disponibles de un docente
app.get("/docentes/:id/horarios-disponibles", async (req, res) => {
  const sql = `SELECT h.id_horario,h.hora_inicio,h.dia,dh.id_docente_horario
               FROM docente_horario dh
               JOIN horarios h ON dh.id_horario=h.id_horario
              WHERE dh.id_docente=? AND dh.ocupado=0`;
  try {
    res.json((await runQuery(sql, [req.params.id])).rows);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

// Obtener foto de perfil de docente
app.get("/docente/profile-image/:id", async (req, res) => {
  console.log("Foto llegando: ", req.body);
  const r = await runQuery(`SELECT perfil FROM docentes WHERE id_docente=?`, [
    req.params.id,
  ]);
  if (!r.rows.length)
    return res.status(404).json({ message: "Imagen no encontrada" });
  res.json(r.rows[0].PERFIL);
});

// Actualizar foto de perfil de un docente
app.post(
  "/docente/upload-profile/:id",
  upload.single("perfil"),
  async (req, res) => {
    await runQuery(`UPDATE docentes SET perfil=? WHERE id_docente=?`, [
      `/uploads/${req.file.filename}`,
      req.params.id,
    ]);
    res.json({ message: "Foto subida" });
  },
);

// Crear un docente
app.post("/docentes", async (req, res) => {
  const {
    Id_docente,
    nombre_doc,
    Apellido,
    id_carrera_mat,
    id_mat_as = 0,
    courseIds = [],
    scheduleIds = [],
    correo,
    apei2,
    perfil,
    rol_doc,
    contra_docente,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(contra_docente, 10);

  try {
    await runTx(async (c) => {
      /* Insertar en DOCENTES */
      await c.execute(
        `INSERT INTO docentes
           (id_docente, nombre_doc, apellido, id_mat_as,
            id_carrera_mat, correo, apei2, perfil,
            rol_doc, contra_docente)
         VALUES
           (:id, :nom, :ape, :mat_as,
            :carr, :mail, :ape2, :perf,
            :rol, :pwd)`,
        {
          id: Id_docente,
          nom: nombre_doc,
          ape: Apellido,
          mat_as: id_mat_as,
          carr: id_carrera_mat,
          mail: correo,
          ape2: apei2,
          perf: perfil,
          rol: rol_doc,
          pwd: hashedPassword,
        },
      );

      /* Insertar materias en DOCENTE_MATERIA */
      if (courseIds.length) {
        await c.executeMany(
          `INSERT INTO docente_materia (id_docente, id_materia)
             VALUES (:1, :2)`,
          courseIds.map((mid) => [Id_docente, mid]),
        );
      }

      /* Insertar horarios en DOCENTE_HORARIO  (0 = FALSE) */
      if (scheduleIds.length) {
        await c.executeMany(
          `INSERT INTO docente_horario (id_docente, id_horario, ocupado)
             VALUES (:1, :2, :3)`,
          scheduleIds.map((hid) => [Id_docente, hid, 0]),
        );
      }
    });

    res.status(201).json({ message: "Docente creado correctamente" });
    console.log("Docente y dependencias insertados");
  } catch (e) {
    console.error("Error al crear docente:", e);
    res.status(500).json({ message: "Error al crear docente", error: e });
  }
});

// Actualizar docente
app.put("/docentes/:id", async (req, res) => {
  const {
    nombre_doc,
    Apellido,
    id_carrera_mat,
    id_mat_as,
    courseIds = [],
    scheduleIds = [],
    correo,
    apei2,
    perfil,
    rol_doc,
  } = req.body;
  const { id } = req.params;
  console.log(req.body);
  try {
    await runTx(async (c) => {
      await c.execute(
        `UPDATE docentes
            SET nombre_doc      = :nom,
                apellido        = :ape,
                id_carrera_mat  = :carr,
                correo          = :mail,
                apei2           = :ape2,
                perfil          = :perf,
                rol_doc         = :rol
          WHERE id_docente      = :id`,
        {
          nom: nombre_doc,
          ape: Apellido,
          carr: id_carrera_mat,
          mail: correo,
          ape2: apei2,
          perf: perfil,
          rol: rol_doc,
          id,
        },
      );

      await c.execute(`DELETE FROM asesorias        WHERE id_docente = :id`, {
        id,
      });
      await c.execute(`DELETE FROM docente_materia  WHERE id_docente = :id`, {
        id,
      });
      await c.execute(`DELETE FROM docente_horario  WHERE id_docente = :id`, {
        id,
      });

      if (courseIds.length) {
        await c.executeMany(
          `INSERT INTO docente_materia (id_docente, id_materia)
            VALUES (:1, :2)`,
          courseIds.map((mid) => [id, mid]),
        );
      }

      if (scheduleIds.length) {
        await c.executeMany(
          `INSERT INTO docente_horario (id_docente, id_horario, ocupado)
            VALUES (:1, :2, :3)`,
          scheduleIds.map((hid) => [id, hid, 0]),
        );
      }
    });

    res.status(201).json({ message: "Docente editado correctamente" });
  } catch (e) {
    console.error("Error al editar docente:", e);
    res.status(500).json({ message: "Error al editar docente", error: e });
  }
});

// Eliminar docente
app.delete("/docentes/:id", async (req, res) => {
  const { id } = req.params; // id_docente

  try {
    await runTx(async (c) => {
      /* Eliminar relaciones DOCENTE_MATERIA */
      await c.execute(`DELETE FROM docente_materia WHERE id_docente = :id`, {
        id,
      });

      /* Eliminar asesorías asociadas */
      await c.execute(`DELETE FROM asesorias WHERE id_docente = :id`, { id });

      /* Eliminar horarios del docente */
      await c.execute(`DELETE FROM docente_horario WHERE id_docente = :id`, {
        id,
      });

      /* Finalmente eliminar el docente */
      const r = await c.execute(`DELETE FROM docentes WHERE id_docente = :id`, {
        id,
      });
      if (r.rowsAffected === 0) {
        // si no existía, lanzo error para que se haga rollback
        throw new Error("Docente no encontrado");
      }
    });

    res.status(201).json({ message: "Docente eliminado correctamente" });
    console.log("Docente y dependencias eliminadas (id =", id, ")");
  } catch (e) {
    console.error("Error al eliminar docente:", e);
    res.status(500).json({ message: "Error al eliminar docente", error: e });
  }
});

// Obtener horarios
app.get("/horarios", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM horarios`)).rows);
});

// Obtener publicaciones del foro
app.get("/foro", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM foro`)).rows);
});

// Agregar publicacion en el foro
app.post("/foro", async (req, res) => {
  await runQuery(`INSERT INTO foro (publicacion,comentarios) VALUES (?,?)`, [
    req.body.Publicacion,
    req.body.Comentarios,
  ]);
  res.status(201).json({ message: "Publicación creada" });
});

// Actualizar publicacion en el foro
app.put("/foro/:id", async (req, res) => {
  await runQuery(
    `UPDATE foro SET publicacion=?,comentarios=? WHERE id_publicacion=?`,
    [req.body.Publicacion, req.body.Comentarios, req.params.id],
  );
  res.json({ message: "Publicación actualizada" });
});

// Eliminar publicacion en el foro
app.delete("/foro/:id", async (req, res) => {
  await runQuery(`DELETE FROM foro WHERE id_publicacion=?`, [req.params.id]);
  res.json({ message: "Publicación eliminada" });
});

// -- Usuarios
// Obtener usuarios
app.get("/usuarios", async (_, res) => {
  res.json((await runQuery(`SELECT * FROM usuarios`)).rows);
});

// Agregar usuario
app.post("/usuarios", async (req, res) => {
  await runQuery(`INSERT INTO usuarios (id_user,users) VALUES (?,?)`, [
    req.body.id_user,
    req.body.users,
  ]);
  res.status(201).json({ message: "Usuario creado" });
});

// Actualizar usuario
app.put("/usuarios/:id", async (req, res) => {
  await runQuery(`UPDATE usuarios SET users=? WHERE id_user=?`, [
    req.body.users,
    req.params.id,
  ]);
  res.json({ message: "Usuario actualizado" });
});

// Eliminar usuario
app.delete("/usuarios/:id", async (req, res) => {
  await runQuery(`DELETE FROM usuarios WHERE id_user=?`, [req.params.id]);
  res.json({ message: "Usuario eliminado" });
});

// Iniciar API
(async () => {
  try {
    await sequelize.sync({ force: false });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀  API escuchando en http://localhost:${PORT}`),
    );
  } catch (e) {
    console.error("Startup error:", e);
    process.exit(1);
  }
})();

// Cerrar pool de conexiones
process.on("SIGINT", async () => {
  try {
    await oracledb.getPool().close(10);
  } catch (e) {
    console.error(e);
  }
  console.log("Pool Oracle cerrado");
  process.exit(0);
});
