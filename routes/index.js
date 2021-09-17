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
router.get('/admin-login', (req, res) => res.render('admin-login'));
router.get("/admin-register", (req, res) => res.render("admin-register"));
router.get('/about', (req, res) => res.render('about'));
router.get("/contact", (req, res) => res.render('contact'));

router.get("/admin-dashboard", function (req, res) {
  Organization.find({}, function (err, orgInfo) {
    if (err) {
      console.log(err);
    } else {

      User.find({}, function (err, userInfo) {
        if (err) {
          console.log(err);
        } else {
          res.render("admin-dashboard", {
            userDetails: orgInfo,
            orgDetails: userInfo,
          });
        }
      });
    }
  });
});


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
  requestModel.find({name : req.user.name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
       resourceModel.find({ name: req.user.name }, function (err, resourceInfo) {
         if (err) {
           console.log(err);
         } else {
           res.render("org-dashboard", {
             details: allDetails,
             resourceDetails : resourceInfo,
             name: req.user.name,
           });
         }
       });
    }
  });
});

router.post("/admin-login", (req, res, next) => {
  passport.authenticate("admin-local", {
    successRedirect: "/admin-dashboard",
    failureRedirect: "/admin-login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/admin-register", (req, res) => {
  const { adminID, password, password2 } = req.body;
  let errors = [];

  if (!adminID || !password || !password2) {
    errors.push({ msg: "Please fill in all fields." });
  }
  //Check required fields
  if (password != password2) {
    errors.push({ msg: "Passwords do not match!" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Your password must contain atleast 8 characters." });
  }

  if (errors.length > 0) {
    res.render("user-register", {
      adminID,
      password,
      password2,
    });
  } else {
    //Validation passed
    Admin.findOne({ adminID : adminID }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("user-register", {
          adminID,
          password,
          password2,
        });
      } else {
        const newUser = new Admin({
          adminID,
          password
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;

            //Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in."
                );
                res.redirect("/admin-login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});


module.exports = router;
