const mysql = require("mysql");

require("dotenv").config();

//Info in env file
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

//Create connection using pool
pool.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});
//Release connection using pool
pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

let connection = {};

module.exports = connection;
