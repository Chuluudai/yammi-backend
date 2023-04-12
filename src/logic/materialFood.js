const { logger } = require("../common/log");

const getMaterialFood = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM MaterialFoods");
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

const insertMaterialFood = async (request, response, pool) => {
  try {
    const { material_id, food_id } = request.body;
    await pool.query(
      "INSERT INTO MaterialFood (material_id, food_id) values ($1, $2)",
      [material_id, food_id]
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

const updateMaterialFood = async (request, response, pool) => {
  try {
    const { material_id, food_id } = request.body;
    await pool.query("UPDATE MaterialFood SET material_id=$1, food_id=$2", [
      material_id,
      food_id,
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

const deleteMaterialFood = async (request, response, pool) => {
  try {
    const { material_id, food_id } = request.body;
    await pool.query("DELETE FROM MaterialFood material_id=$1, food_id=$2", [
      material_id,
      food_id,
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
  getMaterialFood,
  insertMaterialFood,
  deleteMaterialFood,
  updateMaterialFood,
};
