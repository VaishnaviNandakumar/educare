var request = require("request");

const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const languageTranslator = new LanguageTranslatorV3({
  version: "2018-05-01",
  authenticator: new IamAuthenticator({
    apikey: "WnvH9w8cDcGJGLwFOhS_gJM2fmaNb50bQf9esQ9wYRWV",
  }),
  serviceUrl: "https://api.au-syd.language-translator.watson.cloud.ibm.com",
});

const translateParams = {
  text: "Hello, how are you today?",
  modelId: "en-ru",
};

languageTranslator
  .translate(translateParams)
    .then((translationResult) => {
        var res = JSON.stringify(translationResult, null, 2);
        var jsonParsed = JSON.parse(res);
        console.log(
            JSON.stringify(translationResult["result"]["translations"][0]["translation"], null, 2)
      );
  })
  .catch((err) => {
    console.log("error:", err);
  });

languageTranslator
    .listLanguages()
  .then((languages) => {
      var arr = []
      for (var key in languages["result"]["languages"]) {
        var value =
          languages["result"]["languages"][key]["language_name"] +
          ":" +
          languages["result"]["languages"][key]["language"];
        arr.push(value);
      }
      //console.log(arr);
    })
    .catch((err) => {
      console.log("error:", err);
    });

