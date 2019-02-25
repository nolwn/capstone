import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";
import { socket } from "../utils";

class ActiveGame extends Component {
  componentDidMount = () => {
    socket.emit("subscribe", this.props.gameId)
  }

  render = () =>
    <ListGroupItem
      style={
        this.props.color[0] === this.props.status ?
        { background: "#aaffaa" } : {}
      }
      onClick={ e => this.props.pushHistory("/game/" + this.props.gameId)
    }>
    { this.props.opponent ? this.props.opponent : "Waiting for an opponent..." }
    <hr />
    {
      this.props.color[0] === this.props.status ?
        "Your turn!" :
        "Your opponent's turn"
      }
    </ListGroupItem>;
}

export default ActiveGame;
