const { logger } = require("../../logger");
const { getTwoRandomUrl } = require("./driveWrapper");

const getUrls = async () => {
  console.log("toto");
  try {
    return await getTwoRandomUrl();
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

module.exports = {
  getUrls,
};
