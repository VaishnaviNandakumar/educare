const { request } = require('express');
const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


const requestModel = require("../models/Requests");
const resourceModel = require("../models/Resource");
const Submissions = require('../models/Submissions');
 
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
          res.render("dashboard", {
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
   res.redirect("/contribute")
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

router.post("/contribute", ensureAuthenticated, function (req, res) {
  requestModel.find({ _id: req.body.id_name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("contribute", {
        details: allDetails,
        reqID: req.body.id_name,
      });
    }
  });
});


router.post("/res-contribute", ensureAuthenticated, function (req, res) {
  resourceModel.find({ _id: req.body.id_name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("user-resource", {
        details: allDetails,
        reqID: req.body.id_name,
      });
    }
  });
});


router.post("/payment", function (req, res) {
  var { amount } = req.body;
  requestModel.find({ _id: req.body.id_name }, function (err, obj) {
    const value = obj[0].current;
    var amt = +amount + +value;
    requestModel.update(
      { _id: req.body.id_name },
      { $set: { current: amt } },
      function (err, allDetails) {
        if (err) {
          console.log(err);
        } else {
          res.render("payment", { amt: amount, name: req.user.name });
        }
      }
    );
  });
});


router.post("/submit-resource", (req, res) => {
  const {brand, model, info } = req.body;
  var user = req.user.name;
  var status = "PENDING";
  var reqID = req.body.res_name;
  const post = new Submissions({
    user,
    reqID,
    brand,
    model,
    info,
    status,
  });
    post.save().then((user) => {
     res.render("submit-resource", {name: req.user.name });
    });
});





module.exports = router;
