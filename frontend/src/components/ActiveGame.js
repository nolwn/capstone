import React from "react";
import { ListGroupItem } from "reactstrap";

const ActiveGame = (props) => {
  console.log(props)
  return <ListGroupItem>
    { props.opponent ? props.opponent : "Waiting for an opponent..." }
    <hr />
    { props.color[0] === props.status ?
      "Your turn!" :
      "Your opponent's turn"
    }
  </ListGroupItem>;
}

export default ActiveGame;
