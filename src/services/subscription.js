const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getSubscription,
  insertSubscription,
  deleteSubscription,
  updateSubscription,
} = require("../logic/subscription");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/subscription", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/subscription [POST]`);

      insertSubscription(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/subscription", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/subscription [GET]`);

      getSubscription(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/subscription", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/subscription [DELETE]`);

      deleteSubscription(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/subscription", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/subscription [PUT]`);

      updateSubscription(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
