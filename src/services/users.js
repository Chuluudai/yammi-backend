const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
} = require("../logic/users");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.get("/api/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/users [GET]`);

      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/users [POST]`);

      insertUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.put("/api/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/users [PUT]`);

      updateUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/users", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/users [DELETE]`);

      deleteUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
