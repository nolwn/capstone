import React from "react";

import BoardRow from "./BoardRow";

const highlights = [];

const Board = props =>
  <div>
    <div style={{
        width: 64 * 8 + "px",
        display: "flex",
        margin: "auto",
        outline: "3px white solid"
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
