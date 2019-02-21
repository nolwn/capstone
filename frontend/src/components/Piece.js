import React, { Component } from "react";
import Draggable from "react-draggable";
import chess from "chess-rules";

import Highlight from "./Highlight";
import store from "../store";
import { updatePosition, revertPosition } from "../actions/game";

class Piece extends Component{
  constructor(props) {
    super(props);
    this.starting = this.getPosFromIndex(this.props.index, this.props.flip);
    this.pieceStyle = {
      position: "absolute",
      top: 64 * 7 + "px"
    };
  }

  // Get the x and y values based on board index.
  getPosFromIndex = (index, flip) => {
    const position = ({
      x: (index) % 8 * 64,
      y: -1 * Math.floor((index) / 8) * 64
    })

    // flip if player is playing black
    if (flip) {
      position.x = 64 * 7 - position.x;
      position.y = (-64 * 7) - position.y;
    }

    return position
  }

  // Get the index from a board position.
  getIndexFromPos = (pos, flip) => {
    let index = (Math.abs(pos.y) / 64) * 8 + (Math.abs(pos.x) / 64);

    // flip if player is playing black
    if (flip) {
      index = 63 - index;
    }

    return index;
  }

  handleDrag = (start, data, position, removeHighlights) => {
    const moveIndex = this.getIndexFromPos(
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
    const moveIndex = this.getIndexFromPos(
      { x: data.lastX, y: data.lastY },
      this.props.flip
    );
    const legalMoves = chess.getAvailableMoves(position);
    const possibleMoves = legalMoves.reduce((acc, move) => {
      return [ ...acc, move.src === start ?
        <Highlight pos={ this.getPosFromIndex(move.dst, this.props.flip) } /> :
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
