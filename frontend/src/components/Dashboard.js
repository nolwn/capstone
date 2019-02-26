import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import Lobby from "./Lobby";
import ActiveGames from "./ActiveGames";
import CreateGame from "./CreateGame";

class Dashboard extends Component {
  pushHistory = path => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col sm="4">
            <ActiveGames pushHistory={ this.pushHistory } />
          </Col>
          <Col>
            <Lobby pushHistory={ this.pushHistory } />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
