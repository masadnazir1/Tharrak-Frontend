// config/dbConfig.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "root_application",
  host: "applications-10324.7tc.aws-eu-central-1.cockroachlabs.cloud",
  database: "Tharrak_db",
  password: "d67gCsGV8SuuKakhBuq_fw",
  port: "26257",
  ssl: {
    rejectUnauthorized: false,
  },
});

if (pool.connect) {
  console.log("Db connected success!");
}

module.exports = pool;

// DB_USER=root_application
// DB_HOST=applications-10324.7tc.aws-eu-central-1.cockroachlabs.cloud
// DB_NAME=StoryTel_DB
// DB_PASSWORD=d67gCsGV8SuuKakhBuq_fw
// DB_PORT=26257
// DB_SSL=true
// JWT_SECRET=Email267423753jxcjdhfddhfdjhjhj
// CORS_ORIGIN=http://localhost:3000,https://galaxydev.pk/
