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

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Josie", 76, "puzzles, bingo, music", "Non ambulatory, very alert.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Delfin", 70, "music, reading", "Had stroke.  Limited mobility.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Charlie", 93, "reading, puzzles, bingo", "Has alzheimer's. Loves sweets but has diabetes.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Rose", 90, "knitting", "Has dimentia.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Carol", 88, "bingo", "Does not like loud noises.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Susie", 91, "crocheting, reading, music", "Non ambulatory.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Randy", 79, "reading", "Has alzheimer's.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Miwa", 90, "music", "Hospice");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Georgia", 95, "music", "Hospice");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Samuel", 74, "reading, puzzles", "Limited mobility.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Linda", 88, "knitting, crocheting, reading", "Has alzheimer's.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Laura", 96, "reading, puzzles", "Non ambulatory.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Morty", 81, "bingo, reading, music", "Has alzheimer's. Loves to talk.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Joanna", 79, "knitting, puzzles", "Non ambulatory.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Roxie", 91, "music", "Has alzheimer's.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Rocky", 84, "bingo, music", "Has dimentia. Non ambulatory.  Has diabetes.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Sally", 76, "gardening, reading", "Has dimentia. Gets aggitated easy.");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Barbara", 80, "music", "Hospice");


-- EXAMPLE REQUESTS
INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-03-15 13:00:00", "2019-03-15 17:00:00", 60, "animals, music performance, gardening", "", false, 1);

INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-04-22 09:00:00", "2019-04-22 12:00:00", 90, "crocheting, knitting", "Requesting to see Barbara.", true, 2);

INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-3-17 12:00:00, 2019-3-17 14:00:00", 120, "games, walking, knitting", "Requesting to see Kimi.", true, 1)

INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-3-31 12:00:00, 2019-3-17 13:00:00", 60, "animals, music, movies, cooking", "Requesting to see Sally.", false, 2)

INSERT INTO Requests (availabilityStart, availabilityEnd, visitDuration, activityPreferences, additionalInfo, communityServiceForm, UserId)
VALUES ("2019-3-30 13:00:00, 2019-3-17 14:00:00", 60, "walking, music, movies, cooking", "Requesting to see Linda.", false, 1)

-- EXAMPLE VISITS
INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-09 09:00:00", "2019-03-09 10:00:00", "knitting", false, false, 2, 1);

INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-09 09:00:00", "2019-03-09 10:00:00", "gardening", true, false, 1, 2);

INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-08 10:00:00", "2019-03-09 11:00:00", "animals", false, false, 1, 2);

INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-06 15:00:00", "2019-03-06 16:00:00", "music", true, true, 1, 2);

INSERT INTO Visits (visitStart, visitEnd, activities, communityServiceForm, confirmed, UserId, ResidentId)
Values ("2019-03-02 11:00:00", "2019-03-09 12:00:00", "cooking", true, false, 1, 2);