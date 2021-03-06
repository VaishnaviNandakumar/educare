const { request } = require("express");
const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const requestModel = require("../models/Requests");
const resourceModel = require("../models/Resource");
const Organization = require("../models/Organization");
const User = require("../models/User");
const Submissions = require("../models/Submissions");
const Admin = require("../models/Admin");

//Login Page
router.get("/login", (req, res) => res.render("user-login"));

//Register Page
router.get("/register", (req, res) => res.render("user-register"));

//Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
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
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("user-register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        var role = "user";
        const newUser = new User({
          name,
          email,
          password,
          role,
        });

        //Hash Password
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
                res.redirect("/user/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("user-local", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have logged out");
  res.redirect("/user/login");
});



module.exports = router;
