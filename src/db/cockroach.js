const { Pool } = require("pg");

const config = {
  host: "sita-project-2504.7s5.cockroachlabs.cloud",
  port: 26257,
  database: "users",
  user: "chetany",
  password: process.env.COCKROACHDB_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
};

const pool = new Pool(config);

let connection = 0;

pool.connect(function (err, client, done) {
  if (err) {
    console.error(err);
    done();
  } else {
    connection = 1;
  }
});

async function runQuery(queryString, params) {
  if (connection == 1) {
    try {
      const result = await pool.query(queryString, params);
      return result.rows;
    } catch (err) {
      return err;
    }
  } else {
    return "Connection to database failed";
  }
}

module.exports = runQuery;
