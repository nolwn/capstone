import React from "react";
import { Col } from "reactstrap";
import Draggable from "react-draggable";

const boardColStyle = dark =>
  ({
    background: dark ? "#9B5A16" : "#F3C29F",
    height: "75px",
    width: "75px"
  });

const pieceWrapperStyle =
  {
    height: "100%",
    width: "100%"
  }

const BoardCol = props =>
<div>
  <div
    style={ boardColStyle(props.dark) }
    >
    <Draggable
      grid={ [75, 75] }
    >
      <img draggable="false" src="./img/white-king.svg" />
    </Draggable>
  </div>
</div>

export default BoardCol;
