import React, { Component } from "react";
import { connect } from "react-redux";
import chess from "chess-rules";

import Highlight from "./Highlight";
import Piece from "./Piece";

const piecesStyle = {
  position: "fixed",
  display: "block",
  height: "75px",
  width: "75px"
}


// const moves = position =>
//   chess.getAvailableMoves(position)

class Pieces extends Component {
  // moves(this.props.position)

  render = () =>
    <div style={ piecesStyle }>
      {
        this.props.position.board.reduce((acc, cur, idx) => {
          return cur ? [ ...acc,
            <Piece
              key={ idx }
              color={ cur.side }
              piece={ cur.type }
              index={ idx }
              position={ this.props.position }
              highlights={ this.props.highlights }
            />
        ] :
          acc;
        }, []
      )
    }
    { this.highlights }
    </div>
}

const mapStateToProps = ({ position }) => ({ position });

export default connect(mapStateToProps)(Pieces);
