-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: COP4331
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) DEFAULT '',
  `Phone` varchar(50) DEFAULT NULL,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Contacts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'Admin','Admin','admin@admin.com','123-456-7890','2023-01-18 03:27:24',1),(2,'fred','secret','name@domain.net','800-000-0012','2023-01-18 03:27:24',1),(4,'Fred','Hardt','FredH@yahoo.net','748-055-0012','2023-01-20 04:16:54',2),(5,'test','test','name@test.net','800-000tes-0012','2023-01-20 04:26:02',2),(6,'dale','cooper','edited@domain.net','100-867-5309','2023-01-21 00:24:54',2),(7,'Fred','Hardt','FredH@yahoo.net','748-055-0012','2023-01-21 04:25:22',2),(8,'Fred','Hardt','FredH@yahoo.net','748-055-0012','2023-01-21 04:30:17',2),(9,'fred','secret','name@domain.net','800-000-0012','2023-01-21 16:21:52',1),(12,'fred','secret','name@domain.net','800-000-0012','2023-01-21 16:55:08',1),(15,'fred','secret','name@domain.net','800-000-0012','2023-01-22 23:23:07',1),(16,'bling','secret','name@domain.net','800-000-0012','2023-01-22 23:23:14',1),(18,'fred','secremett','name@domain.net','800-000-0012','2023-01-24 20:04:03',2),(19,'fred','ominous','name@domain.net','666-000-0012','2023-01-27 22:32:40',2),(20,'api','test','friend@domain.net','230-000-0012','2023-02-01 23:53:45',3),(21,'test','api','name@domain.net','800-000-0012','2023-02-01 23:53:59',1),(70,'sdgtdg','dff','dsfs@sdfg.aef','1234567890','2023-02-02 21:07:31',1),(71,'Jason','Evans','test@test.com','321-333-4444','2023-02-02 21:13:59',32),(72,'Jason','Evans','cop@gmail.com','111-222-3333','2023-02-02 21:53:15',32),(73,'Jason','Evans','cop@test.com','111-222-4444','2023-02-02 21:55:15',32),(74,'Jason','Evans','cop1@gmail.com','111-444-7777','2023-02-02 21:56:41',32),(75,'jevans','Evans','test@test.com','111-222-7777','2023-02-02 22:02:14',32),(76,'jevans','Evans','test@test.com','111-222-7777','2023-02-02 22:02:14',32),(77,'Jason','Evans','test@gmail.com','111-555-7777','2023-02-02 22:06:00',32),(78,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:47',3),(79,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:47',3),(80,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:48',3),(81,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:49',3),(82,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:51',3),(83,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:51',3),(84,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:51',3),(85,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:52',3),(86,'Be','Dhhs','Zvy@heh.djan','1234567890','2023-02-02 22:55:53',3),(87,'Jason','Evans','Jevans@test.com','111-222-9999','2023-02-02 23:55:08',32),(88,'test','test','test@test.com','123-456-7890','2023-02-03 02:16:20',1),(89,'Jason','Evans','test@test.co','111-666-7777','2023-02-03 02:30:33',32),(90,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:33:05',1),(94,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:33:54',2),(95,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:35:27',2),(99,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:39:36',1),(100,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:46:43',1),(102,'fred','secret','name@domain.net','800-000-0012','2023-02-03 02:46:58',1),(104,'John','test','test@test.com','333-333-3333','2023-02-03 02:55:16',32),(105,'Jason','Test','jason@test.com','111-222-4444','2023-02-03 03:06:42',32),(106,'jevans','Evans','jtest@gmail.com','222-444-6777','2023-02-03 03:14:01',32),(107,'Bill','Bob','bill@bob.com','123-456-7891','2023-02-03 04:36:56',1),(108,'lamp','lamp','lamp@emaiil.com','1231231234','2023-02-03 12:38:52',65),(109,'Justin','Mazor','jm@azor.com','123-456-7891','2023-02-03 15:46:33',2),(110,'Test','Test','test@test.com','123-456-7890','2023-02-03 21:34:15',11);
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `Login` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'2023-01-18 03:27:24','2023-02-03 21:34:54','Admin','Admin','admin','admin'),(2,'2023-01-18 03:27:24','2023-02-03 15:45:42','Justin','Mazor','jmazor','puppies'),(3,'2023-01-18 16:08:41','2023-01-18 16:08:41','Rick','Leinecker','RickL','COP4331'),(6,'2023-01-18 16:08:41','2023-01-18 16:08:41','Sam','Hill','SamH','0cbc6611f5540bd0809a388dc95a615b'),(8,'2023-01-19 21:38:15','2023-01-19 21:38:15','test','test','test','test'),(11,'2023-01-20 03:43:10','2023-02-03 21:33:54','first','last','user','pass'),(12,'2023-01-20 03:59:51','2023-01-20 03:59:51','Fred','Hardt','FredH','hunter2'),(18,'2023-01-21 18:48:42','2023-01-21 18:48:42','first','last','asdasd','pass'),(23,'2023-01-21 18:58:39','2023-01-21 18:58:39','first','last','splash','pass'),(26,'2023-01-25 16:43:11','2023-01-25 16:43:11','first','last','dasd','pass'),(28,'2023-01-26 01:32:56','2023-01-26 01:32:56','Jason','Evans','Array','cop321'),(32,'2023-01-26 01:37:57','2023-02-03 18:41:37','jason','evans','jevans','cop321'),(36,'2023-01-27 22:30:28','2023-01-27 22:30:28','BRE','lr','fgfg','fgfgg'),(37,'2023-01-27 22:30:47','2023-01-27 22:30:47','Brendan','Fraser','BrenF','areyoumymummy'),(39,'2023-01-27 22:54:28','2023-01-27 22:54:28','Jason','Evans','jeven','cop333'),(40,'2023-01-27 23:04:07','2023-01-27 23:04:07','LABTEST','LABSSSSSS','evil','twin123'),(41,'2023-01-27 23:06:13','2023-01-27 23:06:13','Jason','Evans','jevans1','cop333'),(44,'2023-01-27 23:16:47','2023-01-27 23:16:47','Test1','LAST','1','1'),(45,'2023-01-27 23:30:41','2023-01-27 23:30:41','t','t','t','12345'),(48,'2023-01-27 23:33:37','2023-01-27 23:33:37','t','t','l','12345'),(49,'2023-01-27 23:35:38','2023-01-27 23:35:38','t','asdfasdt','asdfasdl','PfhRbdn6y2X6Vza'),(50,'2023-01-28 03:32:34','2023-01-28 03:32:34','Jason','Evans','testName1','cop222'),(56,'2023-01-28 04:40:43','2023-01-28 04:40:43','Jason','Evans','jevanstest556','cop321'),(58,'2023-01-28 06:31:38','2023-01-28 06:31:38','t','t','csa1','12345'),(59,'2023-01-28 18:45:41','2023-01-28 18:45:41','Jason','Evans','jasontest554','cop121'),(60,'2023-01-30 23:09:45','2023-01-30 23:09:45','john','test','jtest','cop999'),(61,'2023-01-30 23:24:31','2023-01-30 23:24:31','Justub','Evans','justtest','cop111'),(64,'2023-02-02 02:22:24','2023-02-02 02:22:24','jim','bim','jimbobo','heehee123!'),(65,'2023-02-02 03:24:57','2023-02-02 03:24:57','example','person','exampleperson','exampleperson'),(67,'2023-02-02 05:01:26','2023-02-02 05:01:26','test','test','test1','test1'),(69,'2023-02-03 03:29:51','2023-02-03 03:29:51','First','Last','FirstLast','11111');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 21:37:03
