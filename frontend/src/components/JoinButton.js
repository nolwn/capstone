import React from "react"
import { Button } from "reactstrap";

import { joinGame } from "../actions/authentication";
import store from "../store";

const handleJoin = (game, color) => {
  store.dispatch(joinGame(game, color));

}

const JoinButton = props =>
  <Button
    onClick= { e => {
      handleJoin(props.game, props.color)
      props.pushHistory(`/game`);
    }
  }
  >Join as { props.color }</Button>;

export default JoinButton;
