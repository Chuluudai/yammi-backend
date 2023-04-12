const { logger } = require("../common/log");

const getFoods = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM Food");
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

const insertFood = async (request, response, pool) => {
  try {
    const { title, img, how_to_cook, duration, category_id } = request.body;
    await pool.query(
      "INSERT INTO Food (title, img, how_to_cook, duration, category_id) values ($1, $2, $3, $4, $5)",
      [title, img, how_to_cook, duration, category_id]
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

const updateFood = async (request, response, pool) => {
  try {
    const { title, img, how_to_cook, duration, category_id, id } = request.body;
    await pool.query(
      "UPDATE Food SET title=$1, img=$2, how_to_cook=$3, duration=$4, category_id=$5 where id = $6",
      [title, img, how_to_cook, duration, category_id, id]
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

const deleteFood = async (request, response, pool) => {
  try {
    const { title, img, how_to_cook, duration, category_id, id } = request.body;
    await pool.query(
      "DELETE FROM Food title=$1, img=$2, how_to_cook=$3, duration$4, category_id=$5 WHERE id = $6",
      [title, img, how_to_cook, duration, category_id, id]
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
  getFoods,
  insertFood,
  deleteFood,
  updateFood,
};
