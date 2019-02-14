import React from "react";
import Draggable from "react-draggable";
import chess from "chess-rules";

import store from "../store";

const pieceStyle = {
  position: "absolute",
  top: "525px"
}

// Get the x and y values based on board index.
const getPosFromIndex = index =>
  ({
    x: (index) % 8 * 75,
    y: -1 * Math.floor((index) / 8) * 75
  })

// Get the index from a board position.
const getIndexFromPos = pos =>
  (Math.abs(pos.y) / 75) * 8 + (Math.abs(pos.x) / 75)

const handleDrag = (start, data, match) => {
  const moveIndex = getIndexFromPos({ x: data.lastX, y: data.lastY });
  const legalMoves = chess.getAvailableMoves(match);
  const moveExists = !!legalMoves.filter(move =>
    move.src === start && move.dst === moveIndex
  ).length;

  console.log(moveExists);
}

const Piece = props => {
  const starting = getPosFromIndex(props.index);

  return (
    <Draggable
      grid={ [75, 75] }
      defaultPosition={ starting }
      bounds={{ left: 0, top: -525, right: 525, bottom: 0 }}
      onStop={ (e, data) =>
        handleDrag(props.index, data, props.match)
      }
    >
    <img
      style={ pieceStyle }
      draggable="false"
      src={ `./img/${props.color}-${props.piece}.svg` }
    />
    </Draggable>
  );
}

export default Piece;
