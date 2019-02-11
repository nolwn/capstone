import React from "react";

const LobbyGame = props =>
  <tr>
    <td>{ props.game.id }</td>
    <td> { props.game.playerWhite }</td>
    <td> { props.game.playerBlack } </td>
  </tr>

export default LobbyGame;
