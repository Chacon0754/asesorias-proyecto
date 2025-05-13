CREATE DATABASE  IF NOT EXISTS `uach_as` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uach_as`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: uach_as
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `Id_docente` int NOT NULL,
  `nombre_doc` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `id_mat_as` int NOT NULL,
  `id_carrera_mat` int DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `apei2` varchar(100) DEFAULT NULL,
  `perfil` varchar(255) DEFAULT NULL,
  `rol_doc` varchar(50) DEFAULT NULL,
  `contra_docente` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_docente`),
  KEY `Mat_as_idx` (`id_mat_as`),
  KEY `NMat_as_idx` (`id_carrera_mat`),
  CONSTRAINT `num_carrera` FOREIGN KEY (`id_carrera_mat`) REFERENCES `carrera` (`Id_Carreras`) ON UPDATE CASCADE,
  CONSTRAINT `num_materia` FOREIGN KEY (`id_mat_as`) REFERENCES `materias` (`Id_Materias`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (0,'Opciones','',0,0,'opciones@uach.mx','',NULL,'teacher','$2a$10$v4T0Fn4Sk9w3eziDMWlEhOXUT5nBBLllrZ24m6iGzpZBe1W.Z1DZq'),(2345,'Andrea','Montes',4,1,'amontes@uach.mx','Lopez',NULL,'teacher','$2a$10$rt31Ytrqq8w.AWQjUKWQEusuXI48Cx0MPb9Cta360P6yP8SjbaGXS'),(2419,'Luis Gerardo','Chacon',3,0,'lchacon@uach.mx','Hernandez',NULL,'teacher','$2a$10$rox/.h17N7yHYqxvH6F/Iec7R8ChugtvE/e2Ak5uM9sitG4SbyKNW'),(4587,'Victor','Solis',9,0,'vsolis@uach.mx','Madrid','/uploads/1716278400274-.jpg','teacher','$2a$10$Yz/lSdOjZJDBskKkdyt3D.1ydrKtcOJ5h6AxDDFFoO29CAt3Sex0i'),(9876,'Pedro','Solis',3,0,'psolis@uach.mx','Garcia',NULL,'teacher','$2a$10$NaLYIdmG42grYan14cMWL.mC/eCZIErasqXeSOgJpkUQ3oO6qa6Ee');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21  2:20:08
