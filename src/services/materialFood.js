const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMaterialFood,
  deleteMaterialFood,
  updateMaterialFood,
  insertMaterialFood,
} = require("../logic/materialFood");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/materialFood", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialFood [POST]`);

      insertMaterialFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/materialFood", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialFood [GET]`);

      getMaterialFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/materialFood", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialFood [DELETE]`);

      deleteMaterialFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/materialFood", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/materialFood [PUT]`);

      updateMaterialFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
