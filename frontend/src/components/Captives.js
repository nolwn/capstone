import React from "react";
import Captive from "./Captive"

const captivesStyle = {
  position: "relative",
  paddingLeft: "20px"
}

const TakenPieces = props =>
  <div style={ captivesStyle }>
    <Captive color="B" piece="R" />
  </div>

const mapStateToProps = ({ authentication, game }) => {

}

export default TakenPieces;
