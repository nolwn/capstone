import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import store from "../store";
import Lobby from "./Lobby";
import { getGames } from "../actions/lobby";

class Dashboard extends Component {
  componentDidMount() {
    console.log("mounted");
    getGames();
  }


  render() {
    return (
      <div className="container">
        <h1>ChessMatch</h1>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch)

export default connect(null, mapDispatchToProps)(Dashboard);
