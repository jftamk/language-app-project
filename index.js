const pool = require("./crudrepository.js"); //Connect to database functions
const bp = require("body-parser");

const express = require("express");
const app = express();
//Listen which port to use
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
const path = require("path");

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
//app.use(express.static("frontend/build"));

const Validator = require("jsonschema").Validator; //Validator for checking that values are right type when making POST request.
const validator = new Validator();
const schema = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 1 },
    eng: { type: "string" },
    fin: { type: "string" },
    tag: { type: "string" },
  },
  required: ["eng", "fin", "tag"],
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

//GET http://localhost:8080/Dictionary
dictionary.get("/All", async (req, res) => {
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

//GET http://localhost:8080/Dictionary/Colors
//Finds words with selected TAG
dictionary.get("/:tag([A-Z]+)", async (req, res) => {
  try {
    let tag = req.params.tag;
    let result1 = await pool.findByTag(tag);
    res.status(200).send(result1);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE WITH NEW WORD ON CERTAIN ID
dictionary.post("/:id([0-9]+)", async (req, res) => {
  let word = req.body;
  let id = req.params.id;
  const validation = validator.validate(word, schema); //Check if there's validation errors
  if (validation.errors.length > 0) {
    res.status(400).send(validation.errors); //STATUS 400 Bad request
  } else {
    await pool.update(word, id);
    res.status(201).send(word); //STATUS 201 Created, successful request and new resource created.
  }
});
