import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom"
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label } from "reactstrap";

import { request } from "../utils";
import { setAuthentication } from "../actions/authentication";
import ErrorAlert from "./ErrorAlert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    }
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
        this.props.setAuthentication(response.data);
        localStorage.setItem("token", response.data.token);

        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          ...this.state,
          error: "Username and/or password is incorrect."
        });

        console.log(this.state);
        console.error(err);
      });
  };

  render = () =>
    <Container>
      <ErrorAlert
        message={ this.state.error }
        active={ !!this.state.error }
      />
      <div className="login">
          <Card className="dark-card mt-5">
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
                    type="password"
                    name="password"
                    id="password"
                    value={ this.state.password }
                    placeholder="Enter your password..."
                    onChange={ this.handleChange }
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    style={{
                      background: "#697884",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                    type="submit"
                  />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>

        <Link
          to="/new-user"
          style={{
            color: "white"
          }}>
          Create New User
        </Link>

      </div>
    </Container>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setAuthentication
  }, dispatch)

export default connect(null, mapDispatchToProps)(Login);
