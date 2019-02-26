import React, { Component } from "react";
import { Card, CardBody, Table } from "reactstrap";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import { getGames } from "../actions/lobby";
import LobbyGame from "./LobbyGame";
import CreateGame from "./CreateGame";
import { socket } from "../utils";

class Lobby extends Component {
  lobbyUpdate = () => {
    this.props.getGames()

  }

  componentDidMount = () => {
    this.props.getGames();
    socket.emit("Join Lobby", "");
    socket.on("Lobby Update", this.lobbyUpdate);
  }

  componentWillUnmount = () => {
    socket.removeListener("Lobby Update", this.lobbyUpdate);
  }

  render = () =>
    <div>
      <CreateGame />
      <h2 style={{ marginTop: "50px" }}>
        Join a Game
      </h2>
      {
        this.props.lobby.filter(game =>
          game.playerWhite !== this.props.authentication.username &&
          game.playerBlack !== this.props.authentication.username
        ).map(game => {
          return <LobbyGame
            key={ game.id }
            pushHistory={ this.props.pushHistory }
            game={ game }
            />
        })
      }
    </div>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch);

const mapStateToProps = ({ lobby, authentication }) => ({ lobby, authentication })

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
