import React, { useState, useEffect, useRef } from "react";
import TableComp from "./table.js";
import TableComp2 from "./table2.js";

import Button from "@mui/material/Button";

//Init arrays
const list = [];

function USER(props) {
  const [eng, setENG] = useState(""); //English words
  const [fin, setFIN] = useState(""); //Finnish words
  const [state, setState] = useState(list); //main list

  const getFinnish = async () => {
    const result = await fetch("http://localhost:8080/Dictionary");
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
          />{" "}
        </>
      );
    });
    console.log(ui);
    setState(ui);
  };
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
        color="error"
        sx={{ m: 3, width: 200 }}
        onClick={getFinnish}
      >
        From Finnish to English
      </Button>
    </div>
  );
}
export default USER;
/**         {" "} */
