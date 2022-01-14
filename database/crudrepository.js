const mysql = require("mysql");

require("dotenv").config();

//Info in env file
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
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
  }, //for POST REQUEST

  //for UPDATE REQUEST
  update: (word, id) => {
    function insert(resolve, reject) {
      pool.query(
        "UPDATE Dictionary SET ? WHERE id=?",
        [word, id],
        (err, words) => {
          if (err) {
            reject(err);
          } else {
            resolve([word, id], words);
          }
        }
      );
    }
    return new Promise(insert);
  },
};

module.exports = connection;
