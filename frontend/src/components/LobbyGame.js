import React from "react";

const LobbyGame = props =>
  <div>
    <span>{ props.game.id }</span>
    <span> { props.game.player_white }</span>
  </div>

export default LobbyGame;
