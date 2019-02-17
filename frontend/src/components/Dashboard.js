import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import Lobby from "./Lobby";
import ActiveGames from "./ActiveGames";

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
            <ActiveGames />
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

export default Dashboard;
