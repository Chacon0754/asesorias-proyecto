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
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `id_horario` int NOT NULL AUTO_INCREMENT,
  `hora_inicio` time NOT NULL,
  `dia` varchar(10) NOT NULL,
  PRIMARY KEY (`id_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,'08:00:00','lunes'),(2,'09:00:00','lunes'),(3,'10:00:00','lunes'),(4,'11:00:00','lunes'),(5,'12:00:00','lunes'),(6,'13:00:00','lunes'),(7,'14:00:00','lunes'),(8,'15:00:00','lunes'),(9,'16:00:00','lunes'),(10,'17:00:00','lunes'),(11,'08:00:00','martes'),(12,'09:00:00','martes'),(13,'10:00:00','martes'),(14,'11:00:00','martes'),(15,'12:00:00','martes'),(16,'13:00:00','martes'),(17,'14:00:00','martes'),(18,'15:00:00','martes'),(19,'16:00:00','martes'),(20,'17:00:00','martes'),(21,'08:00:00','miércoles'),(22,'09:00:00','miércoles'),(23,'10:00:00','miércoles'),(24,'11:00:00','miércoles'),(25,'12:00:00','miércoles'),(26,'13:00:00','miércoles'),(27,'14:00:00','miércoles'),(28,'15:00:00','miércoles'),(29,'16:00:00','miércoles'),(30,'17:00:00','miércoles'),(31,'08:00:00','jueves'),(32,'09:00:00','jueves'),(33,'10:00:00','jueves'),(34,'11:00:00','jueves'),(35,'12:00:00','jueves'),(36,'13:00:00','jueves'),(37,'14:00:00','jueves'),(38,'15:00:00','jueves'),(39,'16:00:00','jueves'),(40,'17:00:00','jueves'),(41,'08:00:00','viernes'),(42,'09:00:00','viernes'),(43,'10:00:00','viernes'),(44,'11:00:00','viernes'),(45,'12:00:00','viernes'),(46,'13:00:00','viernes'),(47,'14:00:00','viernes'),(48,'15:00:00','viernes'),(49,'16:00:00','viernes'),(50,'17:00:00','viernes');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-26 17:36:30
