const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
} = require("../logic/category");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.get("/api/category", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/category [GET]`);

      getCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/category", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/category [POST]`);

      insertCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/category", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/category [PUT]`);

      updateCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/category", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/category [DELETE]`);

      deleteCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
