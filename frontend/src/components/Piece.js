import React, { Component } from "react";
import Draggable from "react-draggable";
import chess from "chess-rules";

import Highlight from "./Highlight";
import store from "../store";
import { updatePosition, revertPosition } from "../actions/position";

class Piece extends Component{
  constructor(props) {
    super(props);
    this.starting = this.getPosFromIndex(this.props.index);
    this.pieceStyle = {
      position: "absolute",
      top: "525px"
    };
  }

  // Get the x and y values based on board index.
  getPosFromIndex = index =>
    ({
      x: (index) % 8 * 75,
      y: -1 * Math.floor((index) / 8) * 75
    })

  // Get the index from a board position.
  getIndexFromPos = pos =>
    (Math.abs(pos.y) / 75) * 8 + (Math.abs(pos.x) / 75)

  handleDrag = (start, data, position, removeHighlights) => {
    const moveIndex = this.getIndexFromPos({ x: data.lastX, y: data.lastY });
    const legalMoves = chess.getAvailableMoves(position);
    const playerMove = legalMoves.filter(move =>
      move.src === start && move.dst === moveIndex
    );

    this.pieceStyle.zIndex = "inherit";
    removeHighlights();

    if (playerMove.length) {
      // const updatedPosition = chess.applyMove(position, playerMove[0]);
      store.dispatch(updatePosition(this.props.gameId, position, playerMove[0]))

    }
    // else {
    //   store.dispatch(revertPosition(position))
    // }
  }

  showOptions = (start, data, position, addHighlights) => {
    const moveIndex = this.getIndexFromPos({ x: data.lastX, y: data.lastY });
    const legalMoves = chess.getAvailableMoves(position);
    const possibleMoves = legalMoves.reduce((acc, move) => {

      return [ ...acc, move.src === start ? <Highlight pos={ this.getPosFromIndex(move.dst) } /> : null ]
    }, []
    );

    addHighlights(possibleMoves)

    this.pieceStyle.zIndex = 10;
  }


  render = () =>
    <Draggable
      grid={ [75, 75] }
      position={ this.starting }
      bounds={{ left: 0, top: -525, right: 525, bottom: 0 }}
      onStart={
        (e, data) =>
          this.showOptions(
            this.props.index,
            data,
            this.props.position,
            this.props.addHighlights
          )
      }
      onStop={
        (e, data) =>
          this.handleDrag(
            this.props.index,
            data,
            this.props.position,
            this.props.removeHighlights
          )
      }
    >
      <img
        style={ this.pieceStyle }
        draggable="false"
        src={ `/img/${this.props.color}-${this.props.piece}.svg` }
      />
  </Draggable>;
}

export default Piece;
