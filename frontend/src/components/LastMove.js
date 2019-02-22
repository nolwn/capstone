import React from "react";

const lastMoveStyle = {
  width: 64 / 3 + "px",
  height: 64 / 3 + "px",
  margin: 64 / 3 + "px",
  background: "rgba(75, 90, 255, .5)",
  borderRadius: "25px",
  position: "absolute",
  top: 64 * 7 + "px"
}

const LastMove = props => {
  console.log(props);
  return <div style={{
      ...lastMoveStyle,
      transform: `translate(${props.pos.x}px, ${props.pos.y}px )`
    }}>

  </div>
}

export default LastMove;
