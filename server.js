/**
 * NODE_ENV: The current node enviorment, values must be testing, development,
 *  or production
 * secret: The JWT secret to encrypt our applications jwts
 */
require("dotenv").config();
// REQUIRES =====================================
// PACKAGES
var express = require("express");
var bodyParser = require("body-parser");
const authHelpers = require("./routes/helpers/auth.helpers");
// var exphbs = require("express-handlebars");
var jwt = require('express-jwt');
var jwtMiddleware = require('express-jwt-middleware');
var jwtCheck = jwtMiddleware(process.env.JWT_SECRET);

// ROUTES
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");
var authRoutes = require("./routes/authRoutes");
var db = require("./models");
// END REQUIRES ==================================

var app = express();
var PORT = process.env.PORT || 3000;

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});



// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set('view engine', 'jade');
// Routes
app.use("/auth", authRoutes);
app.use(auth);
app.use("/api", apiRoutes);
// app.use(htmlRoutes);

// app.use(jwtCheck);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// // Render 404 page for any unmatched routes
// app.get("*", function (req, res) {
//   res.render("404");
// });
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  var salt = authHelpers.getSalt();
  var hash = authHelpers.getHash(salt, "123");
  // ================================= example users ================================= //
  return db.User.create({
    email: 'jimbus@gmail.com',
    firstName: "jimbo",
    salt: salt,
    hash: hash,
    lastName: "scrimbo",
    role: "admin"
  })
})
  .then(function (resp) {
    var salt = authHelpers.getSalt();
    var hash = authHelpers.getHash(salt, "123");
    return db.User.create({
      email: 'jimbus2@gmail.com',
      firstName: "jimbo2",
      salt: salt,
      hash: hash,
      lastName: "scrimbo2",
      role: "user"
    })
  })
  // ================================= example appointment requests ================================= //
  .then(function (resp) {
    // adds example appointment request to database
    return db.Requests.create({
      availabilityStart: "2019-03-15T15:00",
      availabilityEnd: "2019-03-15T18:00",
      visitDuration: 60,
      activityPreferences: "Reading,Teach Technology,Sew/Knitting",
      additionalInfo: "Hello",
      communityServiceForm: true,
      UserId: 1
    })
  })
  .then(function (resp) {
    // adds example appointment request to database
    return db.Requests.create({
      availabilityStart: "2019-04-15T16:00",
      availabilityEnd: "2019-04-15T19:00",
      visitDuration: 120,
      activityPreferences: "Walking,Games,Music",
      additionalInfo: "Hello2",
      communityServiceForm: true,
      UserId: 2
    })
  })
  // ================================= example residents ================================= //
  .then(function (resp) {
    // adds example resident to database
    return db.Residents.create({
      firstName: 'Maggie',
      age: 70,
      activityPreferences: 'Music,Reading',
      additionalInfo: 'Maggie loves to listen to music and hear a good story. ' +
        'She is very pleasant to sit with and enjoys books.',
      photo: 'https://www.catholiccharitiesusa.org/wp-content/uploads/2018/04/' +
        'Story_Meals-on-Wheels-for-Senior-Citizens-1024x512.jpg'
    })
  })
  .then(function (resp) {
    // adds example resident to database
    return db.Residents.create({
      firstName: 'Beverly',
      age: 82,
      activityPreferences: 'Games,Sew/Knitting',
      additionalInfo: 'Beverly is a retired school teacher. ' +
        'She is a little forgetful but loves to play gin. She also loves to paint with water colors.',
      photo: 'http://www.commage.org/wp-content/uploads/2016/05/image-for-swiss-report-600x400.jpg'
    })
  })
  // ================================= example visits ================================= //
  .then(function (resp) {
    // adds example visit to database
    return db.Visits.create({
      visitStart: '2019-03-15T15:00',
      visitEnd: '2019-03-15T16:00',
      activities: 'Sew/Knitting',
      communityServiceForm: false,
      confirmed: false,
      UserId: 1,
      ResidentId: 1
    })
  })
  .then(function (resp) {
    // adds example visit to database
    return db.Visits.create({
      visitStart: '2019-04-15T16:00',
      visitEnd: '2019-04-15T17:00',
      activities: 'Music',
      communityServiceForm: false,
      confirmed: false,
      UserId: 2,
      ResidentId: 2
    })
  })
  // ================================= start server ================================= //
  .then(function (resp) {
    app.listen(PORT, function () {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
;

module.exports = app;