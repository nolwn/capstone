import React, { Component } from "react";
import { CardBody, Table } from "reactstrap";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import { getGames } from "../actions/lobby";
import LobbyGame from "./LobbyGame";
import CreateGame from "./CreateGame";
import { socket } from "../utils";

class Lobby extends Component {
  componentDidMount = () => {
    this.props.getGames();
    socket.emit("Join Lobby", "");
    socket.on("Lobby Update", _ => {
      console.log("running update")
      this.props.getGames()
    });
  }

  componentWillUnmount = () => {

  }

  render = () =>
    <CardBody>
      <Table>
        <thead>
            <CreateGame />
          <tr>
            <td style={{ "border": "none" }}>
              <h4>
                Join a Game
              </h4>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            this.props.lobby.map(game => {
              return <LobbyGame
                key={ game.id }
                pushHistory={ this.props.pushHistory }
                game={ game }
              />
            })
          }
        </tbody>
      </Table>
    </CardBody>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch);

const mapStateToProps = state => {
  return { lobby: state.lobby }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
