import React from "react";

const captiveStyle = {
    position: "relative",
    height: 35 + "px"
}

const Captive = props =>
<div>
  <span>
    <img
      style={ captiveStyle }
      draggable="false"
      src={ `/img/${props.color}-${props.piece}.svg` }
      />
  </span>
  <span>x{ props.qty }</span>
</div>

export default Captive;
