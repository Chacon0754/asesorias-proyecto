-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: uach_as
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `Id_Materias` int NOT NULL,
  `N_Carr` int NOT NULL,
  `N_Sem` int NOT NULL,
  `N_Mat` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_Materias`),
  KEY `sem_ca_idx` (`N_Sem`),
  KEY `carr_idx` (`N_Carr`),
  CONSTRAINT `carr` FOREIGN KEY (`N_Carr`) REFERENCES `carrera` (`Id_Carreras`) ON UPDATE CASCADE,
  CONSTRAINT `sem_ca` FOREIGN KEY (`N_Sem`) REFERENCES `semestre` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,1,1,'Algebra superior'),(2,1,1,'Calculo diferencial e integral'),(3,1,1,'Fisica Basica'),(4,1,1,'Dibujo'),(5,1,1,'Ingles 3'),(6,1,1,'Tecnologia y manejo de la informacion'),(7,1,1,'Sociedad y cultura'),(8,1,2,'Calculo Aplicado'),(9,1,2,'Algebra lineal'),(10,1,2,'Quimica general'),(11,1,2,'Introduccion al desarrollo economico'),(12,1,2,'Ingles 4'),(13,1,2,'Lenguaje y comunicacion'),(14,1,2,'Universidad y conocimiento'),(15,1,3,'Ecuaciones diferenciales'),(16,1,3,'Electricidad y magnetismo'),(17,1,3,'Estatica'),(18,1,3,'Programacion'),(19,1,3,'Ingles avanzado'),(20,1,3,'Administracion'),(21,1,3,'Contabilidad'),(22,1,4,'Calculo Vectorial'),(23,1,4,'Dinamica'),(24,1,4,'Metodos Numericos'),(25,1,4,'Mecanica de materiales 1'),(26,1,4,'Probabilidad y estadistica 1'),(27,1,4,'Analisis de circuitos electricos'),(28,1,4,'Ingles Avanzado 2'),(29,1,5,'Probabilidad y estadistica 2'),(30,1,5,'Dibujo Avanzado 1'),(31,1,5,'Ciencia Ambiental'),(32,1,5,'Metalurgia'),(33,1,5,'Mecanica de materiales 2'),(34,1,6,'Termodinamica'),(35,1,6,'Administracion de proyectos'),(36,1,6,'Sistemas de calidad'),(37,1,7,'Aerodinamica 1'),(38,1,7,'Mecanica orbital y espacio ambiental'),(39,1,7,'Estructuras aeroespaciales'),(40,1,7,'Redaccion y comprension'),(41,1,8,'Dinamica y control de vuelo'),(42,1,8,'Propulsion'),(43,1,8,'Ingenieria en sistemas aeroespaciales'),(44,1,8,'Aerodinamica 2'),(45,1,8,'Comunicacion oral'),(46,1,9,'Transferencia de calor'),(47,1,9,'Diseño de cubiertas aeroespaciles'),(48,1,9,'Produccion y manufactura aeroespacial'),(49,2,2,'Calculo Aplicado'),(51,2,2,'Algebra lineal'),(52,2,2,'Ingles 2'),(53,2,2,'Topografia 2'),(54,2,2,'CAD 2'),(55,2,2,'Lenguaje y comunicacion'),(56,2,2,'Universidad y conocimiento'),(57,3,3,'Calculo Vectorial'),(58,3,3,'Algebra Lineal'),(59,3,3,'Matematicas discretas Avanzadas'),(60,3,3,'Ecuaciones diferenciales'),(61,3,3,'Analisis de algoritmos'),(62,3,3,'Ingles 3'),(63,4,4,'Administracion'),(64,4,4,'Métodos numéricos'),(65,4,4,'Dinamica'),(66,4,4,'Minerologia'),(67,4,4,'Quimica Analitica'),(68,4,4,'Probabilidad y estadistica 1'),(69,4,4,'Explotacion de minas'),(70,4,4,'Geologia Estructural'),(71,4,4,'Ingles 4'),(72,5,5,'Lenguajes de Programacion 3'),(73,5,5,'Analisis de circuitos electricos 2'),(74,5,5,'Ingenieria de software 1'),(75,5,5,'Sistemas operativos 1'),(76,5,5,'Estructura de datos 2'),(77,5,5,'Probabilidad y estadistica 2'),(78,5,5,'Diseño de bases de datos 1'),(79,6,6,'Ajustes'),(80,6,6,'Geodesia Aplicada'),(81,6,6,'Foto Interpretacion'),(82,6,6,'Sistemas de informacion geografica 2'),(83,6,6,'Hidrologia Superficial'),(84,6,6,'Administracion'),(85,6,6,'Contabilidad para ingenieros'),(86,7,7,'Investigacion de operaciones'),(87,7,7,'Fundamentos de la cadena de suministros'),(88,7,7,'Administracion de proyectos 3'),(89,7,7,'Gestoria empresarial 2'),(90,7,7,'Direccion y liderazgo'),(91,8,8,'Analisis instrumental'),(92,8,8,'Recursos Humanos'),(93,9,9,'Evaluacion de yacimientos minerales'),(94,9,9,'Geologia Ambiental'),(95,9,9,'Metodos Electricos'),(96,9,9,'Mecanica de suelos'),(97,9,9,'Quimica del petroleo'),(98,10,6,'Analisis Real'),(99,10,6,'Teoria de la computacion'),(100,10,6,'Diseño de experimentos'),(101,10,6,'Variable Compleja'),(102,11,8,'Administracion del proceso de software'),(103,11,8,'Ingenieria de requerimientos'),(104,11,8,'Diseño de interfaces'),(105,11,8,'Investigacion de operaciones');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15 16:24:27
