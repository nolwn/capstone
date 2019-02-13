import React from "react";
import { Row } from "reactstrap";

import BoardCol from "./BoardCol";

const boardRowStyle = {
  width: "600px",
  display: "flex"
}

const BoardRow = props => {
  let dark = props.dark;

  return (
    <div style={ boardRowStyle }>
      {
        [ ..."abcdefgh" ].map(col => {
          dark = !dark;
          return <BoardCol dark={ !dark } />
        })
      }
    </div>)
}

export default BoardRow;
