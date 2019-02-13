import React from "react";
import { Row } from "reactstrap";

import BoardCol from "./BoardCol";

const boardRowStyle = {

}

const BoardRow = props => {
  let dark = props.dark;
  return (
    <Row>
      {
        [ ..."abcdefgh" ].map(col => {
          dark = !dark;
          return <BoardCol dark={ !dark } />
        })
      }
    </Row>)
}

export default BoardRow;
