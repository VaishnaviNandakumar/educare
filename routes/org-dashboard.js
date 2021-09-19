const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
var fs = require("fs");
var path = require("path");
const  upload = require('../multer-storage/multer');

const Organization = require("../models/Organization");
const Requests = require("../models/Requests");
const Resource = require("../models/Resource");
const Submissions = require("../models/Submissions");



router.get("/create-funding-request", ensureAuthenticated, (req, res) =>
  res.render("org-funding-request", {
    name: req.user.name,
  })
);

router.get("/create-resource-request", ensureAuthenticated, (req, res) =>
  res.render("org-resource-request", {
    name: req.user.name,
  })
);

router.post("/create-funding-request", ensureAuthenticated, (req, res) => {
    const { title, desc, total } = req.body;
        var name = req.user.name;
        var current = 0;
        const post = new Requests({
            name,
            title,
            desc,
            total,
            current
        });
        //Save user
        post.save()
        .then((user) => {
        res.redirect("/org-dashboard");
        })
});


router.post("/create-resource-request", ensureAuthenticated, (req, res) => {
  const { title, desc, qty, brand, model } = req.body;
      var name = req.user.name;
      var status = "PENDING";
      var current = 0;
      const post = new Resource({
        name,
        title,
        desc,
        qty,
        current,
        brand,
        model,
        status
      });
      //Save user
      post.save().then((user) => {
        res.redirect("/org-dashboard");
      });
});



router.get("/applications", ensureAuthenticated, function (req, res) {
  Submissions.find({ org : req.user.name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
          res.render("org-applications", {
            details: allDetails,
            name: req.user.name,
          });
        }
    });
});

router.get("/verify", ensureAuthenticated, function (req, res) {
  Organization.find({ name : req.user.name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("org-verification", {
        details: allDetails,
        name: req.user.name,
      });
    }
  });
});

router.post("/verify", upload.single('file1'),  ensureAuthenticated, function (req, res) {
  var { rep, contact1, contact2} = req.body;
    Organization.findOneAndUpdate(
      { name: req.user.name },
      {
        $set: {
          representative: rep,
          contact1: contact1,
          contact2: contact2,
        },
      }
    ).exec(function (err, details) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        res.redirect("/org-dashboard");
      }
    });
});

router.post("/application", ensureAuthenticated,  function (req, res) {
  Submissions.find({_id: req.body.resID }, function (err, obj) {
    Submissions.update(
      { _id: req.body.resID },
      { $set: { status:  req.body.status } },
      function (err, allDetails) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/org-dashboard/applications");
        }
      }
    );
  });
});


module.exports = router;