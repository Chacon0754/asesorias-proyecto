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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `pdfUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Juan Garcia','student','listoooo',NULL,NULL,'2024-05-21 05:56:14','2024-05-21 05:56:14'),(2,'Juan Garcia','student','',NULL,NULL,'2024-05-21 08:06:22','2024-05-21 08:06:22'),(3,'Juan Garcia','student','',NULL,NULL,'2024-05-21 08:14:14','2024-05-21 08:14:14'),(4,'Juan Garcia','student','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget ex vel libero vestibulum tincidunt. Donec tristique, eros vel vehicula congue, risus ligula volutpat est, nec iaculis nulla mauris nec est. Duis sed arcu nec purus sollicitudin interdum nec in ligula. Aenean maximus sapien magna, sit amet tempor lacus malesuada ut. Integer ac ligula sit amet lectus tempor aliquet at ac tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris feugiat, tortor nec condimentum vehicula, nisi quam scelerisque lorem, in facilisis eros elit non ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam tincidunt mauris nec diam hendrerit, nec sodales mi vestibulum. Curabitur non ex tortor. Sed imperdiet, risus at sollicitudin gravida, orci mi cursus eros, non laoreet metus lacus eget lectus. Sed facilisis magna at venenatis hendrerit. Integer scelerisque nisl et urna laoreet scelerisque. Nulla convallis leo nec ex consequat, at dapibus lacus scelerisque.\r\n\r\nFusce bibendum vulputate lorem, ac faucibus libero suscipit in. Maecenas in lectus ut justo lacinia aliquet. Vivamus ac orci quam. Donec non tellus id turpis lacinia consequat. Integer rutrum risus nec varius eleifend. Curabitur vehicula mi in mi viverra, a consectetur dui efficitur. Donec facilisis quam vel dolor tempor, sit amet laoreet arcu cursus. Nam quis mauris eget lorem facilisis euismod. Aliquam scelerisque auctor tellus, nec malesuada tortor. Aenean dignissim, nisi vel vehicula varius, mi odio tristique arcu, et consectetur lorem nunc eget mi. Sed interdum mi nec tellus finibus, vel tincidunt odio tristique. Integer volutpat massa a ligula tincidunt congue. Nulla fringilla sapien in ante porttitor, quis vulputate felis egestas.\r\n\r\nNulla gravida feugiat varius. Donec scelerisque sem nec nulla efficitur, vitae efficitur sapien auctor. In id mauris nec sem fringilla aliquet. Vestibulum a erat sit amet augue bibendum pulvinar. Pellentesque gravida quam at turpis malesuada, vel varius sapien sodales. Ut molestie congue arcu, a dictum sem vestibulum in. Donec a est a mauris condimentum feugiat. Nulla facilisi. Integer vel lectus sit amet orci tincidunt pellentesque sit amet eget ligula. Nam eget fermentum mauris, et vestibulum nunc. Sed quis dictum neque. Duis posuere quam sit amet risus convallis efficitur. Quisque convallis mi ac purus vestibulum, vel consequat lorem venenatis. Cras non feugiat mi, sit amet sodales lorem. Nam ut sagittis nisi.\r\n\r\nCurabitur dignissim purus vel felis viverra, quis tempus magna malesuada. Ut lacinia ex ut cursus molestie. Donec ultricies ex at dui tincidunt rhoncus. Duis condimentum justo quis dolor dapibus, vel congue odio fermentum. In nec nisl vitae nulla bibendum pretium sit amet nec turpis. Nullam a lacus mi. Vestibulum sit amet ex vitae eros ultrices dignissim. Quisque tristique tristique ex, nec varius turpis volutpat nec. Phasellus sit amet lorem quis augue bibendum egestas at id risus. Suspendisse bibendum est at libero bibendum, eget ultrices leo fermentum. Nam porttitor neque ligula, a pellentesque urna venenatis nec. Cras imperdiet nisl ac massa venenatis, sit amet varius erat fermentum. Curabitur in libero massa. Vestibulum nec leo a turpis efficitur volutpat at a justo. Integer ultrices, purus euismod dapibus gravida, libero eros tristique lorem, id ullamcorper orci nisi in sapien.\r\n\r\nDonec efficitur condimentum scelerisque. In sed purus fringilla, hendrerit sapien id, cursus turpis. Sed lobortis risus vel dui ullamcorper, sit amet condimentum nisl aliquam. Nullam eget eros cursus, aliquet libero sit amet, luctus est. Etiam tincidunt, est sit amet venenatis interdum, metus ante tempus augue, sit amet dictum lectus elit id lectus. Cras sit amet felis est. Phasellus dictum nibh ac sem gravida convallis. Aenean gravida sem felis, ac fermentum metus pharetra at. Donec tincidunt arcu sapien, nec vestibulum augue ullamcorper et. In rutrum augue quis nunc tincidunt, at cursus libero facilisis. Nunc bibendum sapien ut vestibulum luctus. Duis quis tincidunt lorem. Donec id consectetur odio, a feugiat eros. Nam volutpat, dui sit amet consectetur eleifend, tortor urna tempus lacus, at venenatis nunc metus vel lorem. Morbi vitae ex consequat, dictum orci vel, auctor leo.\r\n\r\nVivamus ut neque vitae metus vulputate faucibus id quis purus. Nunc tincidunt vehicula felis, in tincidunt risus sodales non. Mauris ut urna suscipit, tincidunt velit nec, porta est. Cras ac diam in eros cursus eleifend in a metus. Nam vulputate posuere lacus sed egestas. Donec posuere leo vel ultricies viverra. Fusce dignissim nibh et metus tempor, id convallis arcu ultricies. Nulla facilisi. Nam vehicula diam vitae quam fringilla luctus. Suspendisse maximus metus vel metus dapibus tempus. Donec et risus aliquam, consectetur odio quis, ultricies libero. Sed suscipit libero sed nisi maximus, non tempor ligula suscipit. Morbi condimentum magna in nibh consectetur frinrrr',NULL,NULL,'2024-05-27 00:03:57','2024-05-27 00:03:57');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27  0:40:32
