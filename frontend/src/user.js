import React, { useState, useEffect, useRef } from "react";
import TableComp from "./table.js";
import TableComp2 from "./table2.js";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Alert } from "@mui/material";

//Init arrays
const list = [];
var score = 0;
var lang = "";
var answerlist = [];
var state1 = [];
function USER(props) {
  const [state, setState] = useState(list); //main list
  const [category, setCategory] = useState(""); //Category items
  const [urls, setURL] = useState(""); //For selecting category
  const [header, setHeader] = useState(""); //For headers
  const [result, setResult] = useState(""); //For results
  const [again, setAgain] = useState(""); //For trying again, clear all
  const [answers, setAnswers] = useState(""); //For trying again, clear all
  const [alert, setAlert] = useState("");
  const [alert2, setAlert2] = useState("");

  //Fetch list with selected category--------------
  useEffect(() => {
    const fetchData = async () => {
      setURL("/Dictionary/" + category);
    };

    fetchData();
  }, [category]);

  //Fetch where English visible and Finnish as input
  /**
   * @return {state} with English visible and Finnish as input
   */
  const getEnglish = async () => {
    //Clear after calling
    score = 0;
    lang = "eng";
    setResult("");
    setAgain("");
    setAlert("");
    setAnswers("");
    answerlist = [];
    //Fetch english list
    const result = await fetch(urls);
    const list = await result.json();
    const ui = list.map((index) => {
      return (
        <>
          <TableComp
            eng={index.eng}
            id={index.id}
            finnish={index.fin}
            classname="textfield"
            placeholder="input the finnish word"
            onChanges={onChanges}
            onWrong={onWrong}
          />{" "}
        </>
      );
    });

    console.log(ui);
    setState(ui);
    //Set headers for table
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell>FINNISH</TableCell>
        </TableRow>
      </TableHead>
    );
  };
  //Fetch where Finnish visible and English as input
  const getFinnish = async () => {
    //Clear after calling
    score = 0;
    lang = "fin";
    answerlist = [];
    setAnswers("");
    setResult("");
    setAgain("");
    setAlert("");
    //Fetch finnish list
    const result = await fetch(urls);
    const list2 = await result.json();
    const ui = list2.map((index) => {
      return (
        <>
          <TableComp2
            eng={index.eng}
            id={index.id}
            finnish={index.fin}
            classname="textfield"
            placeholder="type english"
            onChanges={onChanges}
            onWrong={onWrong}
          />{" "}
        </>
      );
    });
    console.log(ui);
    setState(ui);
    //Set headers for table
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell>FINNISH</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  async function onChanges(b, a) {
    answerlist.push({ eng: a, correct: b });
    console.log(b);
    console.log(a);

    score++;
  }

  async function onWrong(b, a) {
    answerlist.push({ eng: a, wrong: b });
    console.log(b);
    console.log(a);
  }

  async function checkresult() {
    console.log(urls);
    if (state === list) {
      setAlert(
        <Alert
          onClose={() => {
            setAlert("");
          }}
          variant="filled"
          severity="error"
        >
          No answers yet!
        </Alert>
      );
    } else {
      const check = "YOUR SCORE: " + score + "/" + state.length;
      setResult(check);

      if (score === state.length) {
        setAlert(
          <Alert
            onClose={() => {
              setAlert("");
            }}
          >
            Congratulations! All words correct
          </Alert>
        );
      } else {
        setAlert("");
      }

      setAgain(
        <Button
          variant="contained"
          sx={{ m: 3, width: 200 }}
          onClick={TryAgain}
        >
          Try again
        </Button>
      );
      //Fetch english list
      console.log(answerlist);
      const checked = answerlist.map((index) => {
        return (
          <>
            <TableRow>
              <TableCell> {index.eng}</TableCell>

              <TableCell style={{ backgroundColor: "lightgreen" }}>
                {" "}
                {index.correct}
              </TableCell>
              <TableCell style={{ backgroundColor: "#FFD2D2" }}>
                {" "}
                {index.wrong}
              </TableCell>
            </TableRow>
          </>
        );
      });
      state1 = state;
      setState("");

      if (lang === "eng") {
        setHeader(
          <TableHead>
            <TableRow>
              <TableCell>ENGLISH</TableCell>
              <TableCell style={{ backgroundColor: "lightgreen" }}>
                CORRECT
              </TableCell>
              <TableCell style={{ backgroundColor: "#FFD2D2" }}>
                INCORRECT
              </TableCell>
            </TableRow>
          </TableHead>
        );
      } else {
        setHeader(
          <TableHead>
            <TableRow>
              <TableCell>FINNISH</TableCell>
              <TableCell style={{ backgroundColor: "lightgreen" }}>
                CORRECT
              </TableCell>
              <TableCell style={{ backgroundColor: "#FFD2D2" }}>
                INCORRECT
              </TableCell>
            </TableRow>
          </TableHead>
        );
      }
      setAnswers(checked);
    }

    console.log(result);
  }

  async function TryAgain() {
    //Try again
    //Set the score back to 0
    score = 0;
    answerlist = [];
    setState(state1);
    setResult("");
    setAnswers("");
    setAlert("");
    setHeader(
      <TableHead>
        <TableRow>
          <TableCell>ENGLISH</TableCell>
          <TableCell>FINNISH</TableCell>
        </TableRow>
      </TableHead>
    );
    //Find all inputs and set their value back to empty.
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setAgain("");
  }

  return (
    <div className="Apps">
      <h1>Learn languages!</h1>
      <h2>Translate the words</h2>
      <Button
        variant="contained"
        sx={{ m: 3, width: 200 }}
        onClick={getEnglish}
      >
        From English to Finnish
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 3, width: 200 }}
        onClick={getFinnish}
      >
        From Finnish to English
      </Button>{" "}
      {/**For selecting category*/}
      <FormControl sx={{ m: 3, width: 200 }}>
        <InputLabel id="simple-select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={category}
          label="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {/**Categories */}
          <MenuItem value={"Colors"}>Colors</MenuItem>
          <MenuItem value={"Animals"}>Animals</MenuItem>
          <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
          <MenuItem value={"All"}>All</MenuItem>
        </Select>
      </FormControl>
      <div classname="listdisplay">
        <div className="dictionary">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              {" "}
              {header}
              <TableBody>
                {state}
                {answers}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <div style={{ margin: "20px", color: "blue", fontSize: "25px" }}>
            {result}
          </div>
          {alert}
          {again}
          <Button
            variant="contained"
            sx={{ m: 3, width: 200 }}
            onClick={checkresult}
          >
            Check results
          </Button>
        </div>
      </div>
    </div>
  );
}
export default USER;
/**         {" "} */
