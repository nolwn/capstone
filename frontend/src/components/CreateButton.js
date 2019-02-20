import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";

import { request } from "../utils";

const handleClick = (color, userId) => {
  console.log(color)
  const playerColor = "player_" + color;
  const reqBody = {};

  reqBody[playerColor] = userId

  return request("post", "/games", reqBody );
}

const CreateButton = props =>
  <Button
    onClick={ e => handleClick(props.color, props.authentication.id) }
  >Start as { props.color }</Button>;

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(CreateButton);
