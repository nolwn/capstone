import React from "react";
import Draggable from "react-draggable";

const pieceStyle = {
  position: "absolute",
  top: "525px"
}

const getPosFromIndex = index =>
  ({
    x: (index) % 8 * 75,
    y: -1 * Math.floor((index) / 8) * 75
  })

const Piece = props =>
  <Draggable
    grid={ [75, 75] }
    defaultPosition={getPosFromIndex(props.index)}
  >
    <img
      style={ pieceStyle }
      draggable="false"
      src={ `./img/${props.color}-${props.piece}.svg` }
    />
  </Draggable>

export default Piece;
