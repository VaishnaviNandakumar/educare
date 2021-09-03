const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


const requestModel = require("../models/Requests");
 
//welcome page
router.get('/', (req, res) => res.render('welcome'));

//dashboard page
router.get("/dashboard", function (req, res) {
  requestModel.find({}, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("dashboard", { details: allDetails, name: req.user.name });
    }
  });
});

router.get("/org-dashboard", ensureAuthenticated, (req, res) =>
  res.render("org-dashboard", {
    name: req.user.name,
  })
);




module.exports = router;
