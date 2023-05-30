const { logger } = require("../logger");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
require("dayjs/locale/fr");

dayjs.extend(customParseFormat);
dayjs.locale("fr");

const clusterCommonUniverse = (data) => {
  const convertInObject = {};
  data.forEach((obj) => {
    const { universe } = obj;
    if (!(universe in convertInObject)) {
      convertInObject[universe] = [];
    }
    convertInObject[universe].push(obj);
  });
  return convertInObject;
};

const sortByDate = (data) => {
  data.sort((a, b) => a.date.localeCompare(b.date));
  return data;
};

const transformDate = (data) => {
  let dataUpdated = [];
  data.forEach((obj) => {
    let startDate = dayjs(obj.date, "DD-MM-YYYY").format("DD MMMM");
    let endDate = dayjs(obj.date, "DD-MM-YYYY")
      .add(obj.duration - 1, "day")
      .format("DD MMMM");

    dataUpdated.push({
      title: obj.talkTitle,
      universe: obj.universe,
      date: "Du " + startDate + " au " + endDate + ".",
    });
  });

  return dataUpdated;
};

const trainingDataOrganized = (data) => {
  try {
    const trainingSortedByDate = sortByDate(data);

    const tranformDate = transformDate(trainingSortedByDate);

    const clusterUnivers = clusterCommonUniverse(tranformDate);
    console.log(clusterUnivers);
    return clusterUnivers;
  } catch (error) {
    logger.error({
      message: `${error}`,
    });
  }
};

module.exports = {
  trainingDataOrganized,
};
