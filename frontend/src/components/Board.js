import React from "react";
import { connect } from "react-redux"

import BoardRow from "./BoardRow";

const Board = props =>
  [ ..."12345678" ]
    .map(row =>
      row % 2 === 0 ?
      <BoardRow dark={ true } /> :
      <BoardRow dark={ false } />
    )

export default Board;
