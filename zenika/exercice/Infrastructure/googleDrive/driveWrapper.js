const { google } = require("googleapis");
const { logger } = require("../../logger");
const connect = require("../connect");

const getTwoRandomUrl = async () => {
  try {
    const ImageFolderId = process.env.IMAGES_FOLDER_ID;
    const auth = await connect.getAuthentication();
    const driveService = google.drive({ version: "v3", auth });
    const fileResponse = await driveService.files.list({
      q: `mimeType='image/PNG' and parents='${ImageFolderId}'`,
      fields: "files(thumbnailLink)",
    });
    const arrayOfUrl = fileResponse.data.files;

    const selectTwoRandomUrl = (array) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      const arrayOfTwoObjects = shuffled.slice(0, 2);
      return arrayOfTwoObjects.map((obj) => obj.thumbnailLink);
    };
    const arrayOfTwoUrls = selectTwoRandomUrl(arrayOfUrl);

    return arrayOfTwoUrls;
  } catch (error) {
    logger.error({ message: `${error}` });
  }
};

module.exports = {
  getTwoRandomUrl,
};
