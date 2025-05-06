/*************************************************************************
 *  server.js – Versión Oracle                                           *
 *************************************************************************/
const express   = require("express");
const path      = require("path");
const cors      = require("cors");
const multer    = require("multer");
const jwt       = require("jsonwebtoken");
const bcrypt    = require("bcryptjs");
const oracledb  = require("oracledb");
const sequelize = require("./config/database");
const forumRoutes = require("./routes/forum.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/forum", forumRoutes);
app.use((_, res, next) => { res.type("application/json"); next(); });

/*─────────────────── 1.  ORACLE POOL & HELPERS ────────────────────────*/
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function initPool () {
  await oracledb.createPool({
    user          : "uach_as",
    password      : "password",
    connectString : "localhost/XEPDB1",
    poolMin       : 2,
    poolMax       : 10,
    poolIncrement : 2,
  });
  console.log("🏛️  Oracle pool creado");
}

// Reemplaza cada ? del SQL por :b0, :b1…  y crea el objeto de binds
function prepareBinds (sql, params = []) {
  let idx = 0;
  const binds = {};
  const newSql = sql.replace(/\?/g, () => {
    const key = "b" + idx;
    binds[key] = params[idx++];
    return ":" + key;
  });
  return { sql: newSql, binds };
}

async function runQuery (sql, params = [], opts = {}) {
  const { sql: parsed, binds } = prepareBinds(sql, params);
  const conn = await oracledb.getConnection();
  try   { return await conn.execute(parsed, binds, { autoCommit: true, ...opts }); }
  finally { await conn.close(); }
}

// Ejecuta varias operaciones dentro de una transacción
async function runTx (callback) {
  const conn = await oracledb.getConnection();
  try {
    await callback(conn);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    await conn.close();
  }
}

initPool().catch(err => { console.error("Pool error:", err); process.exit(1); });

/*─────────────────── 2.  MULTER ───────────────────────────────────────*/
const allowedImg = [".jpg", ".jpeg", ".png"];
const storage = multer.diskStorage({
  destination : (_, __, cb) => cb(null, "uploads"),
  filename    : (_, f, cb) => cb(null, Date.now() + path.extname(f.originalname))
});
const upload = multer({
  storage,
  fileFilter : (_, file, cb) =>
    allowedImg.includes(path.extname(file.originalname).toLowerCase()) || path.extname(file.originalname).toLowerCase()===".pdf"
      ? cb(null, true)
      : cb(new Error("Solo imágenes JPG/PNG o PDF"), false)
});

/*─────────────────── 3.  AUTENTICACIÓN (LOGIN) ───────────────────────*/
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT 'admin'   AS role, admin_id    AS id, contrasena      AS password,
           nombre     AS name, apellido1   AS lastName, rol      AS rol
      FROM administrador WHERE correo = ?
    UNION
    SELECT 'student' AS role, matricula    AS id, contra_alum     AS password,
           nombre     AS name, ape1        AS lastName, rol       AS rol
      FROM alumnos WHERE correo = ?
    UNION
    SELECT 'teacher' AS role, id_docente   AS id, contra_docente  AS password,
           nombre_doc AS name, Apellido    AS lastName, rol_doc   AS rol
      FROM docentes WHERE correo = ?`;

  try {
    const r = await runQuery(sql, [email, email, email]);
    if (!r.rows.length) return res.status(401).json({ message: "Correo incorrecto" });

    const u = r.rows[0];
    if (!bcrypt.compareSync(password, u.PASSWORD)) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: u.ID, role: u.ROLE, name: u.NAME, lastName: u.LASTNAME, rol: u.ROL },
      "tu_secreto", { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Error en el servidor", error: e });
  }
});

/*─────────────────── 4.  ASESORÍAS (Alumno/Docente) ───────────────────*/
app.get("/asesorias/alumno/:id", async (req, res) => {
  const sql = `
    SELECT a.id_as, h.dia, h.hora_inicio,
           d.nombre_doc AS nombre_docente, d.apellido AS apellido_docente,
           m.n_mat AS nombre_materia,
           CASE WHEN a.modalidad=1 THEN 'Presencial' ELSE 'Virtual' END AS modalidad
      FROM asesorias a
      JOIN docente_horario dh ON a.id_docente_horario = dh.id_docente_horario
      JOIN horarios h        ON dh.id_horario        = h.id_horario
      JOIN docentes d        ON dh.id_docente        = d.id_docente
      JOIN materias m        ON a.id_materia         = m.id_materias
     WHERE a.id_alumno = ?`;
  try   { const r = await runQuery(sql,[req.params.id]); res.json(r.rows); }
  catch (e){ console.error(e); res.status(500).json({ message:"Error", error:e}); }
});

app.get("/asesorias/docente/:id", async (req, res) => {
  const sql = `
    SELECT a.id_as, a.id_docente_horario, h.dia, h.hora_inicio,
           al.nombre AS nombre_alumno, al.ape1 AS apellido_alumno,
           m.n_mat   AS nombre_materia,
           CASE WHEN a.modalidad=1 THEN 'Presencial' ELSE 'Virtual' END AS modalidad
      FROM asesorias a
      JOIN docente_horario dh ON a.id_docente_horario = dh.id_docente_horario
      JOIN horarios h        ON dh.id_horario        = h.id_horario
      JOIN alumnos al        ON a.id_alumno          = al.matricula
      JOIN materias m        ON a.id_materia         = m.id_materias
     WHERE a.id_docente = ?`;
  try   { const r = await runQuery(sql,[req.params.id]); res.json(r.rows); }
  catch (e){ console.error(e); res.status(500).json({ message:"Error", error:e}); }
});

// crear asesoría (transacción)
app.post("/asesorias", async (req, res) => {
  const { id_alumno, id_docente, id_docente_horario, id_materia, modalidad } = req.body;
  try {
    await runTx(async (c) => {
      await c.execute(
        `INSERT INTO asesorias (id_alumno,id_docente,id_docente_horario,id_materia,modalidad)
         VALUES (:a,:d,:dh,:m,:mod)`,
        { a:id_alumno, d:id_docente, dh:id_docente_horario, m:id_materia, mod:modalidad }
      );
      await c.execute(`UPDATE docente_horario SET ocupado = 1 WHERE id_docente_horario = :dh`,
        { dh: id_docente_horario });
    });
    res.status(201).json({ message: "Asesoría creada" });
  } catch (e) {
    console.error(e); res.status(500).json({ message:"Error", error:e });
  }
});

/*─────────────────── 5.  ADMINISTRADOR ───────────────────────────────*/
app.post("/admin", async (req, res) => {
  const { admin_id, correo, contraseña, nombre, apellido1, apellido2, rol } = req.body;
  try {
    await runQuery(
      `INSERT INTO administrador (admin_id,correo,contrasena,nombre,apellido1,apellido2,rol)
       VALUES (?,?,?,?,?,?,?)`,
      [admin_id, correo, bcrypt.hashSync(contraseña,10), nombre, apellido1, apellido2, rol]
    );
    res.status(201).json({ message: "Admin creado" });
  } catch (e) {
    console.error(e); res.status(500).json({ message:"Error", error:e });
  }
});
app.get("/admin/:id", async (req,res)=>{
  try { const r=await runQuery(`SELECT * FROM administrador WHERE admin_id=?`,[req.params.id]); res.json(r.rows);}
  catch(e){res.status(500).json({message:"Error",error:e});}
});
app.post("/admin/upload-profile/:id", upload.single("perfil"), async (req,res)=>{
  try {
    await runQuery(`UPDATE administrador SET perfil=? WHERE admin_id=?`,
                   [`/uploads/${req.file.filename}`, req.params.id]);
    res.status(201).json({message:"Foto subida"});
  } catch(e){res.status(500).json({message:"Error",error:e});}
});

/*─────────────────── 6.  ALUMNOS  (CRUD completo) ────────────────────*/
app.get("/alumnos", async (_,res)=>{ try{res.json((await runQuery(`SELECT * FROM alumnos`)).rows);}
  catch(e){res.status(500).json({message:"Error",error:e});}});
app.get("/alumnos/:id", async (req,res)=>{try{
  res.json((await runQuery(`SELECT * FROM alumnos WHERE matricula=?`,[req.params.id])).rows);}
  catch(e){res.status(500).json({message:"Error",error:e});}});
app.post("/alumnos", async (req,res)=>{const a=req.body; try{
  await runQuery(`INSERT INTO alumnos
    (matricula,nombre,ape1,ape2,programa,semestre,correo,perfil,rol,contra_alum)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [a.matricula,a.nombre,a.ape1,a.ape2,a.programa,a.semestre,a.correo,a.perfil,
     a.rol,bcrypt.hashSync(a.Contra_alum,10)]);
  res.status(201).json({message:"Alumno creado"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.put("/alumnos/:id", async (req,res)=>{const a=req.body;try{
  await runQuery(`UPDATE alumnos SET nombre=?,ape1=?,ape2=?,programa=?,semestre=?,
    correo=?,perfil=?,rol=? WHERE matricula=?`,
    [a.nombre,a.ape1,a.ape2,a.programa,a.semestre,a.correo,a.perfil,a.rol,req.params.id]);
  res.json({message:"Alumno actualizado"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.delete("/alumnos/:id", async (req,res)=>{try{
  await runQuery(`DELETE FROM alumnos WHERE matricula=?`,[req.params.id]);
  res.json({message:"Alumno eliminado"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.post("/student/upload-profile/:id",upload.single("perfil"),async (req,res)=>{
  try{await runQuery(`UPDATE alumnos SET perfil=? WHERE matricula=?`,
         [`/uploads/${req.file.filename}`,req.params.id]);
  res.json({message:"Foto subida"});}catch(e){res.status(500).json({message:"Error",error:e});}});

/*─────────────────── 7.  CARRERAS & DEPENDENCIAS ─────────────────────*/
app.get("/carrera", async (_,res)=>{res.json((await runQuery(`SELECT * FROM carrera`)).rows);});
app.post("/carrera", async (req,res)=>{try{
  await runQuery(`INSERT INTO carrera (id_carreras,nombre_carrera) VALUES (?,?)`,
                 [req.body.Id_Carreras, req.body.Nombre_Carrera]);
  res.status(201).json({message:"Carrera creada"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.put("/carrera/:id", async (req,res)=>{try{
  await runQuery(`UPDATE carrera SET nombre_carrera=? WHERE id_carreras=?`,
                 [req.body.Nombre_Carrera, req.params.id]);
  res.json({message:"Carrera actualizada"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.delete("/carrera/:id", async (req,res)=>{
  try{
    await runTx(async c=>{
      const id=req.params.id;
      await c.execute(`UPDATE docentes SET id_mat_as=0,id_carrera_mat=0 WHERE id_carrera_mat=:id`,{id});
      await c.execute(`DELETE FROM docente_materia WHERE id_materia IN
                       (SELECT id_materias FROM materias WHERE n_carr=:id)`,{id});
      await c.execute(`DELETE FROM asesorias WHERE id_materia IN
                       (SELECT id_materias FROM materias WHERE n_carr=:id)`,{id});
      await c.execute(`DELETE FROM materias WHERE n_carr=:id`,{id});
      await c.execute(`DELETE FROM carrera  WHERE id_carreras=:id`,{id});
    });
    res.json({message:"Carrera y dependencias eliminadas"});
  }catch(e){res.status(500).json({message:"Error",error:e});}
});

/*─────────────────── 8.  SEMESTRES (CRUD simple) ─────────────────────*/
app.get("/semestres", async (_,res)=>{res.json((await runQuery(`SELECT * FROM semestre`)).rows);});
app.post("/semestres", async (req,res)=>{try{
  await runQuery(`INSERT INTO semestre (id,sem) VALUES (?,?)`,[req.body.id,req.body.sem]);
  res.status(201).json({message:"Semestre creado"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.put("/semestres/:id", async (req,res)=>{try{
  await runQuery(`UPDATE semestre SET sem=? WHERE id=?`,[req.body.sem,req.params.id]);
  res.json({message:"Semestre actualizado"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.delete("/semestres/:id", async (req,res)=>{try{
  await runQuery(`DELETE FROM semestre WHERE id=?`,[req.params.id]);
  res.json({message:"Semestre eliminado"});}catch(e){res.status(500).json({message:"Error",error:e});}});

/*─────────────────── 9.  MATERIAS (CRUD + dependencias) ──────────────*/
app.get("/materias", async (_,res)=>{res.json((await runQuery(`SELECT * FROM materias`)).rows);});
app.post("/materias", async (req,res)=>{const m=req.body; try{
  await runQuery(`INSERT INTO materias (id_materias,n_carr,n_sem,n_mat) VALUES (?,?,?,?)`,
                 [m.Id_Materias,m.N_Carr,m.N_Sem,m.N_Mat]);
  res.status(201).json({message:"Materia creada"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.put("/materias/:id", async (req,res)=>{const m=req.body; try{
  await runQuery(`UPDATE materias SET n_carr=?,n_sem=?,n_mat=? WHERE id_materias=?`,
                 [m.N_Carr,m.N_Sem,m.N_Mat,req.params.id]);
  res.json({message:"Materia actualizada"});}catch(e){res.status(500).json({message:"Error",error:e});}});
app.delete("/materias/:id", async (req,res)=>{
  try{
    await runTx(async c=>{
      const id=req.params.id;
      await c.execute(`UPDATE docentes SET id_mat_as=0 WHERE id_mat_as=:id`,{id});
      await c.execute(`DELETE FROM docente_materia WHERE id_materia=:id`,{id});
      await c.execute(`DELETE FROM asesorias WHERE id_materia=:id`,{id});
      await c.execute(`DELETE FROM materias WHERE id_materias=:id`,{id});
    });
    res.json({message:"Materia y dependencias eliminadas"});
  }catch(e){res.status(500).json({message:"Error",error:e});}
});

/*─────────────────── 10.  DOCENTES  (solo GET + fotos;  CRUD similar) ─*/
app.get("/docentes", async (_,res)=>{res.json((await runQuery(`SELECT * FROM docentes`)).rows);});
app.get("/docentes/:id", async (req,res)=>{res.json((await runQuery(`SELECT * FROM docentes WHERE id_docente=?`,[req.params.id])).rows);});
app.get("/docente/profile-image/:id", async (req,res)=>{
  const r=await runQuery(`SELECT perfil FROM docentes WHERE id_docente=?`,[req.params.id]);
  if (!r.rows.length) return res.status(404).json({message:"No encontrado"});
  res.json(r.rows[0]);
});
app.post("/docente/upload-profile/:id",upload.single("perfil"),async (req,res)=>{
  await runQuery(`UPDATE docentes SET perfil=? WHERE id_docente=?`,
                 [`/uploads/${req.file.filename}`,req.params.id]);
  res.json({message:"Foto subida"});
});

/*─────────────────── 11.  HORARIOS  ──────────────────────────────────*/
app.get("/horarios", async (_,res)=>{res.json((await runQuery(`SELECT * FROM horarios`)).rows);});

/*─────────────────── 12.  FORO (Sequelize) y USUARIOS simples ────────*/
// … Tus rutas de foro siguen en routes/forum.routes usando Sequelize …
//   (no necesitan cambios; ya apuntan al nuevo dialecto Oracle)

app.get("/usuarios", async (_,res)=>{res.json((await runQuery(`SELECT * FROM usuarios`)).rows);});
app.post("/usuarios",async (req,res)=>{await runQuery(`INSERT INTO usuarios (id_user,users) VALUES (?,?)`,
                                         [req.body.id_user,req.body.users]);
  res.status(201).json({message:"Usuario creado"});});
app.put("/usuarios/:id",async (req,res)=>{await runQuery(`UPDATE usuarios SET users=? WHERE id_user=?`,
                                         [req.body.users,req.params.id]);res.json({message:"Actualizado"});});
app.delete("/usuarios/:id",async (req,res)=>{await runQuery(`DELETE FROM usuarios WHERE id_user=?`,[req.params.id]);
  res.json({message:"Eliminado"});});

/*─────────────────── 13.  ARRANQUE ───────────────────────────────────*/
(async ()=>{
  try{
    await sequelize.sync({force:false});
    const PORT = process.env.PORT || 300;
    app.listen(PORT, ()=>console.log(`🚀  API escuchando en http://localhost:${PORT}`));
  }catch(e){console.error("Startup error:",e); process.exit(1);}
})();

/*─────────────────── 14.  CIERRA POOL GRACIOSAMENTE ──────────────────*/
process.on("SIGINT", async ()=>{
  try{ await oracledb.getPool().close(10); }catch(e){ console.error(e); }
  console.log("Pool Oracle cerrado"); process.exit(0);
});
