import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getActiveGames } from "../actions/activeGames";

class ActiveGames extends Component {
  componentDidMount = () => {
    this.props.getActiveGames(this.props.authentication.id);
  }

  render = () =>
    <ListGroup>
      {

      }
    </ListGroup>
}

const mapStateToProps = ({ authentication, activeGames }) =>
  ({ authentication, activeGames });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getActiveGames }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveGames);
