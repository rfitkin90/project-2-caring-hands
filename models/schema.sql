DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
firstName VARCHAR(40) NOT NULL,
lastName VARCHAR(40) NOT NULL,
email VARCHAR(40) NOT NULL,
password VARCHAR(40) NOT NULL,
administrator BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS residents;
CREATE TABLE residents (
firstName VARCHAR(40) NOT NULL,
age INT,
additionalnfo TEXT,
activityPreferences TEXT,
visitsSchedule
);

DROP TABLE IF EXISTS request;
CREATE TABLE requests (
availabilityStart
availabilityEnd
activities
additionalInfo
communityServiceFormRequest
usersId INT NOT NULL,
);

DROP TABLE IF EXISTS scheduledVisits;
CREATE TABLE requests (
visitStart
visitEnd
activities
additionalInfo
communityServiceFormRequest
usersId INT NOT NULL,
residentsId INT NOT NULL
);