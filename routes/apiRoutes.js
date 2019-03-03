var model = require("../models");


module.exports = function(app) {

  // get id of user currently logged in

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

//authorisation
app.get("api/protect", function (req, res) {
  console.log("HELLO")
  res.json({
    message: "PROTECTED"
  });
});
};

// module.exports = function(app) {

//   // GET route for getting all of the posts
//   app.get("/api/posts/", function(req, res) {
//     db.Post.findAll({})
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

  // Get route for returning posts of a specific category
//   module.exports = function(app) {

//     // GET route for getting all of the posts
//     app.get("/api/posts/", function(req, res) {
//       db.Post.findAll({})
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
  
//     // Get route for returning posts of a specific category
//     app.get("/api/posts/category/:category", function(req, res) {
//       db.Post.findAll({
//         where: {
//           category: req.params.category
//         }
//       })
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
  
//     // Get route for retrieving a single post
//     app.get("/api/posts/:id", function(req, res) {
//       db.Post.findOne({
//         where: {
//           id: req.params.id
//         }
//       })
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
  
//     // POST route for saving a new post
//     app.post("/api/posts", function(req, res) {
//       console.log(req.body);
//       db.Post.create({
//         title: req.body.title,
//         body: req.body.body,
//         category: req.body.category
//       })
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
  
//     // DELETE route for deleting posts
//     app.delete("/api/posts/:id", function(req, res) {
//       db.Post.destroy({
//         where: {
//           id: req.params.id
//         }
//       })
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
  
//     // PUT route for updating posts
//     app.put("/api/posts", function(req, res) {
//       db.Post.update(req.body,
//         {
//           where: {
//             id: req.body.id
//           }
//         })
//         .then(function(dbPost) {
//           res.json(dbPost);
//         });
//     });
//   };
// }
