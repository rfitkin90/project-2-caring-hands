DROP DATABASE IF EXISTS info_db;
CREATE DATABASE info_db;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

-- EXAMPLE USERS

-- EXAMPLE RESIDENTS
INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Barbara", 76, "crocheting, reading, gardening", "Has dimentia.","<img src=https://www.kxl.com/wp-content/uploads/2018/09/Marcine_Herinck.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Debra", 81, "knitting, bingo", "Has alzheimer's.","<img src=https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/05/16/18/rosina-coleman.jpg?w968h681>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Josie", 76, "puzzles, bingo, music", "Non ambulatory, very alert.","<img src=https://www.abc.net.au/news/image/9044464-3x2-340x227.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Delfin", 70, "music, reading", "Had stroke.  Limited mobility.","<img src=https://www.aop.org.uk/ot/-/media/ot/content-listing-images/science-and-vision/research/research-2017/elderlylady3.jpg?h=405&la=en&w=720&hash=44D639AED4BD56538E45F6908E59D409>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Charlie", 93, "reading, puzzles, bingo", "Has alzheimer's. Loves sweets but has diabetes.","<img src=https://wset.com/resources/media/ccacab46-5273-4f40-91ce-9d98e089b38b-medium16x9_jimmywebb3.PNG>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Rose", 90, "knitting", "Has dimentia.","img src=https://images.glaciermedia.ca/polopoly_fs/1.2148177.1452537853!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/raging-grannies-ringleader-rallies-on.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Carol", 88, "bingo", "Does not like loud noises.","<img src=https://www.itsnicethat.com/system/files/112013/527752215c3e3c36e6000443/index_default/LIST.jpg?1438262866>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Susie", 91, "crocheting, reading, music", "Non ambulatory.","<img src=https://media.fox5atlanta.com/media.fox5atlanta.com/photo/2018/06/10/S%20%2090%20YO%20GREAT-GRANDMA%20GRADUATES%20FROM%20COLLEGE%20_00.00.12.25_1528640668603.png_5649371_ver1.0_640_360.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Randy", 79, "reading", "Has alzheimer's.","img src=https://i.kinja-img.com/gawker-media/image/upload/u20tpr65p2hkqga7mhwj.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Miwa", 90, "music", "Hospice","<img src=http://4.bp.blogspot.com/-mJx5tXiGSX8/TmRv1mAsWaI/AAAAAAAABkg/d1i5KD_pv8U/s1600/Dignity%2BTherapy.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Georgia", 95, "music", "Hospice","<img src=https://media.istockphoto.com/photos/smiling-grandmother-drinking-coffee-at-home-picture-id884058944?k=6&m=884058944&s=612x612&w=0&h=DCARGq4j3sZcXI49VV3tcumsS9S_kWlfU4G4MTxiQ1I=>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Samuel", 74, "reading, puzzles", "Limited mobility.","<img src=http://solussupportservices.com/wp-content/uploads/2015/08/male-elderly-250.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Linda", 88, "knitting, crocheting, reading", "Has alzheimer's.","<img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd37Ei6HCv5DH_CZMVTHo2d_BrXCaCrwdgGzX6vJ5F3QCrBd_6>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Laura", 96, "reading, puzzles", "Non ambulatory.","<img src=https://media.npr.org/assets/img/2017/03/23/nuchoextra1-429ed6152cd6eaf6a78a1ecf204a6ea9a0f2fecc-s1100-c15.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Morty", 81, "bingo, reading, music", "Has alzheimer's. Loves to talk.","img src=https://i.cbc.ca/1.3792719.1507162051!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/fred-van-zuiden.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Joanna", 79, "knitting, puzzles", "Non ambulatory.","<img src=http://d1dc7fy73ia9qh.cloudfront.net/wp-content/uploads/2017/01/Sixty-and-Me_What-it-Means-to-Say-I-am-Not-a-Grandmother-740x416.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Roxie", 91, "music", "Has alzheimer's.","<img src=http://www.grandmotherscouncil.org/wp-content/uploads/2018/03/IMG_2365sm_post.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Rocky", 84, "bingo, music", "Has dimentia. Non ambulatory.  Has diabetes.","<img src=https://i.kinja-img.com/gawker-media/image/upload/s--BWZS0nI9--/c_scale,f_auto,fl_progressive,q_80,w_800/kwzcs0lworcd5kavupcu.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Sally", 76, "gardening, reading", "Has dimentia. Gets aggitated easy.", "<img src=https://www.open-pharmacy-research.ca/wp-content/uploads/elderly-woman-deprescribing-e1423543289803.jpg>");

INSERT INTO Residents (firstName, age, activityPreferences, additionalInfo)
VALUES ("Barbara", 80, "music", "Hospice","<img src=https://cf.ltkcdn.net/seniors/images/orig/128337-301x399-Prognosis-for-Pulmonary-Hypertension-in-elderly-woman.jpg>");


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