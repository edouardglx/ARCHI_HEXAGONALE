const { logger } = require("../../logger");
const { getNewSlidePagesElements, sendRequest } = require("./slideWrapper");
const {
  TRAINING_WITH_US,
  TRAINING_WITH_US_GREEN,
  FORMEZ_VOUS,
  QUOI_DE_NEUF,
} = require("../../constante/constantes");
const { v4: uuidv4 } = require("uuid");

const presentationTrainingId = process.env.PRESENTATION_FILE_TRAINING_ID;
const presentationTalksId = process.env.PRESENTATION_FILE_TALKS_ID;
const trainWithUsSlideId = process.env.SLIDE_TEMPLATE_TRAIN_WITH_US_ID;
const formezVousSlideId = process.env.SLIDE_TEMPLATE_FORMEZ_VOUS_ID;
const trainWithUsGreenSlideId = process.env.SLIDE_TRAIN_WITH_US_GREEN_ID;

const getSuccessMessage = (template) => {
  const presentationId = getIdOftheFilePresentation(template);
  return {
    message: "Created !",
    link: "https://docs.google.com/presentation/d/" + presentationId + "/",
  };
};

const getIdOftheFilePresentation = (template) => {
  let presentationId = "";

  if (template === TRAINING_WITH_US || TRAINING_WITH_US_GREEN || FORMEZ_VOUS)
    presentationId = presentationTrainingId;

  // if (template === TRAINING_WITH_US_GREEN)
  //   presentationId = presentationTrainingId;

  // if (template === FORMEZ_VOUS) presentationId = presentationTrainingId;

  if (template === QUOI_DE_NEUF) presentationId = presentationTalksId;

  return presentationId;
};

const getIdForTheFirstImageToReplace = (template, getNewSlide) => {
  let idOfTheFirstImageToReplace = "";
  if (template === TRAINING_WITH_US || TRAINING_WITH_US_GREEN)
    idOfTheFirstImageToReplace = getNewSlide[8].objectId;

  if (template === FORMEZ_VOUS)
    idOfTheFirstImageToReplace = getNewSlide[9].objectId;

  return idOfTheFirstImageToReplace;
};

const getIdOfTheSecondImageToReplace = (template, getNewSlide) => {
  let idOfTheSecondImageToReplace = "";
  if (template === TRAINING_WITH_US_GREEN || TRAINING_WITH_US)
    idOfTheSecondImageToReplace = getNewSlide[9].objectId;

  if (template === FORMEZ_VOUS)
    idOfTheSecondImageToReplace = getNewSlide[9].objectId;
  return idOfTheSecondImageToReplace;
};

const replaceExistingImageRequest = (
  arrOfTwoUrl,
  idFirstImage,
  idSecondImage
) => {
  let firstId = idFirstImage;
  let secondId = idSecondImage;

  let firstUrl = arrOfTwoUrl[0];
  let secondUrl = arrOfTwoUrl[1];

  const request = [
    {
      replaceImage: {
        imageObjectId: firstId,
        imageReplaceMethod: "CENTER_INSIDE",
        url: firstUrl,
      },
    },
    {
      replaceImage: {
        imageObjectId: secondId,
        imageReplaceMethod: "CENTER_INSIDE",
        url: secondUrl,
      },
    },
  ];

  return request;
};

const getCopySlideId = async (template) => {
  const newIdPage = uuidv4();
  const requests = [];

  if (template === TRAINING_WITH_US)
    requests.push({
      duplicateObject: {
        objectId: trainWithUsSlideId,
        objectIds: { [trainWithUsSlideId]: newIdPage },
      },
    });

  if (template === TRAINING_WITH_US_GREEN)
    requests.push({
      duplicateObject: {
        objectId: trainWithUsGreenSlideId,
        objectIds: { [trainWithUsGreenSlideId]: newIdPage },
      },
    });

  if (template === FORMEZ_VOUS)
    requests.push({
      duplicateObject: {
        objectId: formezVousSlideId,
        objectIds: { [formezVousSlideId]: newIdPage },
      },
    });

  try {
    await sendRequest(requests, getIdOftheFilePresentation(template));
    return newIdPage;
  } catch (error) {
    logger.error({ message: error.message });
  }
};

const getCopySlidePageElements = async (newSlideId, template) => {
  try {
    return await getNewSlidePagesElements(
      newSlideId,
      getIdOftheFilePresentation(template)
    );
  } catch (error) {
    logger.error({ message: error.message });
  }
};

const updateNewCopySlide = async (
  template,
  copySlidePageElements,
  imagesUrls
) => {
  const request = [];
  try {
    const idFirstImage = getIdForTheFirstImageToReplace(
      template,
      copySlidePageElements
    );
    const idSecondImage = getIdOfTheSecondImageToReplace(
      template,
      copySlidePageElements
    );

    request.push(
      replaceExistingImageRequest(imagesUrls, idFirstImage, idSecondImage)
    );
    console.log("hello request", request);
    return await sendRequest(request, getIdOftheFilePresentation(template));
  } catch (error) {
    logger.error({ message: error.message });
  }
};

module.exports = {
  getIdOftheFilePresentation,
  getCopySlideId,
  getCopySlidePageElements,
  updateNewCopySlide,
  getSuccessMessage,
};
