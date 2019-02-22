import React from "react";

const lastMoveStyle = {
  width: 64 + "px",
  height: 64 + "px",
  border: "6px solid #3399ee",
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
