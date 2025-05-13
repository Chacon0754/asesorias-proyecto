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
-- Table structure for table `docente_horario`
--

DROP TABLE IF EXISTS `docente_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente_horario` (
  `id_docente` int NOT NULL,
  `id_horario` int NOT NULL,
  `ocupado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_docente`,`id_horario`),
  KEY `id_horario` (`id_horario`),
  CONSTRAINT `docente_horario_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`Id_docente`),
  CONSTRAINT `docente_horario_ibfk_2` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente_horario`
--

LOCK TABLES `docente_horario` WRITE;
/*!40000 ALTER TABLE `docente_horario` DISABLE KEYS */;
INSERT INTO `docente_horario` VALUES (2345,1,0),(2345,2,0),(2345,4,0),(2345,9,0),(2345,10,0),(2345,11,0),(2345,15,0),(2345,16,0),(2345,17,0),(2345,18,0),(4587,1,0),(4587,2,0),(4587,5,0),(4587,9,0),(4587,31,0),(4587,32,0),(4587,33,0),(4587,34,0),(4587,35,0),(4587,36,0),(4587,37,0),(4587,48,0),(9876,1,0),(9876,2,0),(9876,3,0),(9876,4,1),(9876,5,0),(9876,6,0),(9876,7,0),(9876,8,0),(9876,9,0),(9876,10,0),(9876,11,0),(9876,12,0),(9876,13,1),(9876,14,0),(9876,15,0),(9876,16,0),(9876,17,0),(9876,18,0),(9876,19,0),(9876,20,0),(9876,21,0),(9876,22,0),(9876,23,0),(9876,24,0),(9876,25,0),(9876,26,0),(9876,27,0),(9876,28,0),(9876,29,0),(9876,30,0),(9876,31,0),(9876,32,0),(9876,33,0),(9876,34,0),(9876,35,0),(9876,36,0),(9876,37,0),(9876,38,0),(9876,39,0),(9876,40,0),(9876,41,0),(9876,42,0),(9876,43,0),(9876,44,0),(9876,45,0),(9876,46,0),(9876,47,0),(9876,48,0),(9876,49,0),(9876,50,0);
/*!40000 ALTER TABLE `docente_horario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 20:46:26
