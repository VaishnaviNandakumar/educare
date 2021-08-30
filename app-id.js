const request = require("request-promise");
const log4js = require("log4js");
const logger = log4js.getLogger("using-management-api");
logger.level = "DEBUG";
logger.info("Starting");

const CLOUD_IAM_URL = "https://iam.cloud.ibm.com/oidc/token";
const CLOUD_IAM_API_KEY = "aLx95MJgImmWPcJG2tpqahVccXW3M-_VLf7oRU4uR3kq";
const APPID_MANAGEMENT_URL =
  "https://au-syd.appid.cloud.ibm.com/management/v4/c242154d-67f4-4520-8256-00ae69c1351c";

const flow = process.argv[2];
logger.info("Running flow:", flow);

switch (flow) {
  case "get-users":
    getUsers();
    break;
  case "create-user":
    createUser();
    break;
  case "delete-user":
    deleteUser();
    break;
  default:
    logger.error("Unknown flow", flow);
    logger.error("Supported flows are: get-users, create-user, delete-user");
    process.exit(-1);
}

async function getCloudIamAccessToken() {
  logger.info(
    "Retrieving Cloud IAM access token with API key",
    CLOUD_IAM_API_KEY
  );
  let response = await request({
    method: "POST",
    url: CLOUD_IAM_URL,
    json: true,
    form: {
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: CLOUD_IAM_API_KEY,
    },
  });
  const accessToken = response["access_token"];
  logger.info("Retrieved Cloud IAM access token", accessToken);
  return accessToken;
}

async function getUsers() {
  const cloudIamAccessToken = await getCloudIamAccessToken();
  logger.info("Retrieving all users");
  let response = await request({
    method: "GET",
    url: APPID_MANAGEMENT_URL + "/cloud_directory/Users",
    json: true,
    headers: {
      Authorization: "Bearer " + cloudIamAccessToken,
    },
  });
  logger.info("Response:", response);
}

async function createUser() {
  const cloudIamAccessToken = await getCloudIamAccessToken();
  logger.info("Creating a new user");
  let response = await request({
    method: "POST",
    url: APPID_MANAGEMENT_URL + "/cloud_directory/Users",
    json: true,
    headers: {
      Authorization: "Bearer " + cloudIamAccessToken,
    },
    body: {
      userName: "vaishnavi.nk",
      password: "cja@#Fsmcspodv#",
      name: {
        firstName: "Vaishnavi",
        lastName: "Nandakumar",
      },
      emails: [
        {
          value: "vaishnavi_nk@example.com",
          primary: true,
        },
      ],
    },
  });
  logger.info("Response:", response);
}

async function deleteUser() {
  const cloudIamAccessToken = await getCloudIamAccessToken();
  const userId = process.argv[3];
  logger.info("Deleting a user with ID", userId);
  let response = await request({
    method: "DELETE",
    url: APPID_MANAGEMENT_URL + "/cloud_directory/Users/" + userId,
    json: true,
    headers: {
      Authorization: "Bearer " + cloudIamAccessToken,
    },
  });
  logger.info("Done!");
}
