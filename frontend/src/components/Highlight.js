import React from "react";

const highlightStyle = {
  width: 64 / 3 + "px",
  height: 64 / 3 + "px",
  margin: 64 / 3 + "px",
  background: "#3399ee",
  borderRadius: "25px",
  position: "absolute",
  top: 64 * 7 + "px"
}

const Highlight = props => {
  return <div style={{ ...highlightStyle, transform: `translate(${props.pos.x}px, ${props.pos.y}px )` }}>

  </div>
}

export default Highlight;
