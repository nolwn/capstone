import React from "react";
import { CardBody } from "reactstrap";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import store from "../store";
import { getGames } from "../actions/lobby";
import LobbyGame from "./LobbyGame";

const Lobby = props =>
  <CardBody>
    {
      props.lobby.map(game => {
        return <LobbyGame game={ game } />
      })
    }
  </CardBody>

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGames }, dispatch);

const mapStateToProps = state => {
  return { lobby: state.lobby }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
