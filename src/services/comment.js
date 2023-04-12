const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getComment,
  insertComment,
  updateComment,
  deleteComment,
} = require("../logic/comment");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.get("/api/comment", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/comment [GET]`);

      getComment(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/comment", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/comment [POST]`);

      insertComment(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/comment", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/comment [PUT]`);

      updateComment(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/comment", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/comment [DELETE]`);

      deleteComment(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
