CREATE DATABASE UACH_AS;

use UACH_AS;

create table Alumnos(
	matricula int primary key,
    nombre varchar (100) not null,
    ape1 varchar (100) not null,
    ape2 varchar (100),
    programa int not null,
    semestre int not null
);
CREATE TABLE carrera (
    Id_Carreras INT PRIMARY KEY,
    Nombre_Carrera VARCHAR(60) NOT NULL
    );
    
create table semestre (
id int primary key,
sem varchar (20) not null
);
CREATE TABLE Materias (
     Id_Materias INT PRIMARY KEY,
     N_Carr   Int NOT NULL,
     N_Sem int NOT NULL,
     N_Mat varchar(100) not null
    );
CREATE TABLE docentes (
    Id_docente INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    id_mat_as int not null,
    id_carrera_mat int not null
    );
    
Create Table foro (
id_publicacion Int auto_increment primary key,
Publicacion VARCHAR(255),
Comentarios VARCHAR(255)
);
Create table Administrador (
admin_id int primary key,
correo VARCHAR(200)NOT NULL,
contraseña VARCHAR(200)NOT NULL,
usuario int not null
); 
create table usuarios(
id_user int primary key,
users varchar(50) not null
);  

create table asesorias(
id_as int primary key,
alumn_ases int not null,
docente_ases int not null,
dia varchar(100) not null,
hora varchar(50) not null
);
   
drop table Administrador;


show tables;

describe alumnos;

insert into semestre(id,sem)
   Values (9,'Noveno semestre');
   
	insert into Carrera(Id_Carreras,Nombre_Carrera)
   Values (1,'Ingenieria Aeroespacial');
   alter table docentes add rol_doc varchar(50);
   alter table docentes change Nombre nombre_doc varchar(100) not null ;
    alter table docentes drop apellido;
    
    Insert into 
    Materias(Id_Materias,N_Carr,N_Sem,N_Mat)
    Values (29,1,5,'Probabilidad y estadistica 2');
   	



