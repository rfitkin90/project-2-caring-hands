var model = require("../models");
var express = require("express");
var router = express.Router();


// get id of user currently logged in

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

// router.get('/submissions/', function (req,res))

//Update visits table ======> after administrator posts
router.post("/visits", function (req, res) {
  model.Visits.create({
    visitStart: req.body.visitStart,
    visitEnd: req.body.visitEnd,
    activity: req.body.activity,
    communityServiceForm: req.body.communityServiceForm,
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

// Delete an requests by id
router.delete("/requests/:id", function (req, res) {
  model.Requests.destroy({ where: { id: req.params.id, userID: req.tokenData.userID } }).then(function (dbData) {
    res.json(dbData);
  })
    .catch(function (err) {
      console.log(err);
      throw err;
    });
});

//authorisation
router.get("/protect", function (req, res) {
  if (!req.tokenData) {
    // restricting route to only autheticated users
    res.status(403).send('Unauthorized');
  }
  // populate filter
  // use on get visits, delete visits, and update visits
  // where.userID = req.tokenData.userID;

  // // populate user foreign key
  // visit.userID = req.tokenData.userID;

  console.log("api/protected.request.tokenData", req.tokenData);
  res.json({
    message: "PROTECTED",
    tokenData: req.tokenData
  });
});

// find user by id
router.get('/user/:id', function (req, res) {
  model.User.findOne({ where: { id: req.params.id } }).then(function (dbData) {
    res.json(dbData);
    console.log('user info:', dbData);
  })
    .catch(function (err) {
      console.log('user.get route err', err);
      throw err;
    });
  ;
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
router.get('/visitsResidents/:id', function (req, res) {
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

module.exports = router;

