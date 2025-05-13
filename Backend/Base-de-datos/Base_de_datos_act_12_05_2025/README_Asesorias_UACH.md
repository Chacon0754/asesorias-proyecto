# Base de Datos - Proyecto Asesorías UACH

Este repositorio contiene el script SQL para crear completamente la estructura de la base de datos del sistema de asesorías, incluyendo:

- Tablas
- Índices
- Claves primarias y foráneas
- Secuencias
- Triggers
- Datos iniciales

> ⚠️ **Advertencia**: Este script elimina todas las tablas, secuencias y datos existentes. Úsalo con precaución y asegúrate de realizar un respaldo si es necesario.

---

## 🧩 Requisitos

- Oracle Database (recomendado Oracle 21c u Oracle XE)
- Usuario con privilegios sobre el esquema `UACH_AS`
- SQL*Plus o SQL Developer

---

## 🚀 Instrucciones para Importar

### ✅ Opción 1: SQL*Plus (línea de comandos)

1. Abre una terminal o `CMD`.
2. Conéctate a tu base de datos:

   ```bash
   sqlplus uach_as/password@localhost/XEPDB1
   ```

3. Ejecuta el script:

   ```sql
   @ruta/del/archivo/export.sql
   ```


4. Espera a que termine la ejecución. El script puede tardar algunos segundos o minutos.

---

### ✅ Opción 2: SQL Developer (interfaz gráfica)

1. Abre **SQL Developer**.
2. Conéctate como `UACH_AS`.
3. Ve al menú **Archivo > Abrir...** y selecciona el archivo `asesorias.sql`.
4. Haz clic derecho sobre el script abierto y selecciona **Ejecutar script** (`F5`).

---

## 📦 Contenido del Script

- **Secuencias:** `ASESORIAS_SEQ`, `DOCENTE_HORARIO_SEQ`, `POSTS_SEQ`, `RESPONSES_SEQ`
- **Tablas:** `ADMINISTRADOR`, `ALUMNOS`, `ASESORIAS`, `DOCENTES`, `HORARIOS`, `MATERIAS`, `POSTS`, `RESPONSES`, etc.
- **Triggers:** `TRG_POSTS_ID`, `TRG_ASESORIAS_ID`, `TRG_DOC_HOR_ID`, `POSTS_BI`
- **Datos de ejemplo:** Incluye administradores, alumnos, docentes, horarios, materias, posts y respuestas pre-cargadas.

---

## 📌 Consideraciones

- El script está diseñado para el esquema `UACH_AS`.
- Se recomienda ejecutarlo en una base de datos vacía o de desarrollo.
- Asegúrate de tener el `tablespace USERS` disponible.
- Si ya existen objetos con el mismo nombre, estos serán **eliminados** primero.

---
