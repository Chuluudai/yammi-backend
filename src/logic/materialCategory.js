const { logger } = require("../common/log");

const getMaterialCategory = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM MaterialCategory");
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
const insertMaterialCategory = async (request, response, pool) => {
  try {
    const { name, created_date } = request.body;
    await pool.query(
      "INSERT INTO MaterialCategory (name, created_date) values ($1, $2)",
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
const updateMaterialCategory = async (request, response, pool) => {
  try {
    const { name, created_date, id } = request.body;
    await pool.query("UPDATE Material SET name=$1, created_date=$2, id=$3", [
      name,
      created_date,
      id,
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
const deleteMaterialCategory = async (request, response, pool) => {
  try {
    const { name, created_date, id } = request.body;
    await pool.query("DELETE Material name=$1, created_date=$2, id=$3", [
      name,
      created_date,
      id,
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
  getMaterialCategory,
  insertMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
};
