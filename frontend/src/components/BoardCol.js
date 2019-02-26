import React from "react";

const boardColStyle = dark =>
  ({
    background: dark ? "#425564" : "#697884",
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
