import React from "react";
import { Col } from "reactstrap";

import Piece from "./Piece";

const boardColStyle = dark =>
  ({
    background: dark ? "#9B5A16" : "#F3C29F",
    height: "75px",
    width: "75px"
  });

const BoardCol = props =>
<div>
  <div
    style={ boardColStyle(props.dark) }
  >
  </div>
</div>

export default BoardCol;
