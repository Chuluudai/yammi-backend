const { logger } = require("../common/log");

const getFoods = async (request, response, pool) => {
  try {
    const { category_id, id } = request.query;

    const result =
      await pool.query(`select f.id, f.title, c.name  as category, f.img, f.how_to_cook, f.duration, f.description, AVG(coalesce(cm.rating, 0)) as rating from food f 
      left join category c on f.category_id = c.id 
      left join comment cm on cm.food_id = f.id 
      ${category_id ? `where category_id = '${category_id}'` : ""}
      ${id ? `where f.id = '${id}'` : ""}
      group by f.id, c."name" 
      order by c.name
      `);

    const step = await pool.query(`select * from step where food_id = $1`, [
      id,
    ]);

    return response.status(200).json({
      data: id ? result.rows[0] : result.rows,
      token: request.token,
      steps: step.rows,
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
      "UPDATE Food SET title=$1, img=$2, how_to_cook=$3, duration=$4, category_id=$5 WHERE id = $6",
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
