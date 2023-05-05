const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getFoods,
  insertFood,
  updateFood,
  deleteFood,
  getFoodsByMaterials,
} = require("../logic/food");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/food", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/food [POST]`);

      insertFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/foodbymaterials", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/foodbymaterials [POST]`);

      getFoodsByMaterials(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/food", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/food [GET]`);

      getFoods(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/food", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/food [DELETE]`);

      deleteFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/food", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/food [PUT]`);

      updateFood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
