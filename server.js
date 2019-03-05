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
