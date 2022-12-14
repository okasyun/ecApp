// import React, { useCallback, useState, useEffect } from "react";
// import { TextInput } from "../Ukit";
// import TableContainer from "@material-ui/core/TableContainer";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableRow from "@material-ui/core/TableRow";
// import TableHead from "@material-ui/core/TableHead";
// import IconButton from "@material-ui/core/IconButton";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import { makeStyles } from "@material-ui/core/styles";

import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  checkIcon: {
    float: "right",
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});
const SetSizesArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === 0) {
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize("");
        setQuantity(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize("");
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>?????????</TableCell>
              <TableCell>??????</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, index) => (
                <TableRow key={item.size}>
                  <TableCell component="th" scope="row">
                    {item.size}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(index, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={"?????????"}
            multiline={false}
            required={true}
            onChange={inputSize}
            minRows={1}
            value={size}
            type={"text"}
          ></TextInput>
          <TextInput
            fullWidth={false}
            label={"??????"}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            minRows={1}
            value={quantity}
            type={"number"}
          ></TextInput>
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
      <div className="module-spacer--small"></div>
    </div>
  );
};

export default SetSizesArea;
