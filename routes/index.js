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
  version: "2019-02-26",
  authenticator: new IamAuthenticator({
    apikey: "svgRv9Vv0C8ymjkcUSzEZL98yxAPT2xpe1oCcJQVvuqE",
  }),
  serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com",
});


router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get("/contact", (req, res) => res.render('contact'));

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

router.get("/message", async (req, res) => {
    request1('http://localhost:8000/session', async (error, response, body) => {
        if (error) {
            res.send('An erorr occured')
        }
        else {
            var sessionID = body;
            console.log("Session ID : ", body);
            payload = {
                assistantId: "1cb263d0-410d-44fb-bfbf-3a20d8d9c86c",
                sessionId: sessionID,
                input: {
                message_type: "text",
                text: "What is educare?",
                },
            };
            try {
                const message = await assistant.message(payload);
                var text = message["result"]["output"]["generic"][0]["text"];
                console.log("Message: ", text);
                res.json(text);
            } catch (e) {
                console.log("Error with message : " + e);
            }
        }
    })
});

module.exports = router;
