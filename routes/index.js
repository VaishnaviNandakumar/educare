const { request } = require('express');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const bcrypt = require("bcryptjs");
const passport = require("passport");
var request1 = require("request");

const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const assistant = new AssistantV2({
  version: process.env.WATSON_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_APIKEY,
  }),
  serviceUrl: process.env.WATSON_URL,
});


router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get("/contact", (req, res) => res.render("contact", { answer: "" }));

router.get('/session', async (req, res) => {
    try {
        const session = await assistant.createSession({
        assistantId: "1cb263d0-410d-44fb-bfbf-3a20d8d9c86c",
        });
        res.send(session["result"]["session_id"]);
    }
    catch (e){
    console.log("Error creating session : " + e);
    }    
})

router.post("/contact", async (req, res) => {
    request1('http://localhost:8000/session', async (error, response, body) => {
        if (error) {
            res.send('An erorr occured')
        }
        else {
            var sessionID = body;
            payload = {
                assistantId: process.env.WATSON_ID,
                sessionId: sessionID,
                input: {
                message_type: "text",
                text: req.body.question,
                },
            };
            try {
                const message = await assistant.message(payload);
                var text = message["result"]["output"]["generic"][0]["text"];
                //console.log("Message: ", text);
                res.render('contact', {answer : text});
            } catch (e) {
                console.log("Error with message : " + e);
            }
        }
    })
});

module.exports = router;
