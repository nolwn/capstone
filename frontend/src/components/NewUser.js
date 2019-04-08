import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import ErrorAlert from "./ErrorAlert";
import { request } from "../utils";
import { setAuthentication } from "../actions/authentication";


class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      retypePassword: "",
      error: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.password.length < 7) {
      console.error("Pick a longer password (more than 6 characters)")
      this.setState({
        username: "",
        password: "",
        retypePassword: "",
        error: "Pick a longer password (more than 6 characters)"
      })
    } else if (this.state.password !== this.state.retypePassword) {
      console.error("Passwords don't match");
      this.setState({
        username: "",
        password: "",
        retypePassword: "",
        error: "Passwords don't match"
      })
    } else {
      return request("post", "/users", {
        username: this.state.username,
        password: this.state.password
      })
        .then(_ => request("post", "/auth/login", this.state))
        .then(response => {
          this.props.setAuthentication(response.data);
          localStorage.setItem("token", response.data.token);

          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({
            username: "",
            password: "",
            retypePassword: "",
            error: err.response.data.message
          })
        });
    }
  }

  handleChange = (field, input) => {
    const newState = { ...this.state }
    newState[field] = input;
    this.setState(newState);
}
  render = () =>
    <Container>
      <ErrorAlert
        message={ this.state.error }
        active={ !!this.state.error }
      />
      <Card className="dark-card">
        <CardBody>
          <Form onSubmit = { this.handleSubmit }>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={ e => this.handleChange("username", e.target.value) }
                value={ this.state.username }
                />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                onChange={ e => this.handleChange("password", e.target.value) }
                value={ this.state.password }
                />
            </FormGroup>
            <FormGroup>
              <Label for="retype-password">Retype Password</Label>
              <Input
                type="password"
                name="retype-password"
                placeholder="Retype password"
                autoComplete="new-password"
                onChange={ e => this.handleChange("retypePassword", e.target.value) }
                value={ this.state.retypePassword }
                />
            </FormGroup>
            <Input
              style={{
                background: "#697884",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              type="submit" />
          </Form>
        </CardBody>
      </Card>
    </Container>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setAuthentication }, dispatch);

export default connect(null, mapDispatchToProps)(NewUser);
