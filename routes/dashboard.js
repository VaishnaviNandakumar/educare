const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Requests = require("../models/Requests");
const Resource = require("../models/Resource");

router.get("/create-request", ensureAuthenticated, (req, res) =>
  res.render("create-request", {
    name: req.user.name,
  })
);

router.get("/resource", ensureAuthenticated, (req, res) =>
  res.render("resource", {
    name: req.user.name,
  })
);

router.post("/create-request", (req, res) => {
    const { title, desc, total } = req.body;
    Requests.findOne({ title: title }).then((user) => {
      if (user) {
       
        errors.push({ msg: "Duplicate Post" });
          res.render("create-request", {
            title,
            desc,
            total
        });
        } else {
        
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
        }
    });
  
});


router.post("/resource", (req, res) => {
  const { title, desc, qty, brand, model } = req.body;
  Resource.findOne({ title: title }).then((user) => {
    if (user) {
      errors.push({ msg: "Duplicate Post" });
      res.render("resource", {
        title,
        desc,
        qty,
        brand,
        model
      });
    } else {
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
    }
  });
});


module.exports = router;