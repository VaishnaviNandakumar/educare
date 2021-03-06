const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
var fs = require("fs");
var path = require("path");
const upload = require("../multer-storage/multer");
var bodyParser = require("body-parser"); 
var jsonParser = bodyParser.json(); 


const Requests = require("../models/Requests");
const Resource = require("../models/Resource");
const Submissions = require("../models/Submissions");

const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");




const languageTranslator = new LanguageTranslatorV3({
  version: process.env.LANGUAGE_TRANSLATOR_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.LANGUAGE_TRANSLATOR_APIKEY,
  }),
  serviceUrl: process.env.LANGUAGE_TRANSLATOR_SERVICE_URL,
});

router.get("/", ensureAuthenticated, function (req, res) {
  Requests.find({}, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      Resource.find({}, function (err, resourceInfo) {
        if (err) {
          console.log(err);
        } else {
          languageTranslator.listLanguages().then((languages) => {
            var arr = [];
            for (var key in languages["result"]["languages"]) {
              var value =
                languages["result"]["languages"][key]["language_name"] +
                ":" +
                languages["result"]["languages"][key]["language"];
              arr.push(value);
            }
            //console.log(arr);
            res.render("user-dashboard", {
              details: allDetails,
              resourceDetails: resourceInfo,
              name: req.user.name,
              languages: arr,
            });
          });
        }
      });
    }
  });
});

router.post("/translate", jsonParser, function (req, res) {
  const translateParams = {
  text: req.body.word,
  modelId: req.body.to,
  };
  console.log("Text Params", translateParams)

  languageTranslator
    .translate(translateParams)
    .then(function (translationResult, reject) {
      res.send(JSON.stringify(translationResult["result"]["translations"][0]["translation"], null, 2));
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

router.post("/", function (req, res) {
  res.redirect("/payment-contribution");
});


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
