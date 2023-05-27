const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require("dotenv").config();
const { getTrainingSheet } = require("./Domaine/training-sheet");
const { logger } = require("./logger");
const { trainingDataOrganized } = require("./Domaine/TrainingOrganized");
const { SlideService } = require("./Domaine/slideService");
const { DriveService } = require("./Domaine/driveService");
const googleSlideRepository = require("./Infrastructure/googleSlide/slideRepository");
const googleDriveRepository = require("./Infrastructure/googleDrive/driveRepository");

app.get("/", (req, res) => {
  try {
    return getTrainingSheet(res);
  } catch (error) {
    logger.error({ message: `${error}` });
  }
});

app.post("/training", async (req, res) => {
  const training = req.body;
  try {
    const driveServiceRepository = googleDriveRepository;
    const driveService = new DriveService(driveServiceRepository);
    const imageUrls = await driveService.getUrls();

    const slideServiceRepository = googleSlideRepository;
    const slideService = new SlideService(slideServiceRepository);

    const response = await slideService.createSlides(
      training,
      undefined,
      imageUrls
    );
    res.send(response).status(200);
  } catch (error) {
    logger.error({ message: `${error}` });
  }
});

app.listen(4001, () => {
  console.log("server has started on port 4001");
});
