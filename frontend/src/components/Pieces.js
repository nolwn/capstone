import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import chess from "chess-rules";

import Highlight from "./Highlight";
import Piece from "./Piece";
import LastMove from "./LastMove";

import { getGame, destroyGame } from "../actions/game";
import { socket, getPosFromIndex, getIndexFromPos } from "../utils";

const piecesStyle = {
  position: "absolute",
  display: "block",
  height: "64px",
  width: "64px"
}


// const moves = position =>
//   chess.getAvailableMoves(position)

class Pieces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: []
    }

    console.log(socket);
  }

  getLastMove = () => {
    const turns = this.props.game.turns
    const flip =  this.props.authentication.id == this.props.game.black;
    console.log(this.props.game.turns)

    if (turns) {
      const turn = turns[turns.length - 1]
      const src = getPosFromIndex(turn.src, flip);
      const dst = getPosFromIndex(turn.dst, flip);



      return [ <LastMove pos={ src } />, <LastMove pos={ dst } /> ]
    } else {
      return [];
    }
  }

  getGameUpdate = () => {
      this.props.getGame(this.props.gameId);
      console.log("fired a getGame")
  }

  componentDidMount = () => {
    socket.emit("subscribe", this.props.gameId);
    socket.on("update", this.getGameUpdate);
  }

  componentWillUnmount = () => {
    socket.removeListener("update", this.getGameUpdate);
    this.props.destroyGame()
    console.log("component unmounting...");
  }

  addHighlights = highlights => {
    this.setState({ ...this.state, highlights });
  }

  removeHighlights = () => {
    this.setState({ ...this.state, highlights: [] });
  }

  render = () =>
    <div style={{
        width: 64 * 8,
        height: 64 * 8,
        position: "absolute",
        left: 0,
        right: 0,
        margin: "auto"
      }}>
      <div style={ piecesStyle }>
        {
          this.props.game.position.board.reduce((acc, cur, idx) => {
            return cur ? [ ...acc,
              <Piece
                key={ idx }
                gameId = { this.props.gameId }
                color={ cur.side }
                piece={ cur.type }
                index={ idx }
                position={ this.props.game.position }
                addHighlights={ this.addHighlights }
                removeHighlights={ this.removeHighlights }
                flip={ this.props.authentication.id == this.props.game.black }
                />
            ] :
            acc;
            }, []
          )
        }
      { this.state.highlights }
      { this.getLastMove() }
      </div>
    </div>
}

const mapStateToProps = ({ authentication, game }) => ({ authentication, game });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGame, destroyGame }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pieces);
