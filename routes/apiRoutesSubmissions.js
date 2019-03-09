var model = require("../models");
var express = require("express");
var router = express.Router();

// Updating visitors info to request table
router.post("/submissions", function (req, res) {
   // console.log('req.body', req.body);

   console.log(req.payload);


   model.Requests.create({
      availabilityStart: req.body.availabilityStart,
      availabilityEnd: req.body.availabilityEnd,
      visitDuration: req.body.visitDuration,
      activityPreferences: req.body.activityPreferences,
      additionalInfo: req.body.additionalInfo,
      communityServiceForm: req.body.communityServiceForm,
      UserId: req.payload.userID
   })
      .then(function (dbData) {
         res.json(dbData);
      })
      .catch(function (err) {
         console.error(err);
         throw err;
      });
});

//Get visitors info from the request table =====>from administrator perspective
router.get("/submissions", function (req, res) {
   model.Requests.findAll({ /* where: { userID: req.tokenData.userID } */ }).then(function (dbData) {
      res.json(dbData);
   })
      .catch(function (err) {
         console.log('submissions.get route err', err);
         throw err;
      });
});

// find appointment request by id
router.get('/submissions/:id', function (req, res) {
   model.Requests.findOne({ where: { id: req.params.id } }).then(function (dbData) {
      res.json(dbData);
      console.log('appointment request info:', dbData);
   })
      .catch(function (err) {
         console.log('submissions.get route err', err);
         throw err;
      });
   ;
});

// Delete an requests by id
router.delete("/submissions/:id", function (req, res) {
   model.Requests.destroy({ where: { id: req.params.id } }).then(function (dbData) {
      res.json(dbData);
   })
      .catch(function (err) {
         console.log(err);
         throw err;
      });
});

module.exports = router;