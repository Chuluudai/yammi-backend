const { logger } = require("../common/log");

const getSubscription = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM Subscription");
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

const insertSubscription = async (request, response, pool) => {
  try {
    const { user_id, created_date, qpay_inoice, qpay_inoice_id, status } =
      request.body;
    await pool.query(
      "INSERT INTO Food (user_id, created_date, qpay_inoice, qpay_inoice_id, status) values ($1, $2, $3, $4, $5)",
      [user_id, created_date, qpay_inoice, qpay_inoice_id, status]
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

const updateSubscription = async (request, response, pool) => {
  try {
    const { user_id, created_date, qpay_inoice, qpay_inoice_id, status } =
      request.body;
    await pool.query(
      "UPDATE Subscription SET user_id=$1, created_date=$2, qpay_inoice=$3, qpay_inoice_id=$4, status=$5",
      [user_id, created_date, qpay_inoice, qpay_inoice_id, status]
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

const deleteSubscription = async (request, response, pool) => {
  try {
    const { user_id, created_date, qpay_inoice, qpay_inoice_id, status } =
      request.body;
    await pool.query(
      "DELETE FROM Subscription SET user_id=$1, created_date=$2, qpay_inoice=$3, qpay_inoice_id=$4, status=$5",
      [user_id, created_date, qpay_inoice, qpay_inoice_id, status]
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
  getSubscription,
  insertSubscription,
  deleteSubscription,
  updateSubscription,
};
