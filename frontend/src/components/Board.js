import React from "react";

import BoardRow from "./BoardRow";

const highlights = [];

const Board = props =>
  <div>
    <div style={{
        border: 3 + "px white solid",
        width: 64 * 8 + 3,
        height: 64 * 8 + 3,
        position: "absolute",
        left: 0,
        right: 0,
        margin: "auto"
      }}>
    </div>
    <div style={{
        width: 64 * 8 + "px",
        display: "flex",
        margin: "auto"
      }}>
      {
        [ ..."12345678" ]
        .map((row, idx) =>
        row % 2 === 0 ?
        <BoardRow key={ idx } dark={ true } /> :
          <BoardRow key={ idx } dark={ false } />
        )
      }
    </div>
  </div>

export default Board;
