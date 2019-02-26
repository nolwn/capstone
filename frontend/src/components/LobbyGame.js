import React from "react";
import { Row, Card, Col } from "reactstrap";

import JoinButton from "./JoinButton";

const LobbyGame = props =>
  <Card className="dark-card lobby-game">
    <Row>
      <Col className sm="6">
        { props.game.playerWhite ?
          <span className="lobby-opponent">
            { props.game.playerWhite }
          </span> :
          <JoinButton
            game={ props.game.id }
            pushHistory={ props.pushHistory }
            color="white"
            /> }
          </Col>
          <Col className sm="6">
            { props.game.playerBlack ?
              <span className="lobby-opponent">
                { props.game.playerBlack }
              </span> :
              <JoinButton
                game={ props.game.id }
                pushHistory={ props.pushHistory }
                color="black"
              /> }
          </Col>
    </Row>
  </Card>


export default LobbyGame;
