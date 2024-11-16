-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movie_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `anio` int DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'Interstellar','Un equipo de exploradores viaja más allá de esta galaxia a través de un recién descubierto agujero para descubrir si la humanidad tiene un futuro.','Pelicula',2014,'Ciencia Ficcion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730054/nq82uufwzztbjkjf8kdz.jpg'),(2,'Tenet','Christopher Nolan presenta este thriller de ciencia ficción sobre la manipulación del flujo del tiempo, con John David Washington como Protagonista.','Pelicula',2020,'Ciencia Ficcion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730077/mx107j6cf9wza493tbwf.jpg'),(3,'Dunkerque','Las tropas británicas y aliadas se ven rodeadas por fuerzas enemigas y enfrentan una feroz batalla en la Segunda Guerra Mundial.','Pelicula',2017,'Accion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730394/ugeke8ectdhovt1rkkqt.png'),(4,'El Caballero de la Noche','Batman está decidido a destruir el crimen organizado en Ciudad Gótica con la ayuda del Comandante Jim Gordon y el Fiscal de Distrito Harvey Dent.','Pelicula',2008,'Ciencia Ficcion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730257/hzcqz0gpa2quwafep9bx.jpg'),(5,'Sicario','Un agente del FBI es enviado por el gobierno para ayudar en la escalada de la guerra contra las drogas en la zona fronteriza entre los Estados y México.','Pelicula',2015,'Accion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730270/kmdlwueepv4e7dec9kat.jpg'),(6,'La llegada','Después de que doce naves espaciales misteriosas aparecen en todo el mundo, Un lingüista deberá trabajar con los militares para poder comunicarse con las formas de vida extraterrestres.','Pelicula',2016,'Ciencia Ficcion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730283/z5rylhgz7bdfjpsusg51.jpg'),(7,'Alien: Romulus','Los jóvenes de un mundo distante deben enfrentarse a la forma de vida más espeluznante del universo.\r\n','Pelicula',2024,'Ciencia Ficcion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731730293/g6gojtgqf4wlnpkypbkx.jpg'),(9,'Color Out of Space','Una granja aislada es golpeada por un meteorito que tiene consecuencias apocalípticas para la familia que vive allí.','Pelicula',2019,'Horror','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731786563/hzgxgvg2qwyztngsiqdl.jpg'),(10,'Guerra Civil','En un futuro próximo, un equipo de periodistas viajará por los Estados Unidos durante una guerra civil que se intensifica rápidamente y que se ha apoderado de toda la nación.','Pelicula',2024,'Accion','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731786696/oljo4sazh7zwyljndk8n.jpg'),(11,'La Sustancia','El terror corporal: La poderosa re-lectura feminista de Fargeat\r\n','Pelicula',2024,'Horror','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731786767/mnrcwvys2gcujjxp3k2f.jpg'),(12,'Deadpool & Wolverine','Nueva película de la franquicia, probablemente protagonizada por la X-Force.','Pelicula',2024,'Comedia','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731786843/uqbgaw1vqqaypx3ytnlr.png'),(13,'Desafiantes','Tres jugadores que se conocieron cuando eran adolescentes mientras compiten en un torneo de tenis para ser el ganador del mundialmente famoso Grand Slam, y reavivan viejas rivalidades dentro y fuera de la pista.','Pelicula',2024,'Drama','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731786980/oqxyvdgyrgn3kaf2v5rz.jpg'),(14,'Vi el brillo del televisor','Sigue a dos adolescentes que comparten su afición por un programa de televisión de terror, pero éste se cancela misteriosamente.','Pelicula',2024,'Drama','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731787239/wgcdap4l9grgbujaemnv.jpg'),(15,'Midsommar. El terror no espera la noche','Una pareja viaja a Suecia a un festival de verano en un pueblo rural, cuando todo parece ser el paseo perfecto, la situación se convierte en una violenta y extraña competencia a las manos de un culto pagano.','Pelicula',2019,'Horror','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731787316/zuysvmwhcxlxhdeqhyhl.jpg'),(16,'Batman','Cuando Riddler, un sádico asesino en serie, comienza a asesinar a figuras políticas clave en Gotham, Batman se ve obligado a investigar la corrupción oculta de la ciudad y cuestionar la participación de su familia.','Pelicula',2022,'Action','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731787488/eaqrfueoeqnwlxwfpfsp.jpg'),(17,'Furiosa','La historia de origen de la guerrera renegada Furiosa antes de formar equipo con Mad Max en \'Fury Road\'','Pelicula',2024,'Action','https://res.cloudinary.com/dvhgeskoj/image/upload/v1731787564/od4kom7toatgbwt7ud18.png');
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 14:20:29
