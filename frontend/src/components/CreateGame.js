import React from "react";
import { Row, Col, Card, Button, CardBody } from "reactstrap";

import CreateButton from "./CreateButton";

const CreateGame = props =>
  <div>
    <h2>Start a Game</h2>
    <Card className="dark-card">
      <Row>
        <Col sm="6">
          <CreateButton color="white" />
        </Col>
        <Col sm="6">
          <CreateButton color="black" />
        </Col>
      </Row>
    </Card>
  </div>

export default CreateGame;
