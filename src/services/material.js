const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMaterial,
  insertMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../logic/material");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/material", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/material [POST]`);

      insertMaterial(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/material", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/material [GET]`);

      getMaterial(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/material", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/material [DELETE]`);

      deleteMaterial(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/material", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/material [PUT]`);

      updateMaterial(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
