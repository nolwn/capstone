import React from "react";

import JoinButton from "./JoinButton";

const LobbyGame = props =>
  <tr>
    <td>{ props.game.id }</td>
    <td> { props.game.playerWhite ? props.game.playerWhite : <JoinButton color="white" /> }</td>
    <td> { props.game.playerBlack ? props.game.playerBlack : <JoinButton color="black"/> } </td>
  </tr>

export default LobbyGame;
