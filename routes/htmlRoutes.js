var models = require("../models");



module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
     models.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //Load request page
  app.get("/", function(req, res) {
    models.Requests.findAll({}).then(function(dbRequests) {
     res.render("request", {Requests : dbRequests});
   });
  });
  
  //Load residents page
  app.get("/", function(req, res) {
    models.Residents.findAll({}).then(function(dbResidents) {
     res.render("residents", {Residents : dbResidents});
   });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
