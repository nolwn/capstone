import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import chess from "chess-rules";

import Highlight from "./Highlight";
import Piece from "./Piece";

import { getGame } from "../actions/position";
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
      console.log(this.props);

      this.props.getGame(this.props.gameId);
  }

  componentDidMount = () => {
    socket.emit("subscribe", this.props.gameId);
    console.log(socket)

    socket.on("update", this.getGameUpdate);

  }

  componentWillUnmount = () => {
    console.log("unmount!!");
    console.log("before", socket)
    socket.removeListener("update", this.getGameUpdate)
    // socket.removeAllListeners()

    console.log("after", socket)
  }

  addHighlights = highlights => {
    this.setState({ ...this.state, highlights });
  }

  removeHighlights = () => {
    this.setState({ ...this.state, highlights: [] });
  }

  render = () =>
    <div style={ piecesStyle }>
      {
        this.props.position.board.reduce((acc, cur, idx) => {
          return cur ? [ ...acc,
            <Piece
              key={ idx }
              gameId = { this.props.gameId }
              color={ cur.side }
              piece={ cur.type }
              index={ idx }
              position={ this.props.position }
              addHighlights={ this.addHighlights }
              removeHighlights={ this.removeHighlights }
            />
        ] :
          acc;
        }, []
      )
    }
    { this.state.highlights }
    </div>
}

const mapStateToProps = ({ position }) => ({ position });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGame }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pieces);
