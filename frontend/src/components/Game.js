import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import Board from "./Board";
import Pieces from "./Pieces";
import Captives from "./Captives";
import { request, socket } from "../utils";
import { getGame } from "../actions/game";
import { getActiveGames } from "../actions/activeGames";

// let highlights = [];

class Game extends Component {
  constructor(props) {
    super(props);

    console.log("GAME", this.props.game);

  }

  componentDidMount = () => {
    this.props.getGame(this.props.match.params.game_id);
    this.side = this.props.game.white == this.props.authentication.id ?
      "W" : "B";
    if (this.props.activeGames.length === 0) {
      this.props.getActiveGames(this.props.authentication.id);
    }

    socket.on("update", this.updateActiveGames);
  }

  componentWillUnmount = () => {
    socket.removeListener("update", this.updateActiveGames);
  }

  updateActiveGames = () => {
    console.log("FIRE!!!");
    this.props.getActiveGames(this.props.authentication.id);
  }

  gameStatus = () => {
    const game = this.props.game;
      // .find(game => game.id == this.props.match.params.game_id);

    console.log(this.props.activeGames)

    if (!game) {
      return "";
    }

    switch (this.props.game.status) {
      case "OPEN":
        return this.getOpponent(game);

      case "PAT":
        return "Stalemate!";

      case "WHITEWON":
        return "Checkmate. White wins!";

      case "BLACKWON":
        return "Checkmate. Black wins!";

      default:
        return "";
    }

  }

  getOpponent = game => {
      const opponent = game.white == this.props.authentication.id ?
        game.usernameBlack : game.usernameWhite;

      if (opponent == "null") return "Waiting for opponent...";

      return "Playing against " + opponent;
  }

  render = () =>
    <div>
      <Row className="mb-3 mt-2">
        <Col>
          <h2 className="text-center">{ this.gameStatus() }</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Captives side={
              this.props.game.white == this.props.authentication.id ?
              "W" : "B"
          }/>
          <Pieces gameId={ this.props.match.params.game_id } />
          <Board side="white"/>
          <Captives side={
              this.props.game.white == this.props.authentication.id ?
              "B" : "W"
          }/>
        </Col>
      <div>
      </div>
    </Row>
    </div>

}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGame, getActiveGames }, dispatch);

const mapStateToProps = ({ authentication, game, activeGames }) =>
  ({ authentication, game, activeGames });


export default connect(mapStateToProps, mapDispatchToProps)(Game);
