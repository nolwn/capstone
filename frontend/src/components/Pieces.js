import React from "react";
import { connect } from "react-redux";
import chess from "chess-rules";

import Piece from "./Piece";

const piecesStyle = {
  position: "fixed",
  display: "block",
  height: "75px",
  width: "75px"
}

// const moves = position =>
//   chess.getAvailableMoves(position)

const Pieces = props => {
  // moves(props.match)

  return <div style={ piecesStyle }>
    {
      props.match.board.reduce((acc, cur, idx) => {
        return cur ? [ ...acc,
          <Piece
            key={ idx }
            color={ cur.side }
            piece={ cur.type }
            index={ idx }
            match={ props.match }
          />
      ] :
        acc;
      }, []
    )
  }
  </div>
}

const mapStateToProps = ({ match }) => ({ match });

export default connect(mapStateToProps)(Pieces);
