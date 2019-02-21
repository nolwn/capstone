import React from "react";

const captiveStyle = {
    position: "relative",
    height: 64 * .55 + "px"
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
  <span>x1</span>
</div>

export default Captive;
