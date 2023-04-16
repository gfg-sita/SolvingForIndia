const mysql = require('mysql2/promise');

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

let pool = mysql.createPool(config);

async function manageOTP(queryStringOTP, parametersOTP) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results, fields] = await connection.execute(queryStringOTP, parametersOTP);
    return results;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = manageOTP;