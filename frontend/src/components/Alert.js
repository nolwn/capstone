import React from "react";

const Alert = props =>
  <div>
    <div style={{
        background: props.on ? "#3399ee" : "#697884",
        height: "20px",
        width: "20px",
        borderRadius: "20px",
        marginRight: "10px",
        boxShadow: props.on ? "2px 2px 10px 0px #425564" : "none"
      }}></div>
  </div>

export default Alert;
