const { logger } = require("../logger");

class SlideService {
  constructor(slideServiceRepository) {
    this.slideServiceRepository = slideServiceRepository;
  }

  async createSlides(training, template, talks, imagesUrls) {
    if (!this.verifyTraining(training) && training && imagesUrls && template)
      throw new Error("wrong format of training for the template");
    try {
      const idTemplate = await this.slideServiceRepository.getCopySlideId(
        template
      );
      logger.verbose({
        message: `id received for the slide template :${idTemplate}`,
      });
      console.log("id template++>", idTemplate);
      if (idTemplate) {
        const copySlidePageElements =
          await this.slideServiceRepository.getCopySlidePageElements(
            idTemplate,
            template
          );
        logger.verbose({
          message: `copy slide Elements received :${copySlidePageElements}`,
        });
        console.log("element pages", copySlidePageElements);
        await this.slideServiceRepository.updateNewCopySlide(
          template,
          copySlidePageElements,
          imagesUrls
        );
        return this.slideServiceRepository.getSuccessMessage(template);
      }
    } catch (error) {
      logger.error({ message: error.message });
    }

    // if (!this.verifyTalks(talks)) {
    //   throw new Error('wrong format of talk for "quoi de 9"');
    // }
    // const dataOrganizedBySlide = slideDataOrganizer.clusterByDate(talks);
    // logger.verbose({
    //   message: "data sorted for slide",
    // });
    // const idTemplate = await this.slideServiceRepository.getIdSlideTemplate();
    // logger.verbose({
    //   message: `id received for the slide template :${idTemplate}`,
    // });
    // const unorderedPromises = [];
    // for (const dataOrganized of dataOrganizedBySlide) {
    //   try {
    //     // le try est là pour empecher la suite du traitement si la slide n'a pas pu être copié
    //     const newIdPage = await this.copySlide(idTemplate);
    //     logger.verbose({
    //       message: `created new slide with id ${newIdPage}`,
    //     });
    //     unorderedPromises.push(
    //       new Promise((resolve) => {
    //         this.deleteTemplateInfo(newIdPage)
    //           .then(this.addTableData(newIdPage, dataOrganized))
    //           .then(resolve());
    //       })
    //     );
    //   } catch (e) {
    //     logger.error(e);
    //   }
    // }
    // await Promise.all(unorderedPromises);
    // logger.verbose({
    //   message: "all slides have been created",
    // });
    // return this.slideServiceRepository.getSuccessMessage();
  }

  verifyTraining(training) {
    if (!Array.isArray(training) || training.length <= 0) {
      return false;
    }
    return training.some(
      ({ date, universe, eventName }) =>
        Boolean(date) && Boolean(universe) && Boolean(eventName)
    );
  }

  verifyTalks(talks) {
    if (!Array.isArray(talks) || talks.length <= 0) {
      return false;
    }
    return talks.some(
      ({ date, eventType, eventName, talkTitle, speakers }) =>
        Boolean(date) &&
        Boolean(eventType) &&
        Boolean(eventName) &&
        Boolean(talkTitle) &&
        Boolean(speakers)
    );
  }
}

module.exports = {
  SlideService,
};
