import React, { Component } from "react";
import { Container } from "reactstrap";

import Board from "./Board";
import Pieces from "./Pieces";

let highlights = []

class Game extends Component {
  render = () =>
    <Container>
      <Pieces highlights={ highlights } />
      <Board side="white"/>
    </Container>

}

export default Game;
