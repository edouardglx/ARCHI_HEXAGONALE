require("dotenv").config();
const { logger } = require("../logger");
const { GoogleAuth } = require("google-auth-library");

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/presentations",
  "https://www.googleapis.com/auth/drive",
];

const getAuthentication = async () => {
  const auth = new GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
  });
  logger.info({
    message: "authentication granted",
  });
  return auth.getClient();
};

module.exports = {
  getAuthentication,
};
