const { logger } = require("../../logger");
const {
  copySlide,
  getNewSlidePagesElements,
  updateCopySlide,
} = require("./slideWrapper");
const {
  TRAINING_WITH_US,
  TRAINING_WITH_US_GREEN,
  FORMEZ_VOUS,
} = require("../../constante/constantes");

const getIdForTheFirstImageToReplace = (template, getNewSlide) => {
  let idOfTheFirstImageToReplace;
  console.log(getNewSlide);
  if (template === TRAINING_WITH_US)
    idOfTheFirstImageToReplace = getNewSlide[8].objectId;

  if (template === TRAINING_WITH_US_GREEN)
    idOfTheFirstImageToReplace = getNewSlide[9].objectId;

  if (template === FORMEZ_VOUS)
    idOfTheFirstImageToReplace = getNewSlide[9].objectId;
  return idOfTheFirstImageToReplace;
};

const getIdOfTheSecondImageToReplace = (template, getNewSlide) => {
  let idOfTheSecondImageToReplace;
  if (template === TRAINING_WITH_US_GREEN)
    idOfTheSecondImageToReplace = getNewSlide[9].objectId;

  if (template === TRAINING_WITH_US)
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
  try {
    return await copySlide(template);
  } catch (error) {
    logger.error(error.message);
  }
};

const getCopySlidePageElements = async (newSlideId) => {
  try {
    return await getNewSlidePagesElements(newSlideId);
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
    return await updateCopySlide(request);
  } catch (error) {
    logger.error({ message: error.message });
  }
};

module.exports = {
  getCopySlideId,
  getCopySlidePageElements,
  updateNewCopySlide,
};
