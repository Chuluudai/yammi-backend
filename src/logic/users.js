const { logger } = require("../common/log");

const getUsers = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
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
const insertUsers = async (request, response, pool) => {
  try {
    const { firstname, lastname, phone, password, created_date } = request.body;
    await pool.query(
      "INSERT INTO Users (firstname, lastname, phone, password, created_date) values ($1, $2, $3, $4, $5)",
      [firstname, lastname, phone, password, created_date]
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
const updateUsers = async (request, response, pool) => {
  try {
    const { firstname, lastname, phone, password, created_date, id } =
      request.body;
    await pool.query(
      "UPDATE Users SET firstname=$1, lastname=$2, phone=$3, password=$4, created_date=$5, where id=$6",
      [firstname, lastname, phone, password, created_date, id]
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
const deleteUsers = async (request, response, pool) => {
  try {
    const { user_id, food_id, comment } = request.body;
    await pool.query(
      "DELETE Users firstname=$1, lastname=$2, phone=$3, password=$4, created_date=$5, where id=$6",
      [firstname, lastname, phone, password, created_date, id]
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
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
};
