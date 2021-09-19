const { request } = require('express');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bcrypt = require("bcryptjs");
const passport = require("passport");

const requestModel = require("../models/Requests");
const resourceModel = require("../models/Resource");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Submissions = require('../models/Submissions');
const Admin = require('../models/Admin');
 
//welcome page
router.get('/', (req, res) => res.render('welcome'));
router.get('/about', (req, res) => res.render('about'));
router.get("/contact", (req, res) => res.render('contact'));



router.get("/dashboard", ensureAuthenticated, function (req, res) {
  requestModel.find({}, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      resourceModel.find({}, function (err, resourceInfo) {
        if (err) {
          console.log(err);
        } else {
          res.render("user-dashboard", {
            details: allDetails,
            resourceDetails: resourceInfo,
            name: req.user.name,
          });
        }
      });
    }
  });
});

router.post("/dashboard", function (req, res) {
   res.redirect("/payment-contribution")
});

router.get("/org-dashboard", ensureAuthenticated, function (req, res) {
  Organization.find({ name: req.user.name }, function (err, orgInfo) {
      requestModel.find({ name: req.user.name }, function (err, allDetails) {
        resourceModel.find(
          { name: req.user.name },
          function (err, resourceInfo) {
            if (err) {
              console.log(err);
            } else {
              res.render("org-dashboard", {
                details: allDetails,
                resourceDetails: resourceInfo,
                orgInfo : orgInfo,
                name: req.user.name,
              });
            }
          }
        );
      });
  })

});



module.exports = router;
