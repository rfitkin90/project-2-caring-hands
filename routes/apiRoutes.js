var model = require("../models");


module.exports = function(app) {
  // Get all residents info
  app.get("/api/residents", function(req, res) {
    model.Residents.findAll({})
    .then(function(dbData) {
      res.json(dbData);
    })
    .catch(function(err){
      console.log(err);
      throw err;
    });
  });

  // Updating visitors info to request table
  app.post("/api/requests", function(req, res) {
    model.Requests.create({
      availabilityStart: req.body.availabilityStart,
      availabilityEnd: req.body.availabilityEnd,
      visitDuration: req.body.visitDuration,
      activityPreferences: req.body.activityPreferences,
      additionalInfo: req.body.additionalInfo,
      communityServiceForm: req.body.communityServiceForm
    })
    .then(function(dbData) {
      res.json(dbData);
    })
    .catch(function(err){
      console.error(err);
      throw err;
    });
  });

  //Get visitors info from the request table =====>from administrator perspective
  app.get("/api/requests", function(req, res){
      model.Requests.findAll({}).then(function(dbData){
        res.json(dbData);
      })
      .catch(function(err){
        console.log(err);
        throw err;
      });
  });

  //Update visits table ======> after administrator posts
  app.post("api/visits", function(req,res){
    model.Visits.create({
      visitStart: req.body.visitStart,
      visitEnd: req.body.visitEnd,
      visitDuration: req.body.visitDuration,
      activities: req.body.activities, 
      communityServiceForm: req.body.communityServiceForm,
      confirmed: req.body.confirmed
    })
    .then(function(dbData) {
      res.json(dbData);
    })
    .catch(function(err) {
      console.log(err);
      throw err;    
    });
  })

  // Delete an requests by id
  app.delete("/api/requests/:id", function(req, res) {
    model.Requests.destroy({ where: { id: req.params.id } }).then(function(dbData) {
      res.json(dbData);
    })
    .catch(function(err){
      console.log(err);
      throw err;
    });
  });
};
