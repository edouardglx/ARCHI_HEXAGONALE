const { logger } = require("../../logger");
const { google } = require("googleapis");

const connect = require("../connect");
const {
  TRAINING_WITH_US,
  TRAINING_WITH_US_GREEN,
  FORMEZ_VOUS,
} = require("../../constante/constantes");

const trainWithUsSlideId = process.env.SLIDE_TEMPLATE_TRAIN_WITH_US_ID;
const formezVousSlideId = process.env.SLIDE_TEMPLATE_FORMEZ_VOUS_ID;
const trainWithUsGreenSlideId = process.env.SLIDE_TRAIN_WITH_US_GREEN_ID;
const presentationId = process.env.PRESENTATION_FILE_ID;

const copySlide = async (template) => {
  try {
    const auth = await connect.getAuthentication();
    const slidesService = google.slides({ version: "v1", auth });

    let requests = [];

    if (template === TRAINING_WITH_US)
      requests.push({ duplicateObject: { objectId: trainWithUsSlideId } });

    if (template === TRAINING_WITH_US_GREEN)
      requests.push({
        duplicateObject: { objectId: trainWithUsGreenSlideId },
      });

    if (template === FORMEZ_VOUS)
      requests.push({ duplicateObject: { objectId: formezVousSlideId } });

    const copyChoosenSlideTemplate =
      await slidesService.presentations.batchUpdate({
        presentationId: presentationId,
        resource: { requests: requests },
      });
    const newSlideId =
      copyChoosenSlideTemplate.data.replies[0].duplicateObject.objectId;
    return newSlideId;
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

const getNewSlidePagesElements = async (newSlideId) => {
  try {
    const auth = await connect.getAuthentication();
    const slidesService = google.slides({ version: "v1", auth });
    const getNewSlide = await slidesService.presentations.pages.get({
      presentationId: presentationId,
      pageObjectId: newSlideId,
    });
    const allPageElements = getNewSlide.data.pageElements;
    return allPageElements;
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

const updateCopySlide = async (request) => {
  const auth = await connect.getAuthentication();
  const slidesService = google.slides({ version: "v1", auth });
  try {
    const updateNewSlide = await slidesService.presentations.batchUpdate({
      presentationId: presentationId,
      resource: {
        requests: request,
      },
    });
    return updateNewSlide;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  getNewSlidePagesElements,
  copySlide,
  updateCopySlide,
};
