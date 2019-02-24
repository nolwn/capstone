import React from "react";

const captiveStyle = {
    position: "relative",
    height: 35 + "px"
}

const Captive = props =>
  <span>
    <img
      style={ captiveStyle }
      draggable="false"
      src={ `/img/${props.color}-${props.piece}.svg` }
      />
    {props.qty > 1 ? "x" + props.qty : "" }
  </span>

export default Captive;
