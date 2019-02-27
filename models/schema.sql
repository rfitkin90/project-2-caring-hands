DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   firstName VARCHAR(40) NOT NULL,
   lastName VARCHAR(40) NOT NULL,
   email VARCHAR(40) NOT NULL,
   password VARCHAR(40) NOT NULL,
   administrator BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS residents;
CREATE TABLE residents (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   firstName VARCHAR(40) NOT NULL,
   age INT,
   additionalnfo TEXT,
   activityPreferences TEXT
);

DROP TABLE IF EXISTS request;
CREATE TABLE requests (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   availabilityStart TIMESTAMP NOT NULL,
   availabilityEnd TIMESTAMP NOT NULL,
   activities TEXT,
   additionalInfo TEXT,
   communityServiceFormRequest BOOLEAN NOT NULL,
   usersId INT NOT NULL,
);

DROP TABLE IF EXISTS scheduledVisits;
CREATE TABLE scheduledVisits (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   visitStart TIMESTAMP NOT NULL,
   visitEnd TIMESTAMP NOT NULL,
   activities TEXT,
   additionalInfo TEXT,
   communityServiceFormRequest BOOLEAN NOT NULL,
   confirmed BOOLEAN NOT NULL,
   usersId INT NOT NULL,
   residentsId INT NOT NULL
);