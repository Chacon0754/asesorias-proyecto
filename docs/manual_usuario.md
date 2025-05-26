# Manual Usuario
# Manual de Usuario - UACH_AS

## 1. Introducción

### ¿Qué es UACH_AS?
UACH_AS (UACH Asesorías) es una plataforma web académica diseñada para gestionar y agendar asesorías universitarias. El sistema facilita la conexión entre estudiantes que necesitan apoyo académico y asesores (docentes) que ofrecen sus servicios de tutoría, además de contar con un sistema de publicaciones para la comunicación entre usuarios.

### ¿A quién va dirigido este manual?
Este manual está dirigido a los tres tipos de usuarios del sistema:
- **Estudiantes**: Quienes buscan y reservan asesorías académicas
- **Asesores (Docentes)**: Quienes ofrecen y gestionan sus asesorías
- **Administradores**: Quienes gestionan el sistema y los usuarios

### Requisitos para usar el sistema
- Conexión a internet estable
- Navegador web moderno actualizado
- Cuenta asignada por la organización (no hay auto-registro)

## 2. Acceso al sistema

### Requisitos del navegador
El sistema es compatible con navegadores web modernos. Se recomienda usar las versiones más recientes de:
- Google Chrome
- Mozilla Firefox  
- Microsoft Edge
- Safari

### Iniciar sesión
Para acceder al sistema, dirigirse a la dirección web proporcionada por la institución y utilizar las credenciales asignadas.

El sistema cuenta con tres tipos de usuarios con diferentes niveles de acceso:
- **Estudiante**: Acceso para consultar, solicitar asesorías y participar en publicaciones
- **Asesor (Docente)**: Acceso para gestionar asesorías asignadas y participar en publicaciones
- **Administrador**: Acceso completo para gestión del sistema y usuarios

## 3. Registro de usuario

> **Importante**: Los usuarios no pueden registrarse por sí mismos. La organización asigna las cuentas y envía las credenciales por correo electrónico.

### Registro de estudiantes
Los administradores crean cuentas de estudiante proporcionando:
- Nombre completo (nombre, apellido paterno, apellido materno)
- Correo electrónico institucional
- Matrícula
- Carrera
- Semestre

### Registro de asesores  
Los administradores crean cuentas de asesor proporcionando:
- Nombre completo (nombre, apellido paterno, apellido materno)
- Número de empleado
- Correo electrónico institucional
- Carrera
- Materias que imparte
- Horarios disponibles

## 4. Menú principal y navegación

### Descripción general de la interfaz por tipo de usuario

**Estudiante:**
- **Configuración**: Opciones personales y cierre de sesión
- **Agendar asesoría**: Solicitar nuevas asesorías
- **Tablero**: Centro de actividad con publicaciones y asesorías

**Docente:**
- **Configuración**: Opciones personales y cierre de sesión
- **Revisar mis asesorías**: Gestión de asesorías asignadas
- **Tablero**: Centro de actividad con publicaciones y asesorías

**Administrador:**
- **Alumnos**: Gestión completa de estudiantes
- **Profesores**: Administración de docentes y asesores  
- **Carreras**: Configuración de carreras académicas
- **Materias**: Gestión de materias por carrera y semestre
- **Configuración**: Opciones del sistema y perfil personal

## 5. Funcionalidades por tipo de usuario

### 5.1 Estudiante

#### Agendar Asesoría
- **Acceder desde**: Agendar asesoría
- **Proceso de solicitud:**
  1. Seleccionar carrera que está cursando
  2. Elegir materia en la que necesita ayuda
  3. Seleccionar docente preferido para la asesoría
  4. Elegir modalidad (presencial/virtual)
  5. Seleccionar fecha deseada para la asesoría
- **Opciones**: Cancelar / Solicitar

#### Tablero - Gestión de Publicaciones
**Nueva Publicación**
- **Acceder desde**: Tablero > Publicaciones > Nueva publicación
- **Campos disponibles**:
  - Autor (automático)
  - Rol (automático: Estudiante)
  - Contenido del mensaje
  - Archivo adjunto (opcional)
- **Opciones**: Cancelar / Crear Post

**Responder a Publicaciones**
- **Acceder desde**: Tablero > Publicaciones > Responder
- **Campos disponibles**:
  - Contenido de la respuesta
  - Archivo adjunto (opcional)
- **Opciones**: Cancelar / Enviar respuesta

#### Tablero - Seguimiento de Asesorías
- **Acceder desde**: Tablero > Asesorías
- **Funcionalidad**: Lista con todas las asesorías pendientes del estudiante
- Permite monitorear el estado de las solicitudes realizadas

### 5.2 Asesor (Docente)

#### Revisar Mis Asesorías
- **Acceder desde**: Revisar mis asesorías
- **Vista de lista con información**:
  - Materia de la asesoría
  - Día programado
  - Hora programada
  - Alumno solicitante
  - Modalidad (presencial/virtual)
- **Opciones**: Regresar / Eliminar Asesoría

#### Tablero - Gestión de Publicaciones
**Nueva Publicación**
- **Acceder desde**: Tablero > Publicaciones > Nueva publicación
- **Campos disponibles**:
  - Autor (automático)
  - Rol (automático: Docente)
  - Contenido del mensaje
  - Archivo adjunto (opcional)
- **Opciones**: Cancelar / Crear Post

**Responder a Publicaciones**
- **Acceder desde**: Tablero > Publicaciones > Responder
- **Campos disponibles**:
  - Contenido de la respuesta
  - Archivo adjunto (opcional)
- **Opciones**: Cancelar / Enviar respuesta

#### Tablero - Seguimiento de Asesorías
- **Acceder desde**: Tablero > Asesorías
- **Funcionalidad**: Lista con todas las asesorías pendientes asignadas al docente
- Permite revisar solicitudes recibidas de estudiantes

### 5.3 Administrador

#### Gestión de Alumnos
**Nuevo Alumno**
- **Acceder desde**: Alumnos > Nuevo Alumno
- **Campos requeridos**:
  - Nombre(s)
  - Apellido paterno
  - Apellido materno  
  - Correo electrónico
  - Carrera
  - Matrícula
  - Semestre al que corresponde
- **Opciones**: Cancelar / Guardar

**Editar Alumno**
- **Acceder desde**: Alumnos > Editar Alumno
- Permite modificar todos los campos del registro de alumno
- **Opciones**: Cancelar / Eliminar alumno / Guardar

**Ver Alumnos**
- **Acceder desde**: Alumnos > Ver Alumnos
- **Muestra lista con**: Matrícula, nombre completo, carrera, semestre, correo

#### Gestión de Profesores
**Nuevo Docente**
- **Acceder desde**: Profesores > Nuevo docente
- **Campos requeridos**:
  - Nombre(s)
  - Apellido paterno
  - Apellido materno
  - Número de empleado
  - Correo electrónico
  - Carrera
  - Materias que imparte
  - Horarios disponibles
- **Opciones**: Cancelar / Guardar

**Editar Docente**
- **Acceder desde**: Profesores > Editar docente
- Permite seleccionar profesor y modificar todos sus datos
- **Opciones**: Cancelar / Eliminar docente / Guardar

**Ver Docentes**
- **Acceder desde**: Profesores > Ver docentes  
- **Muestra lista con**: Número de empleado, nombre completo, correo

#### Gestión de Carreras
**Nueva Carrera**
- **Acceder desde**: Carreras > Nueva carrera
- **Campos requeridos**:
  - Nombre de la carrera
  - Clave
- **Opciones**: Cancelar / Guardar

**Editar Carrera**
- **Acceder desde**: Carreras > Editar carrera
- Permite modificar nombre de carrera existente
- **Opciones**: Cancelar / Eliminar carrera / Guardar

**Ver Carreras**
- **Acceder desde**: Carreras > Ver carreras
- **Muestra lista con**: ID, Nombre de la carrera

#### Gestión de Materias
**Nueva Materia**
- **Acceder desde**: Materias > Nueva materia
- **Campos requeridos**:
  - Carrera
  - Semestre al que corresponde
  - Nombre de la materia
  - Clave
- **Opciones**: Cancelar / Guardar

**Editar Materia**
- **Acceder desde**: Materias > Editar materia
- Permite modificar datos de materia existente
- **Opciones**: Cancelar / Eliminar materia / Guardar

**Ver Materias**
- **Acceder desde**: Materias > Ver materia
- **Muestra lista con**: ID, Carrera, Semestre, Nombre de la materia

#### Configuración del Sistema
**Crear Nuevo Administrador**
- **Acceder desde**: Configuración > Crear nuevo administrador
- **Campos requeridos**:
  - Nombre(s)
  - Apellido paterno
  - Apellido materno
  - Correo electrónico
  - ID
- **Opciones**: Cancelar / Guardar

## 6. Configuración del perfil

### Cambiar foto de perfil (Todos los usuarios)
1. Ir a **Configuración > Cambiar foto**
2. Seleccionar archivo de imagen desde el dispositivo
3. Confirmar cambio

### Otras configuraciones
- Acceso a opciones personales desde el menú Configuración
- Gestión de preferencias de cuenta

## 7. Preguntas frecuentes (FAQ)

### ¿Qué hago si no veo horarios disponibles?
- Verificar que haya docentes con horarios publicados para la materia deseada
- Contactar al administrador si persiste el problema
- Revisar si la carrera y materia están correctamente configuradas

### ¿Por qué no puedo iniciar sesión?
- Verificar que las credenciales sean correctas
- Confirmar que la cuenta haya sido creada por un administrador
- Contactar al soporte técnico si el problema persiste

### ¿Puedo cancelar una asesoría el mismo día?
- Los estudiantes pueden cancelar asesorías desde su perfil
- Los docentes pueden eliminar asesorías desde su panel de gestión
- Se recomienda cancelar con anticipación por cortesía

### ¿Cómo puedo participar en las publicaciones?
- Acceder al Tablero desde el menú principal
- Crear nuevas publicaciones o responder a existentes
- Se pueden adjuntar archivos a las publicaciones

## 8. Soporte y contacto

### En caso de problemas técnicos
- Contactar al administrador del sistema de la institución
- Reportar errores o funcionalidades que no trabajen correctamente
- Solicitar capacitación adicional si es necesario

### Para solicitudes de nuevas funcionalidades
- Dirigirse al departamento de sistemas de la institución
- Enviar sugerencias de mejora a través de los canales oficiales

## 9. Cierre de sesión

### Cómo cerrar sesión correctamente (Todos los usuarios)
1. Ir a **Configuración > Salir**
2. Confirmar cierre de sesión
3. El sistema redirigirá automáticamente a la pantalla de inicio de sesión
4. **Recomendación**: Siempre cerrar sesión al terminar de usar el sistema
---

## Funcionalidades del Tablero (Común para Estudiantes y Docentes)

- **Sistema de publicaciones**: Permite comunicación entre usuarios del sistema
- **Seguimiento de asesorías**: Vista centralizada de todas las asesorías pendientes
- **Interacción**: Posibilidad de crear contenido y responder a publicaciones existentes
- **Gestión de archivos**: Soporte para adjuntar archivos en publicaciones y respuestas

---

> **Nota**: Este es un proyecto académico desarrollado exclusivamente para la clase de Fundamentos Bases de datos.