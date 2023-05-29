const { logger } = require("../../logger");
const { google } = require("googleapis");
const connect = require("../connect");

const sendRequest = async (requests, presentationId) => {
  try {
    const auth = await connect.getAuthentication();
    const slidesService = google.slides({ version: "v1", auth });
    await slidesService.presentations.batchUpdate({
      presentationId,
      resource: { requests: requests },
    });
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

const getNewSlidePagesElements = async (newSlideId, presentationId) => {
  try {
    const auth = await connect.getAuthentication();
    const slidesService = google.slides({ version: "v1", auth });
    const getNewSlide = await slidesService.presentations.pages.get({
      presentationId,
      pageObjectId: newSlideId,
    });
    const allPageElements = getNewSlide.data.pageElements;
    return allPageElements;
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

module.exports = {
  getNewSlidePagesElements,
  sendRequest,
};
