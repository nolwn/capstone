import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import chess from "chess-rules";

import Highlight from "./Highlight";
import Piece from "./Piece";

import { getGame } from "../actions/game";
import { socket } from "../utils";

const piecesStyle = {
  position: "fixed",
  display: "block",
  height: "75px",
  width: "75px"
}


// const moves = position =>
//   chess.getAvailableMoves(position)

class Pieces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: []
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
    socket.removeListener("update", this.getGameUpdate)
    // socket.removeAllListeners()

  }

  addHighlights = highlights => {
    this.setState({ ...this.state, highlights });
  }

  removeHighlights = () => {
    this.setState({ ...this.state, highlights: [] });
  }

  render = () =>{
    console.log(this.props)
    return <div style={ piecesStyle }>
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
            />
        ] :
          acc;
        }, []
      )
    }
    { this.state.highlights }
    { console.log(socket) }
    </div>
  }
}

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGame }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pieces);
