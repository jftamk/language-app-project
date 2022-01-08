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
    let result2 = await pool.findAll(); //findAll function from crudrepository
    res.status(200).send(result2); //STATUS 200 successful response
  } catch (err) {
    res.status(500).send(err); //Server encountered problem.
  }
});

dictionary.post("/", async (req, res) => {
  let word = req.body;
  const validation = validator.validate(word, schema); //Check if there's validation errors
  if (validation.errors.length > 0) {
    res.status(400).send(validation.errors); //STATUS 400 Bad request
  } else {
    await pool.save(word);
    res.status(201).send(word); //STATUS 201 Created, successful request and new resource created.
  }
});

//DELETE http://localhost:8080/Dictionary/3
dictionary.delete("/:id([0-9]+)", async (req, res) => {
  let id = req.params.id;
  await pool.deleteById(id); //Call deleteById function from crudreposityory and take id as parameter
  res.status(204).send(null); //STATUS 204 , no content
});
