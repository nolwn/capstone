import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import { request } from "../utils";
import { createGame } from "../actions/authentication";
import store from "../store";


class CreateButton extends Component {
  handleClick = () => {
    console.log(this.props)
    const playerColor = "player_" + this.props.color;
    const reqBody = {};

    reqBody[playerColor] = this.props.authentication.id;

    this.props.createGame(reqBody, this.props.color, this.props.history.push)
  }

  render = () =>
    <Button
      onClick={ e =>
        this.handleClick(this.props.color, this.props.authentication.id, this.props.history.push)
      }>Start as { this.props.color }
    </Button>;

}

const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createGame }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateButton));
