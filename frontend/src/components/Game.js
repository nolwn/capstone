import React, { Component } from "react";
import { Container } from "reactstrap";

import Board from "./Board";
import Pieces from "./Pieces";

class Game extends Component {
  render = () =>
    <Container>
      <Pieces />
      <Board side="white"/>
    </Container>

}

export default Game;
