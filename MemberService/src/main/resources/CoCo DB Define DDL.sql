CREATE DATABASE  IF NOT EXISTS `project1db` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project1db`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project1db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `content` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  `writer` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT '0',
  `code` text COLLATE utf8mb3_bin,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`board_id`),
  KEY `writer` (`writer`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`writer`) REFERENCES `member` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `writer` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  `content` varchar(100) COLLATE utf8mb3_bin DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `board_id` (`board_id`),
  KEY `comment_to_member_fk` (`writer`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `comment_to_member_fk` FOREIGN KEY (`writer`) REFERENCES `member` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `name` varchar(16) COLLATE utf8mb3_bin NOT NULL,
  `email` varchar(64) COLLATE utf8mb3_bin NOT NULL,
  `role` varchar(10) COLLATE utf8mb3_bin DEFAULT 'user',
  `rating` int DEFAULT '0',
  `reg_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `del_flag` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `manner_range` CHECK (((`rating` >= 0) and (`rating` <= 10000)))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(160) COLLATE utf8mb3_bin NOT NULL,
  `user_id` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  `host_id` varchar(32) COLLATE utf8mb3_bin NOT NULL,
  `title` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `content` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `host_rating` int DEFAULT '0',
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mode` varchar(10) COLLATE utf8mb3_bin NOT NULL,
  `is_live` tinyint(1) DEFAULT '0',
  `number_users` int DEFAULT '0',
  `max` int DEFAULT '10',
  PRIMARY KEY (`room_id`),
  KEY `host_id` (`host_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `member` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `room_chk_1` CHECK ((`mode` in (_utf8mb4'study',_utf8mb4'relay'))),
  CONSTRAINT `room_chk_2` CHECK ((`is_live` in (0,1))),
  CONSTRAINT `room_chk_3` CHECK (((`max` >= 2) and (`max` <= 10)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-30 10:08:28
