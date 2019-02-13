import React from "react";
import { connect } from "react-redux";

import Piece from "./Piece";

const piecesStyle = {
  position: "fixed",
  display: "block",
  height: "75px",
  width: "75px"
}

const Pieces = props => {
  return <div style={ piecesStyle }>
    {
      props.match.reduce((acc, cur, idx) => {
        return cur ? [ ...acc,
          <Piece
            key={ idx }
            color={ cur.side }
            piece={ cur.type }
            index={ idx }
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
