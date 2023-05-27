const {
  getTrainingsService,
} = require("../Infrastructure/googleSheet/sheetSpi");
const { logger } = require("../logger");

const getTrainingSheet = async (res) => {
  try {
    return await getTrainingsService(res);
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};

module.exports = {
  getTrainingSheet,
};
