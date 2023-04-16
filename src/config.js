module.exports = {
  cockroach: {
    username: process.env.COCKROACHDB_USER,
    password: process.env.COCKROACHDB_PASSWORD,
    database: process.env.COCKROACHDB_DATABASE,
    host: process.env.COCKROACHDB_HOST, 
    dialect: 'postgres',
    port: process.env.COCKROACHDB_PORT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
    },
    },
  },
  cloudSQL: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    /*dialectOptions: {
      ssl: {
        // Configure SSL settings for your Cloud SQL instance

      },
    },*/
  },
};
