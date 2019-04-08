import React, { Component } from "react";

class ErrorAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0
    };

    this.errorAlertStyle = {
      padding: "7px 1.25rem",
      borderRadius: 0 + "px",
      fontWeight: "bold",
      borderRadius: "10px 10px 0 0",
      color: "white",
      backgroundColor: "#dd9933"
    };

    if (props.active && this.state.opacity < 1) {
      this.fadeIn();
    }
  };

  fadeIn = () => {
    if (this.state.opacity < 1) {
      setTimeout(e => this.setState({ opacity: this.state.opacity + .1 }), 30);
    }
  };

  fadeOut = () => {

  };

  componentDidUpdate() {
    if (!!this.props.active && this.state.opacity < 1) {
      this.fadeIn();
    }
  }

  render = () => {
    return (
      <div className="" style={{ ...this.errorAlertStyle, opacity: this.state.opacity }} role="alert">
        <p style={{ margin: 0 }}>{ this.props.message }</p>
        { console.log("John Lithgow") }
      </div>
    );
  }
}

export default ErrorAlert;
