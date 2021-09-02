const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../models/User");
const Organization = require("../models/Organization");

module.exports = function (passport) {
  passport.use(
    "user-local",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email has not been registered yet!",
            });
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "org-local",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      Organization.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That NGO has not been registered yet!",
            });
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) done(err);
      if (user) {
        done(null, user);
      } else {
        Organization.findById(id, function (err, user) {
          if (err) done(err);
          done(null, user);
        })
      }
    })
  });
  
  
};
