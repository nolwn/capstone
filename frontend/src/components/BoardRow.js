import React from "react";

import BoardCol from "./BoardCol";

const boardRowStyle = {
  width: 64 + "px",
  margin: "none",
  // display: "flex"
}

const BoardRow = props => {
  let dark = props.dark;

  return (
    <div style={ boardRowStyle }>
      {
        [ ..."abcdefgh" ].map((col, idx) => {
          dark = !dark;
          return <BoardCol key={ idx } dark={ !dark } />
        })
      }
    </div>)
}

export default BoardRow;
