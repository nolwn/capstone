import React from "react";

const highlightStyle = {
  width: 64 / 3 + "px",
  height: 64 / 3 + "px",
  margin: 64 / 3 + "px",
  borderLeft: "3px solid #aeaeae",
  borderRight: "3px solid #aeaeae",
  borderTop: "3px solid white",
  borderBottom: "3px solid white",
  borderRadius: "25px",
  position: "absolute",
  top: 64 * 7 + "px"
}

const Highlight = props => {
  return <div style={{ ...highlightStyle, transform: `translate(${props.pos.x}px, ${props.pos.y}px )` }}>

  </div>
}

export default Highlight;
