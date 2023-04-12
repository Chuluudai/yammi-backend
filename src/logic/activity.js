const { logger } = require("../common/log");

const getActivity = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM Activity");
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
const insertActivity = async (request, response, pool) => {
  try {
    const { user_id, food_id, star_point } = request.body;
    await pool.query(
      "INSERT INTO Activity (user_id, food_id, star_point) values ($1, $2, $3)",
      [user_id, food_id, star_point]
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
const updateActivity = async (request, response, pool) => {
  try {
    const { user_id, food_id, star_point } = request.body;
    await pool.query(
      "UPDATE Activity SET user_id=$1, food_id=$2, star_point=$3",
      [user_id, food_id, star_point]
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
const deleteActivity = async (request, response, pool) => {
  try {
    const { user_id, food_id, star_point } = request.body;
    await pool.query("DELETE Activity user_id=$1, food_id=$2, star_point=$3", [
      user_id,
      food_id,
      star_point,
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
  getActivity,
  insertActivity,
  updateActivity,
  deleteActivity,
};
