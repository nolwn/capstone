import React from "react"
import { Button } from "reactstrap";

import { joinGame } from "../actions/authentication";
import { request } from "../utils";
import store from "../store";

const handleJoin = (game, color) => {
  console.log(color, game)
  store.dispatch(joinGame(game, color));
}

const JoinButton = props =>
  <Button
    onClick= { e => handleJoin(props.game, props.color) }
  >Join as { props.color }</Button>;

export default JoinButton;
