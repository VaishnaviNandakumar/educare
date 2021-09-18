const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const upload = require("../multer-storage/multer");
const Requests = require("../models/Requests");
const Resource = require("../models/Resource");
var fs = require("fs");
var path = require("path");
const Submissions = require("../models/Submissions");

router.post("/fund-contribution", ensureAuthenticated, function (req, res) {
  Requests.find({ _id: req.body.id_name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("user-fund-contribution", {
        details: allDetails,
        reqID: req.body.id_name,
      });
    }
  });
});

router.post("/resource-contribution", ensureAuthenticated, function (req, res) {
  Resource.find({ _id: req.body.id_name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("user-resource-contribution", {
        details: allDetails,
        reqID: req.body.id_name,
      });
    }
  });
});

router.post("/payment", ensureAuthenticated, function (req, res) {
  var { amount } = req.body;
  Requests.find({ _id: req.body.id_name }, function (err, obj) {
    const value = obj[0].current;
    var amt = +amount + +value;
    Requests.update(
      { _id: req.body.id_name },
      { $set: { current: amt } },
      function (err, allDetails) {
        if (err) {
          console.log(err);
        } else {
          res.render("user-payment", { amt: amount, name: req.user.name });
        }
      }
    );
  });
});

router.post("/submit-resource", upload.single('image') , ensureAuthenticated, (req, res) => {
  const { brand, model, info } = req.body;
  var user = req.user.name;
  var status = "PENDING";
  var reqID = req.body.res_name;
  var org = req.body.org_name;
  const post = new Submissions({
    org,
    user,
    reqID,
    brand,
    model,
    info,
    status,
    image: {
      data: fs.readFileSync(
        path.join(
          "C:\\Users\\Vaishnavi\\Desktop\\ibm-hack\\uploads\\" +
            req.file.filename
        )
      ),
      contentType: "image/png",
    },
  });
  post.save().then((user) => {
    res.render("user-submit-resource", { name: req.user.name });
  });
});

router.get("/view-applications", ensureAuthenticated, function (req, res) {
  Submissions.find({ user: req.user.name }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("user-application-status", {
        details: allDetails,
        name: req.user.name,
      });
    }
  });
});

module.exports = router;
