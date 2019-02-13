import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label } from "reactstrap";

import { request } from "../utils";
import { setAuthentication } from "../actions/authentication";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }

    console.log("login", props);
  }

  handleChange = (e) => {
    const element = e.target.name;
    const value = e.target.value;
    const newState = { ...this.state };

    newState[element] = value

    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    request("post", "/auth/login", this.state)
      .then(response => {
        console.log("rep", response)
        this.props.setAuthentication(response.data);
        localStorage.setItem("token", response.data);

        this.props.history.push("/");
      })
      .catch(err => console.error(err))
  }

  render = () =>
  <div className="container login">
    <Card className="mt-5">
      <CardBody>
        <Form onSubmit={ this.handleSubmit }>
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={ this.state.username }
              placeholder="Enter your username..."
              onChange={ this.handleChange }
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password: </Label>
            <Input
              type="text"
              name="password"
              id="password"
              value={ this.state.password }
              placeholder="Enter your password..."
              onChange={ this.handleChange }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="submit"
            />
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </div>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setAuthentication
  }, dispatch)

export default connect(null, mapDispatchToProps)(Login);
