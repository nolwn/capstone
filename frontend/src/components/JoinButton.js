import React from "react"
import { Button } from "reactstrap";

import { joinGame } from "../actions/authentication";
import store from "../store";
import { socket } from "../utils";

const handleJoin = (game, color, pushHistory) => {
  store.dispatch(joinGame(game, color, pushHistory));

}

const JoinButton = props =>
  <Button
    onClick= { e => {
      handleJoin(props.game, props.color, props.pushHistory)
      socket.emit("subscribe", props.game)
    }
  }
  >Join as { props.color }</Button>;

export default JoinButton;
