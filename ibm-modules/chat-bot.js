const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const assistant = new AssistantV2({
  version: "2019-02-26",
  authenticator: new IamAuthenticator({
    apikey: "svgRv9Vv0C8ymjkcUSzEZL98yxAPT2xpe1oCcJQVvuqE",
  }),
  serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com"
});

assistant
  .createSession({
    assistantId: "1cb263d0-410d-44fb-bfbf-3a20d8d9c86c"
  })
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.log(err);
  });

assistant
  .message({
    assistantId: "1cb263d0-410d-44fb-bfbf-3a20d8d9c86c",
    sessionId: "f5391823-d98c-435c-88cf-a7c0fbe83737",
    input: {
      message_type: "text",
      text: "What is educare?",
    },
  })
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.log(err);
  });