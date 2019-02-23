import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import Board from "./Board";
import Pieces from "./Pieces";
import Captives from "./Captives";
import { request } from "../utils";
import { getGame } from "../actions/game";

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
  }

  render = () =>
    <div>
      <Row className="mb-3 mt-2">
        <Col>
          <h2 className="text-center">Playing against opponent</h2>
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
  bindActionCreators({ getGame }, dispatch);

const mapStateToProps = ({ authentication, game }) =>
  ({ authentication, game });


export default connect(mapStateToProps, mapDispatchToProps)(Game);
