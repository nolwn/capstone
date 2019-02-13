import React, { Component } from "react";
import { CardBody, Table } from "reactstrap";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import store from "../store";
import { getGames } from "../actions/lobby";
import LobbyGame from "./LobbyGame";

class Lobby extends Component {
  componentDidMount = () =>
    this.props.getGames();

  render = () =>
    <CardBody>
      <Table>
        <thead>
          <tr>
            <td>Game ID</td>
            <td>White</td>
            <td>Black</td>
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
  console.log(state)
  return { lobby: state.lobby }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
