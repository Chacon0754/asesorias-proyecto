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
-- Temporary view structure for view `v_mat_docente_sem`
--

DROP TABLE IF EXISTS `v_mat_docente_sem`;
/*!50001 DROP VIEW IF EXISTS `v_mat_docente_sem`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_mat_docente_sem` AS SELECT 
 1 AS `nombre_doc`,
 1 AS `apellido`,
 1 AS `apei2`,
 1 AS `n_mat`,
 1 AS `sem`,
 1 AS `nombre_carrera`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_alum`
--

DROP TABLE IF EXISTS `v_alum`;
/*!50001 DROP VIEW IF EXISTS `v_alum`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_alum` AS SELECT 
 1 AS `matricula`,
 1 AS `nombre_carrera`,
 1 AS `sem`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_prog`
--

DROP TABLE IF EXISTS `v_prog`;
/*!50001 DROP VIEW IF EXISTS `v_prog`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_prog` AS SELECT 
 1 AS `id_materias`,
 1 AS `n_mat`,
 1 AS `nombre_carrera`,
 1 AS `sem`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_mat_docente_sem`
--

/*!50001 DROP VIEW IF EXISTS `v_mat_docente_sem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_mat_docente_sem` AS select `a`.`nombre_doc` AS `nombre_doc`,`a`.`Apellido` AS `apellido`,`a`.`apei2` AS `apei2`,`b`.`N_Mat` AS `n_mat`,`c`.`sem` AS `sem`,`d`.`Nombre_Carrera` AS `nombre_carrera` from (((`docentes` `a` join `materias` `b` on((`a`.`id_mat_as` = `b`.`Id_Materias`))) join `semestre` `c` on((`b`.`N_Sem` = `c`.`id`))) join `carrera` `d` on((`a`.`id_carrera_mat` = `d`.`Id_Carreras`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_alum`
--

/*!50001 DROP VIEW IF EXISTS `v_alum`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_alum` AS select `a`.`matricula` AS `matricula`,`b`.`Nombre_Carrera` AS `nombre_carrera`,`c`.`sem` AS `sem` from ((`alumnos` `a` join `carrera` `b` on((`a`.`programa` = `b`.`Id_Carreras`))) join `semestre` `c` on((`a`.`semestre` = `c`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_prog`
--

/*!50001 DROP VIEW IF EXISTS `v_prog`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_prog` AS select `a`.`Id_Materias` AS `id_materias`,`a`.`N_Mat` AS `n_mat`,`b`.`Nombre_Carrera` AS `nombre_carrera`,`c`.`sem` AS `sem` from ((`materias` `a` join `carrera` `b` on((`a`.`N_Carr` = `b`.`Id_Carreras`))) join `semestre` `c` on((`a`.`N_Sem` = `c`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21  2:20:08
