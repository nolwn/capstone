import React from "react";
import Draggable from "react-draggable";

const pieceStyle = {
  position: "absolute"
}

const Piece = props =>
  <Draggable
    grid={ [75, 75] }
  >
    <img
      style={ pieceStyle }
      draggable="false"
      src={ `./img/${props.color}-${props.piece}.svg` }
    />
  </Draggable>

export default Piece;
