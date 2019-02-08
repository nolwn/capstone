import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <AuthenticatedRoute path="/" component={ Dashboard } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(App);
