CREATE TABLE `users` (
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `likes` (
  `username` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  `like` tinyint(1) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `likes_FK` (`user_id`),
  CONSTRAINT `likes_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 