import React from "react";

import BoardRow from "./BoardRow";

const Board = side =>
    [ ..."12345678" ]
      .map(row =>
        row % 2 === 0 ?
        <BoardRow dark={ true } /> :
        <BoardRow dark={ false } />
      )

export default Board;
