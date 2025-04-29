CREATE TABLE carrera (
    id_carrera         INTEGER PRIMARY KEY,
    nombre_carrera     VARCHAR2(60)
);

CREATE TABLE semestre (
    id                 INTEGER PRIMARY KEY,
    sem                VARCHAR2(20)
);

CREATE TABLE materias (
    id_materia         INTEGER PRIMARY KEY,
    n_mat              VARCHAR2(100),
    n_carr             INTEGER,
    n_sem              INTEGER,
    CONSTRAINT fk_materias_carrera FOREIGN KEY (n_carr) REFERENCES carrera(id_carrera) ON DELETE SET NULL,
    CONSTRAINT fk_materias_semestre FOREIGN KEY (n_sem) REFERENCES semestre(id) ON DELETE SET NULL
);

CREATE TABLE docentes (
    id_docente         INTEGER PRIMARY KEY,
    nombre_doc         VARCHAR2(100),
    apellido           VARCHAR2(100),
    correo             VARCHAR2(100),
    apei2              VARCHAR2(100),
    perfil             VARCHAR2(255),
    rol_doc            VARCHAR2(50),
    contra_docente     VARCHAR2(255),
    id_carrera_mat     INTEGER,
    id_mat_as          INTEGER,
    CONSTRAINT fk_docente_carrera FOREIGN KEY (id_carrera_mat) REFERENCES carrera(id_carrera) ON DELETE SET NULL,
    CONSTRAINT fk_docente_materia FOREIGN KEY (id_mat_as) REFERENCES materias(id_materia) ON DELETE SET NULL
);

CREATE TABLE docente_materia (
    id_materia         INTEGER,
    id_docente         INTEGER,
    PRIMARY KEY (id_materia, id_docente),
    CONSTRAINT fk_docente_materia_docente FOREIGN KEY (id_docente) REFERENCES docentes(id_docente),
    CONSTRAINT fk_docente_materia_materia FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

CREATE TABLE usuarios (
    id_user            INTEGER PRIMARY KEY,
    users              VARCHAR2(50)
);

CREATE TABLE posts (
    id                 INTEGER PRIMARY KEY,
    author             VARCHAR2(255),
    role               VARCHAR2(255),
    content            VARCHAR2(4000),
    imageurl           VARCHAR2(255),
    createdAt          TIMESTAMP,
    updatedAt          TIMESTAMP,
    pdfurl             VARCHAR2(255)
);

CREATE TABLE responses (
    id                 INTEGER PRIMARY KEY,
    author             VARCHAR2(255),
    role               VARCHAR2(255),
    content            VARCHAR2(4000),
    imageurl           VARCHAR2(255),
    pdfurl             VARCHAR2(255),
    createdAt          TIMESTAMP,
    updatedAt          TIMESTAMP,
    post_id            INTEGER,
    CONSTRAINT fk_responses_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
);

CREATE TABLE alumnos (
    matricula          INTEGER PRIMARY KEY,
    nombre             VARCHAR2(100),
    ape1               VARCHAR2(100),
    ape2               VARCHAR2(100),
    correo             VARCHAR2(100),
    perfil             VARCHAR2(255),
    rol                VARCHAR2(50),
    contra_alum        VARCHAR2(255),
    programa           INTEGER,
    semestre           INTEGER,
    CONSTRAINT fk_alumno_carrera FOREIGN KEY (programa) REFERENCES carrera(id_carrera) ON DELETE SET NULL,
    CONSTRAINT fk_alumno_semestre FOREIGN KEY (semestre) REFERENCES semestre(id) ON DELETE SET NULL
);

CREATE TABLE horarios (
    id_horario         INTEGER PRIMARY KEY,
    hora_inicio        TIMESTAMP,
    dia                VARCHAR2(10)
);

CREATE TABLE docente_horario (
    id_docente_horario INTEGER PRIMARY KEY,
    ocupado            NUMBER(1),
    id_docente         INTEGER,
    id_horario         INTEGER,
    CONSTRAINT fk_doc_horario_docente FOREIGN KEY (id_docente) REFERENCES docentes(id_docente) ON DELETE SET NULL,
    CONSTRAINT fk_doc_horario_horario FOREIGN KEY (id_horario) REFERENCES horarios(id_horario) ON DELETE SET NULL
);

CREATE TABLE asesorias (
    id_as              INTEGER PRIMARY KEY,
    modalidad          VARCHAR2(20),
    id_alumno          INTEGER,
    id_docente         INTEGER,
    id_materia         INTEGER,
    id_docente_horario INTEGER,
    CONSTRAINT fk_asesoria_alumno FOREIGN KEY (id_alumno) REFERENCES alumnos(matricula) ON DELETE SET NULL,
    CONSTRAINT fk_asesoria_docente FOREIGN KEY (id_docente) REFERENCES docentes(id_docente) ON DELETE SET NULL,
    CONSTRAINT fk_asesoria_materia FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON DELETE SET NULL,
    CONSTRAINT fk_asesoria_doc_horario FOREIGN KEY (id_docente_horario) REFERENCES docente_horario(id_docente_horario) ON DELETE SET NULL
);

CREATE TABLE administrador (
    admin_id           INTEGER PRIMARY KEY,
    correo             VARCHAR2(100),
    contrasena         VARCHAR2(255),
    nombre             VARCHAR2(100),
    apellido1          VARCHAR2(100),
    apellido2          VARCHAR2(100),
    rol                VARCHAR2(50),
    perfil             VARCHAR2(255)
);
