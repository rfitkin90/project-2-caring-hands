var model = require("../models");
var express = require("express");
var router = express.Router();

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

module.exports = router;