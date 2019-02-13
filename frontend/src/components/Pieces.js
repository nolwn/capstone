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
  console.log(props.match);
  return <div style={ piecesStyle }>
    {
      props.match.reduce((acc, cur) => {
        return cur ? [ ...acc, <Piece color={ cur.side } piece={ cur.type } /> ] :
        acc;
      }, []
    )
  }
  </div>
}

const mapStateToProps = ({ match }) => ({ match });

export default connect(mapStateToProps)(Pieces);
