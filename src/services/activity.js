const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getActivity,
  insertActivity,
  updateActivity,
  deleteActivity,
} = require("../logic/activity");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.get("/api/activity", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/activity [GET]`);

      getActivity(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/activity", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/activity [POST]`);

      insertActivity(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/activity", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/activity [PUT]`);

      updateActivity(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/activity", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/activity [DELETE]`);

      deleteActivity(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
