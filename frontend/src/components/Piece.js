import React, { Component } from "react";
import Draggable from "react-draggable";
import chess from "chess-rules";

import Highlight from "./Highlight";
import store from "../store";
import { updatePosition } from "../actions/position";

class Piece extends Component{
  constructor(props) {
    super(props);
    this.starting = this.getPosFromIndex(this.props.index);
    this.pieceStyle = {
      position: "absolute",
      top: "525px"
    };

    this.state = {}
  }

  componentWillUnmount = () => {
    console.log("unmount")
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

  handleDrag = (start, data, position) => {
    const moveIndex = this.getIndexFromPos({ x: data.lastX, y: data.lastY });
    const legalMoves = chess.getAvailableMoves(position);
    const playerMove = legalMoves.filter(move =>
      move.src === start && move.dst === moveIndex
    );

    this.pieceStyle.zIndex = "inherit";

    if (playerMove.length) {
      const updatedPosition = chess.applyMove(position, playerMove[0]);
      store.dispatch(updatePosition(updatedPosition))

    } else {
      store.dispatch(updatePosition(position))
    }
  }

  showOptions = (start, data, position, highlights) => {
    const moveIndex = this.getIndexFromPos({ x: data.lastX, y: data.lastY });
    const legalMoves = chess.getAvailableMoves(position);
    const possibleMoves = legalMoves.filter(move =>
      move.src === start
    );

    highlights = [ ...highlights, <Highlight /> ]

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
            this.props.highlights
          )
      }
      onStop={
        (e, data) =>
          this.handleDrag(this.props.index, data, this.props.position)
      }
    >
      <img
        style={ this.pieceStyle }
        draggable="false"
        src={ `./img/${this.props.color}-${this.props.piece}.svg` }
      />
  </Draggable>;
}

export default Piece;