var models = require("../models");
var express = require("express");
var jwt = require('jsonwebtoken');
var router = express.Router();
var helpers = require("./helpers/auth.helpers");
var routeHelpers = require("./helpers/route.helper");

router.post("/login", function (req, res) {

    if(!req.body.password|| !req.body.email){
        return(res.status(400).json({msg: new Error("Please put all data on the body.")}));
    }
     // when the http://localhost:3000/auth/login request is sent from the client, to the server
    // it lands here.
    var user = {
        email: req.body.email,
        password: req.body.password
    }
    // Using sequalizer model, a select query is triggered. WHERE clause is set with the email
    models.User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(function (resp) {
            // If we get a response back from the MySQL, then it lands here.
            // If there were no entry found in the database, then "resp" object will be null
            // set send a 401 Unauthorized back
            if (resp === null) {
                routeHelpers.sendJsonError(res, new Error(""), 401);
            }
            if (helpers.checkIfValidPass(resp, user.password)) {
                // If the password matches, then generate a new token and deliver it back with
                var expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);

                res.json({
                    token: jwt.sign({
                        exp: parseInt(expiry.getTime() / 1000),
                        userID: resp.id,
                        name: resp.name,
                        email: resp.email,
                        scaryStuff: "OOGA BOOOGA"
                    }, process.env.JWT_SECRET)
                });
            }
            else {
                 // If password doesn't match, then send back 401
                routeHelpers.sendJsonError(res, new Error("WRONG PASSWORD"), 401);
            }
        })
        .catch(function (err) {
             // If any other exception occurs, then send a 400 (default) back.
             console.log(err);
            routeHelpers.sendJsonError(res, err);
        })
});

// Create a new example
router.post("/register", function (req, res) {
    // console.log("register");
    if(!req.body.name|| !req.body.password|| !req.body.email){  
        return(res.status(400).json({msg: new Error("Please put all data on the body.")}));
    }
    var user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }
    var salt = helpers.getSalt();

    var userInstance = {
        salt: salt,
        email: user.email,
        hash: helpers.getHash(salt, user.password),
        name: user.name
    }
    console.log(userInstance.salt, userInstance.hash);

    models.User.create(userInstance)
        .then(function (resp) {
            res.status(201).json({ message: "Creation Sucess!", id: resp.id })
        })
        .catch(function (err) {
            res.status(400).json({msg: err.toString()});
            routeHelpers.sendJsonError(res, err);
        })
});

module.exports = router;
