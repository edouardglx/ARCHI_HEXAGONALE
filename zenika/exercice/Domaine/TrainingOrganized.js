const { logger } = require("../logger");

const trainingDataOrganized = (data, template) => {
  try {
    console.log(data);
    console.log(template);

    // FILTER DATA :
    // const clusterCommonUniverseAndSortByDate = () => {
    //   const convertInObject = {};
    //   data.sort((a, b) => a.date.localeCompare(b.date));
    //   data.forEach((obj) => {
    //     const { universe } = obj;
    //     if (!(universe in convertInObject)) {
    //       convertInObject[universe] = [];
    //     }
    //     convertInObject[universe].push(obj);
    //   });
    //   return convertInObject;
    // };
    // const clusterUnivers = clusterCommonUniverseAndSortByDate();
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};

module.exports = {
  trainingDataOrganized,
};
