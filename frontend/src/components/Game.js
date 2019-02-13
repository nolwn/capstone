import React, { Component } from "react";
import { Container } from "reactstrap";

import Board from "./Board";

class Game extends Component {
  render = () =>
    <Container>
      <Board side="white"/>
    </Container>

}

export default Game;
