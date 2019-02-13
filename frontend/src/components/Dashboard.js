import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import store from "../store";
import Lobby from "./Lobby";
import { getGames } from "../actions/lobby";

class Dashboard extends Component {
  pushHistory = path => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="container">
        <h1>ChessMatch</h1>
        <Row>
          <Col sm="4">
            <h2>Your Games</h2>
          </Col>
          <Col>
            <h2>Game Lobby</h2>
            <Lobby pushHistory={ this.pushHistory } />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch)

export default connect(null, null)(Dashboard);
