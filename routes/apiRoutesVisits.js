var model = require("../models");
var express = require("express");
var router = express.Router();

//Update visits table ======> after administrator posts
router.post("/visits", function (req, res) {
   model.Visits.create({
      visitStart: req.body.visitStart,
      visitEnd: req.body.visitEnd,
      activity: req.body.activity,
      communityServiceForm: req.body.communityServiceForm,
      emailConfirmKey: req.body.emailConfirmKey,
      confirmed: req.body.confirmed,
      UserId: req.body.UserId,
      ResidentId: req.body.UserId
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
})

// set timeout to delete visit if not confirmed w/in 4 days
router.delete('/visits/autodelete/:emailConfirmKey', function (req, res) {
   setTimeout(function () {
      model.Visits.destroy({ where: { emailConfirmKey: req.params.emailConfirmKey, confirmed: false } })
         .then(function (dbData) {
            res.json(dbData);
         })
         .catch(function (err) {
            console.log(err);
            throw err;
         });
      ;
   }, 345600000);
});

// delete user's visit if they cancel
router.delete('/visits/:emailConfirmKey', function (req, res) {
   model.Visits.destroy({ where: { emailConfirmKey: req.params.emailConfirmKey } })
      .then(function (dbData) {
         res.json(dbData);
      })
      .catch(function (err) {
         console.log(err);
         throw err;
      });
   ;
});

// update confirmation status of visit
router.put('/visits/:emailConfirmKey', function (req, res) {
   model.Visits.update({ confirmed: true }, { where: { emailConfirmKey: req.params.emailConfirmKey } })
      .then(function (dbData) {
         res.json(dbData);
      })
      .catch(function (err) {
         console.log(err);
         throw err;
      });
   ;
});

// find visits by resident id
router.get('/visits/:id', function (req, res) {
   model.Visits.findAll({ where: { ResidentId: req.params.id } }).then(function (dbData) {
      res.json(dbData);
      console.log('appointment request info:', dbData);
   })
      .catch(function (err) {
         console.log('submissions.get route err', err);
         throw err;
      });
   ;
});

// find all visits
router.get('/visits/', function (req, res) {
   model.Visits.findAll({}).then(function (dbData) {
      res.json(dbData);
      console.log('all visit info', dbData);
   })
      .catch(function (err) {
         console.log('submissions.get route err', err);
         throw err;
      });
   ;
});

module.exports = router;