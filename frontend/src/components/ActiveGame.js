import React from "react";
import { ListGroupItem } from "reactstrap";

const ActiveGame = (props) =>
  <ListGroupItem>
    { props.opponent ? props.opponent : "Waiting for an opponent..." }
    <hr />
    { props.color[0] === props.status ?
      "Your turn!" :
      "Your opponent's turn"
    }
  </ListGroupItem>;

export default ActiveGame;
