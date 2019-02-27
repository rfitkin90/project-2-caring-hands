var model = require("../models");

module.exports = function(app) {
  // Get all residents info
  app.get("/api/residents", function(req, res) {
    model.Residents.findAll({}).then(function(dbdata) {
      res.json(dbdata);
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

    }).then(function(dbdata) {
      res.json(dbdata);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
