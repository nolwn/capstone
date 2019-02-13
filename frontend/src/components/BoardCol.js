import React from "react";
import { Col } from "reactstrap";

const boardColStyle = dark =>
  ({
    background: dark ? "#9B5A16" : "#F3C29F",
    height: "75px",
    width: "75px"
  });

const BoardCol = props =>
  <div
    style={ boardColStyle(props.dark) }
  ></div>

export default BoardCol;
