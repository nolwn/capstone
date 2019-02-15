import React from "react";

const highlightStyle = {
  width: "25px",
  height: "25px",
  margin: "25px",
  border: "3px solid yellow",
  borderRadius: "25px",
  position: "absolute",
  top: "525px"
}

const Highlight = props => {
  console.log(props.pos)
  return <div style={{ ...highlightStyle, transform: `translate(${props.pos.x}px, ${props.pos.y}px )` }}>

  </div>
}

export default Highlight;
