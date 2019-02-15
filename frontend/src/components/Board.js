import React from "react";

import BoardRow from "./BoardRow";

const highlights = [];

const Board = props =>
  [ ..."12345678" ]
    .map((row, idx) =>
      row % 2 === 0 ?
      <BoardRow key={ idx } dark={ true } /> :
      <BoardRow key={ idx } dark={ false } />
    )

export default Board;
