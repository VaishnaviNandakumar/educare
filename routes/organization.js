const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const Organization = require("../models/Organization");

//Login Page
router.get("/login", (req, res) => res.render("org-login"));

//Register Page
router.get("/register", (req, res) => res.render("org-register"));

//Register Handle
router.post("/register", (req, res) => {
  const { name, email, location, funding, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !location || !funding || !password || !password2) {
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
    res.render("org-register", {
      errors,
      name,
      email,
      location,
      funding,
      password,
      password2,
    });
  } else {
    //Validation passed
    Organization.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Organization already registered" });
        res.render("org-register", {
          errors,
          name,
          email,
          location,
          funding,
          password,
          password2,
        });
      } else {
        var role = "org";
        const newUser = new Organization({
          name,
          email,
          location,
          funding,
          password,
          role
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
                res.redirect("/org/login");
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
  passport.authenticate('org-local', {
    successRedirect: "/org-dashboard",
    failureRedirect: "/org/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have logged out");
  res.redirect("/org/login");
});

module.exports = router;
