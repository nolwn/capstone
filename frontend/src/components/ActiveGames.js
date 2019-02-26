import React, { Component } from "react";
import { Card } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ActiveGame from "./ActiveGame";
import { getActiveGames } from "../actions/activeGames";
import { socket } from "../utils";

class ActiveGames extends Component {
  componentDidMount = () => {
    console.log(this.props)
    this.props.getActiveGames(this.props.authentication.id);
    socket.on("update", this.activeGamesUpdate);
    socket.on("Lobby Update", this.activeGamesUpdate);
  }

  componentWillUnmount = () => {
    socket.removeListener("Lobby Update", this.getActiveGames)
    socket.removeListener("update", this.getActiveGames)
  }

  activeGamesUpdate = () => {
    this.props.getActiveGames(this.props.authentication.id);
  };

  render = () =>
    <div>
      <h2>Your Games</h2>
      <Card className="dark-card">
        {
          this.props.activeGames.map((activeGame, key) => {
            return (
              <ActiveGame
                key={ key }
                opponent={
                  activeGame.white === this.props.authentication.username ?
                  activeGame.black : activeGame.white
                }
                color={
                  activeGame.white === this.props.authentication.username ?
                  "white" : "black"
                }
                status={ activeGame.status }
                gameId={ activeGame.id }
                pushHistory={ this.props.pushHistory }
                />
            );
          })
        }
      </Card>
    </div>
}

const mapStateToProps = ({ authentication, activeGames }) =>
  ({ authentication, activeGames });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getActiveGames }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveGames);
