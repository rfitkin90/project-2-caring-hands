var model = require("../models");
var express = require("express");
var router = express.Router();
var sgMail = require('@sendgrid/mail');


router.post('/sendemail/', function (req, res) {
  console.log('send email post route hit');

  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('sendgrid api key set');

  // check for environment to send proper links in email
  if (process.env.NODE_ENV === "test") {
    const msg = {
      to: req.body.userEmail,
      from: 'noreply@caring-hands.com',
      subject: 'Confirm Caring Hands Appointment',
      text: 'caring-hands',
      html: `
      <p>You have been shceduled for an appointment to see ${req.body.residentName} from ${req.body.visitStart} to ${req.body.visitEnd} doing the following activity: ${req.body.activity}. If you requested a community service form, one will be provided to you at hte time of your appointment.</p>
      <p>To confirm your appointment, please click the following link:</p>
      <a href="http://localhost:3000/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=1">http://localhost:3000/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=1</a>
      <p>To decline or cancel your appointment at any time, you may click the following link:</p>
      <a href="http://localhost:3000/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=0">http://localhost:3000/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=0</a>
    `,
    };
    sgMail.send(msg);
  } else {
    const msg = {
      to: req.body.userEmail,
      from: 'noreply@caring-hands.com',
      subject: 'Confirm Caring Hands Appointment',
      text: 'caring-hands',
      html: `
      <p>You have been shceduled for an appointment to see ${req.body.residentName} from ${req.body.visitStart} to ${req.body.visitEnd} doing the following activity: ${req.body.activity}. If you requested a community service form, one will be provided to you at hte time of your appointment.</p>
      <p>To confirm your appointment, please click the following link:</p>
      <a href="https://mysterious-journey-53622.herokuapp.com/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=1">https://mysterious-journey-53622.herokuapp.com/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=1</a>
      <p>To decline or cancel your appointment at any time, you may click the following link:</p>
      <a href="https://mysterious-journey-53622.herokuapp.com/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=0">https://mysterious-journey-53622.herokuapp.com/visitConfirmation.html?k=${req.body.emailConfirmKey}&c=0</a>
    `,
    };
    sgMail.send(msg);
  }
  res.end();
});

module.exports = router;

// //authorisation
// router.get("/protect", function (req, res) {
//   if (!req.tokenData) {
//     // restricting route to only autheticated users
//     res.status(403).send('Unauthorized');
//   }
//   // populate filter
//   // use on get visits, delete visits, and update visits
//   // where.userID = req.tokenData.userID;

//   // // populate user foreign key
//   // visit.userID = req.tokenData.userID;

//   console.log("api/protected.request.tokenData", req.tokenData);
//   res.json({
//     message: "PROTECTED",
//     tokenData: req.tokenData
//   });
// });


