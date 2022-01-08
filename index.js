const pool = require("./database/crudrepository.js"); //Connect to database functions
const bp = require("body-parser");

const express = require("express");
const app = express();

const listener = app.listen(8080, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

app.use(express.static("frontend/build"));
