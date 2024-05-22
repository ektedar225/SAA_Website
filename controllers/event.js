const CONSTANTS = require("../utils/constants");
const { EventTypes } = require("../models/events/EventTypes");
const { Events } = require("../models/events/Events");
const utils = require("../utils/utils");

module.exports = {
  eventsView: async (req, res, next) => {
    res.render("events", {
      [CONSTANTS.EVENTS_PAGE_RENDER_INPUTS.EventTypes]:
        await EventTypes.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }),
      [CONSTANTS.EVENTS_PAGE_RENDER_INPUTS.Events]: await Events.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }).then((data) => {

        return data.map((ele) => {
          return {
            ...ele,
            mediaFiles: utils.getFilesArrayInAFolder(ele.mediaDirectory),
          };
        })
        
      }),
    });
    next();
  },
};
