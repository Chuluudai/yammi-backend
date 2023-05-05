const { logger } = require("../common/log");

const getMaterial = async (request, response, pool) => {
  try {
    const { material_category_id } = request.query;

    const result = await pool.query(
      `SELECT * FROM material
    ${
      material_category_id
        ? `where material_category_id='${material_category_id}'`
        : ""
    }`
    );
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
const insertMaterial = async (request, response, pool) => {
  try {
    const { name, material_category_id } = request.body;
    await pool.query(
      "INSERT INTO Material (name, material_category_id) values ($1, $2)",
      [name, material_category_id]
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
const updateMaterial = async (request, response, pool) => {
  try {
    const { name, material_category_id, id } = request.body;
    await pool.query(
      "UPDATE Material SET name=$1, material_category=$2, id=$3",
      [name, material_category_id, id]
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
const deleteMaterial = async (request, response, pool) => {
  try {
    const { name, material_category_id, id } = request.body;
    await pool.query(
      "DELETE Material name=$1, material_category_id=$2, id=$3",
      [name, material_category_id, id]
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

module.exports = {
  getMaterial,
  insertMaterial,
  updateMaterial,
  deleteMaterial,
};
