import React, { Component } from "react";
import { Container } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import Board from "./Board";
import Pieces from "./Pieces";
import { request } from "../utils";
import { getGame } from "../actions/game";

let highlights = []

class Game extends Component {
  componentDidMount = () => {

    this.props.getGame(this.props.match.params.game_id);
  }

  render = () =>
    <Container>
      <Pieces gameId={ this.props.match.params.game_id } />
      <Board side="white"/>
    </Container>

}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGame }, dispatch);


export default connect(null, mapDispatchToProps)(Game);
