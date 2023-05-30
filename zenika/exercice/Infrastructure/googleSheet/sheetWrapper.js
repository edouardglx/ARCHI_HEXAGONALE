const { google } = require("googleapis");
const { logger } = require("../../logger");
const connect = require("../connect");

const getTrainingsService = async (res) => {
  try {
    const auth = await connect.getAuthentication();
    const googleSheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1LIWg-9DtXf3M6bIp4pkVb_8EWhQGkLhQ5YbIARHpCQs";

    const getRow = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId,
      range: "Evénements Hébergés",
    });
    res.send(getRow.data).status(200);
    logger.info({
      message: "your sheet has been sent",
    });
  } catch (error) {
    logger.error({
      message: error.message,
    });
  }
};

module.exports = {
  getTrainingsService,
};
