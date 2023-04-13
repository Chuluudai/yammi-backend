const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMaterialCategory,
  insertMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
} = require("../logic/materialCategory");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/materialCategory", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialCategory [POST]`);

      insertMaterialCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/materialCategory", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialCategory [GET]`);

      getMaterialCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/materialCategory", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialCategory [DELETE]`);

      deleteMaterialCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/materialCategory", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialCategory [PUT]`);

      updateMaterialCategory(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
