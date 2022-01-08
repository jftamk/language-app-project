const pool = require("./database/crudrepository.js"); //Connect to database functions
const bp = require("body-parser");

const express = require("express");
const app = express();

const listener = app.listen(8080, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

app.use(express.static("frontend/build"));

const Validator = require("jsonschema").Validator; //Validator for checking that values are right type when making POST request.
const validator = new Validator();
const schema = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 1 },
    eng: { type: "string" },
    fin: { type: "string" },
  },
  required: ["eng", "fin"],
};

//Let's create router
let dictionary = express.Router();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var cors = require("cors");
app.use(cors());

//Middleware
app.use("/Dictionary", dictionary);

//GET http://localhost:8080/Dictionary
dictionary.get("/", async (req, res) => {
  try {
    let result2 = await pool.findAll();
    res.status(200).send(result2);
  } catch (err) {
    res.status(500).send(err);
  }
});
