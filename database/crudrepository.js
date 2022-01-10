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

//SQL requests
let connection = {
  //for GET REQUEST for all items in the database Dictionary
  findAll: () => {
    function findall(resolve, reject) {
      pool.query("select * from Dictionary", (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    }
    return new Promise(findall);
  },
  //for POST REQUEST
  save: (word) => {
    function insert(resolve, reject) {
      pool.query("INSERT INTO Dictionary SET ?", word, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(word, words);
        }
      });
    }
    return new Promise(insert);
  },
  //for DELETE REQUEST
  deleteById: (id) => {
    function deleteid(resolve, reject) {
      pool.query("DELETE FROM Dictionary WHERE id=?", id, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(id, words);
        }
      });
    }
    return new Promise(deleteid);
  },
  //Select and fetch words where TAG = selected tag
  findByTag: (tag) => {
    function find(resolve, reject) {
      pool.query("SELECT * FROM Dictionary WHERE tag=?", tag, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    }
    return new Promise(find);
  },
};

module.exports = connection;
