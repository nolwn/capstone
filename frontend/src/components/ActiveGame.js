import React, { Component } from "react";
import { Card } from "reactstrap";
import { socket } from "../utils";



class ActiveGame extends Component {
  componentDidMount = () => {
    socket.emit("subscribe", this.props.gameId)
  }

  render = () =>
    <Card
      style={
        this.props.color[0] === this.props.status ?
        {} : {}
      }
      className="active-game"
      onClick={ e => this.props.pushHistory("/game/" + this.props.gameId)
    }>
    { this.props.opponent ? this.props.opponent : "Waiting for an opponent..." }
    <br />
    {
      this.props.color[0] === this.props.status ?
        "Your turn!" :
        "Your opponent's turn"
      }
    </Card>;
}

export default ActiveGame;
