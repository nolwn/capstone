import React, { Component } from "react";
import { Card } from "reactstrap";

import { socket } from "../utils";
import Alert from "./Alert";



class ActiveGame extends Component {
  componentDidMount = () => {
    socket.emit("subscribe", this.props.gameId)
    console.log(this.props)
  }

  render = () =>
    <Card
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
      className="active-game"
      onClick={ e => this.props.pushHistory("/game/" + this.props.gameId)
    }>
    <Alert on={ this.props.color[0] === this.props.status } />
    <div>
      { this.props.opponent ? this.props.opponent : "Waiting for an opponent..." }
      <br />
      {
        this.props.color[0] === this.props.status ?
        "Your turn!" :
        "Your opponent's turn"
      }
    </div>
    </Card>;
}

export default ActiveGame;
