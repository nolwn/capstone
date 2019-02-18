import React, { Component } from "react";
import { ListGroup } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ActiveGame from "./ActiveGame";
import { getActiveGames } from "../actions/activeGames";

class ActiveGames extends Component {
  componentDidMount = () => {
    this.props.getActiveGames(this.props.authentication.id);
  }

  render = () =>
    <ListGroup>
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
            />
        );
        })
      }
    </ListGroup>
}

const mapStateToProps = ({ authentication, activeGames }) =>
  ({ authentication, activeGames });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getActiveGames }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveGames);
