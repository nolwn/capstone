import React from "react";

const boardColStyle = dark =>
  ({
    background: dark ? "#aeaeae" : "#FFF",
    height: "64px",
    width: "64px"
  });

const BoardCol = props =>
<div>
  <div
    style={ boardColStyle(props.dark) }
  >
  </div>
</div>

export default BoardCol;
