const { logger } = require("../common/log");

const getCategory = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM Category");
    return response.status(200).json({
      data: result.rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const insertCategory = async (request, response, pool) => {
  try {
    const { name, created_date } = request.body;
    await pool.query(
      "INSERT INTO Category (name, created_date) values ($1, $2)",
      [name, created_date]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const updateCategory = async (request, response, pool) => {
  try {
    const { id, name, created_date } = request.body;
    await pool.query("UPDATE Category SET id=$1, name=$2, created_date=$3", [
      id,
      name,
      created_date,
    ]);
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};
const deleteCategory = async (request, response, pool) => {
  try {
    const { id, name, created_date } = request.body;
    await pool.query("DELETE FROM Category id=$1, name=$2, created_date=$3", [
      id,
      name,
      created_date,
    ]);
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
};
