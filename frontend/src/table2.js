import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableComp2(props) {
  const { name, placeholder } = props;
  async function afterInput(e) {
    const ab = e.target.value; //Take input as variable
    const abc = ab.toLowerCase(); //Change letters to lowercase

    //Remove spaces after the written word if there's any.
    const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");
    const a = removeExtraSpace(abc);

    //If input === finnish word from database, call onChanges function in user.js
    if (a === props.eng) {
      props.onChanges(a, props.finnish);
    } else {
      //If wrong answer, give the answer to onWrong function in user.js
      props.onWrong(a, props.finnish);
    }
  }

  return (
    <>
      {" "}
      {/**Table row for each word,
       * after user has written their answer, call afterInput function.
       * This table is to display finnish words and taking english words as input.
       */}
      <TableRow>
        <TableCell>
          <Input
            placeholder={placeholder}
            type="text"
            pattern="[^\s]+"
            name={name}
            onBlur={afterInput}
          />
        </TableCell>
        <TableCell>{props.finnish}</TableCell>
      </TableRow>{" "}
    </>
  );
}
export default TableComp2;
