import chess from "chess-rules";

import { UPDATE_POSITION, GET_GAME } from "../actions/game";

const defaultState = { position: chess.getInitialPosition() };

const game = (state = defaultState, action) => {
  console.log("ACTION IN REDUCER", action)
  switch (action.type) {
    case GET_GAME:
      return action.payload;

    case UPDATE_POSITION:
      return { ...state, position: action.payload };

    default:
      return { ...state };
  }
}

export default game;
