import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Game from "./components/Game";

import { request } from "./utils";
import { setAuthentication } from "./actions/authentication";

import './App.css';

class App extends Component {
  componentDidMount() {
    request("get", "/auth/token")
      .then(response => {
        this.props.setAuthentication(response.data)
      })
      .catch(err => {
        console.log(err)
        this.props.setAuthentication(null)
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <AuthenticatedRoute path="/game" component={ Game } />
          <AuthenticatedRoute path="/" component={ Dashboard } />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setAuthentication
  }, dispatch)

export default connect(null, mapDispatchToProps)(App);
