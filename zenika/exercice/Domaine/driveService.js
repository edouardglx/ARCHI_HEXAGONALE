const { logger } = require("../logger");

class DriveService {
  constructor(driveServiceRepository) {
    this.driveServiceRepository = driveServiceRepository;
  }

  async getUrls() {
    try {
      const twoRandomUrls = await this.driveServiceRepository.getUrls();
      return twoRandomUrls;
    } catch (error) {
      logger.error({ message: error.message });
    }
  }
}

module.exports = {
  DriveService,
};
