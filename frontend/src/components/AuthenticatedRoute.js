import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const AuthenticatedRoute = props => {
  if (props.authentication.pending && !props.authentication.claim) {
    return <span>Loading...</span>

  } else if(props.authentication.claim) {
    return <Route path="/" component={props.component} />;

  } else {
    return <Redirect to="/login" />
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(AuthenticatedRoute)
