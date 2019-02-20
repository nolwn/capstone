import React from "react";

import JoinButton from "./JoinButton";

const LobbyGame = props =>
  <tr>
    <td> { props.game.playerWhite ?
        props.game.playerWhite :
        <JoinButton
          game={ props.game.id }
          pushHistory={ props.pushHistory }
          color="white"
        /> }
    </td>
    <td> { props.game.playerBlack ?
        props.game.playerBlack :
        <JoinButton
          game={ props.game.id }
          pushHistory={ props.pushHistory }
          color="black"
        /> }
    </td>
  </tr>

export default LobbyGame;
