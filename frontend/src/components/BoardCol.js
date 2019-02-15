import React from "react";

const boardColStyle = dark =>
  ({
    background: dark ? "#aeaeae" : "#FFF",
    height: "75px",
    width: "75px"
  });

const BoardCol = props =>
<div>
  <div
    style={ boardColStyle(props.dark) }
  >
  </div>
</div>

export default BoardCol;
