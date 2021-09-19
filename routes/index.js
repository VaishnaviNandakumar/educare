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
router.get('/about', (req, res) => res.render('about'));
router.get("/contact", (req, res) => res.render('contact'));





module.exports = router;
