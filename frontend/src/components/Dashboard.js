import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import store from "../store";
import Lobby from "./Lobby";
import { getGames } from "../actions/lobby";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>ChessMatch</h1>
        <Lobby />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch)

export default connect(null, null)(Dashboard);
