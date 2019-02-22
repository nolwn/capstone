import React, { Component } from "react";
import Draggable from "react-draggable";
import chess from "chess-rules";

import Highlight from "./Highlight";
import store from "../store";
import { updatePosition, revertPosition } from "../actions/game";
import { getIndexFromPos, getPosFromIndex } from "../utils";

class Piece extends Component{
  constructor(props) {
    super(props);
    this.starting = getPosFromIndex(this.props.index, this.props.flip);
    this.pieceStyle = {
      position: "absolute",
      top: 64 * 7 + "px"
    };
  }

  handleDrag = (start, data, position, removeHighlights) => {
    const moveIndex = getIndexFromPos(
      { x: data.lastX, y: data.lastY },
      this.props.flip
    );
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
    const moveIndex = getIndexFromPos(
      { x: data.lastX, y: data.lastY },
      this.props.flip
    );
    const legalMoves = chess.getAvailableMoves(position);
    const possibleMoves = legalMoves.reduce((acc, move) => {
      return [ ...acc, move.src === start ?
        <Highlight pos={ getPosFromIndex(move.dst, this.props.flip) } /> :
        null ]
    }, []
    );

    addHighlights(possibleMoves)

    this.pieceStyle.zIndex = 10;
  }


  render = () =>
    <Draggable
      grid={ [64, 64] }
      position={ this.starting }
      bounds={{ left: 0, top: -64 * 7, right: 64 * 7, bottom: 0 }}
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
