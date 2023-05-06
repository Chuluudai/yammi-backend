const { logger } = require("../common/log");

const getComment = async (request, response, pool) => {
  try {
    const { food_id } = request.query;
    const result = await pool.query(
      "SELECT * FROM Comment where food_id = $1",
      [food_id]
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
const insertComment = async (request, response, pool) => {
  try {
    const { user_id, food_id, comment, rating } = request.body;
    await pool.query(
      "INSERT INTO Comment (user_id, food_id, comment) values ($1, $2, $3, $4)",
      [user_id, food_id, comment, rating]
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
const updateComment = async (request, response, pool) => {
  try {
    const { user_id, food_id, comment } = request.body;
    await pool.query("UPDATE Comment SET user_id=$1, food_id=$2, comment=$3", [
      user_id,
      food_id,
      comment,
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
const deleteComment = async (request, response, pool) => {
  try {
    const { user_id, food_id, comment } = request.body;
    await pool.query("DELETE Comment user_id=$1, food_id=$2, comment=$3", [
      user_id,
      food_id,
      comment,
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
  getComment,
  insertComment,
  updateComment,
  deleteComment,
};
