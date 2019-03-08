var model = require("../models");
var express = require("express");
var router = express.Router();

// Get all residents info
router.get("/residents", function (req, res) {
   model.Residents.findAll({})
      .then(function (dbData) {
         res.json(dbData);
      })
      .catch(function (err) {
         console.log(err);
         throw err;
      });
});

// create new resident
router.post("/residents", function (req, res) {
   model.Residents.create({
      firstName: req.body.firstName,
      age: req.body.age,
      activityPreferences: req.body.activityPreferences,
      additionalInfo: req.body.additionalInfo,
      photo: req.body.photo
   })
      .then(function (dbData) {
         res.json(dbData);
         console.log('dbData', dbData);

      })
      .catch(function (err) {
         console.log(err);
         throw err;
      });
   ;
});


module.exports = router;