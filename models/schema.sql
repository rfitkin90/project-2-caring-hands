DROP DATABASE IF EXISTS info_db;
CREATE DATABASE info_db;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

-- EXAMPLE USERS

-- EXAMPLE RESIDENTS
INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Barbara", 76, "crocheting, reading, gardening", "Has dimentia.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Debra", 81, "knitting, bingo", "Has alzheimer's.");

-- EXAMPLE REQUESTS
INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-03-15 13:00:00", "2019-03-15 17:00:00", 60, "animals, music performance, gardening", "", false, 1);

INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-04-22 09:00:00", "2019-04-22 12:00:00", 90, "crocheting, knitting", "Requesting to see Barbara.", true, 2);

-- EXAMPLE VISITS
INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-09 09:00:00", "2019-03-09 10:00:00", "knitting", false, false, 2, 1);

INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-09 09:00:00", "2019-03-09 10:00:00", "gardening", true, false, 1, 2);