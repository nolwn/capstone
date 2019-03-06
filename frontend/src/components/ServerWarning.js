import React, { Component } from "react";
import { Alert } from "reactstrap";

class ServerWarning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "";
    }
  }

  const render = () =>
    {
      this.state.message ?
        <Alert>{ this.state.message }</Alert> :
          "";
    }
}

export default ServerWarning;
