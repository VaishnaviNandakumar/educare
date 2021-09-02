const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Requests = require("../models/Requests");


router.get("/create-request", ensureAuthenticated, (req, res) =>
  res.render("create-request", {
    name: req.user.name,
  })
);

router.post("/create-request", (req, res) => {
    const { title, desc } = req.body;
    Requests.findOne({ title: title }).then((user) => {
        if (user) {
        errors.push({ msg: "Duplicate Post" });
        res.render("create-request", {
            title,
            desc
        });
        } else {
        const post = new Requests({
            title,
            desc
        });

        //Save user
        post.save()
        .then((user) => {
        req.flash("success_msg", "Request Created!");
        res.redirect("/org-dashboard");
        })
        .catch((err) => console.log(err));
        }
    });
  
});


module.exports = router;