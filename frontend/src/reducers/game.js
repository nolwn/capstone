import chess from "chess-rules";

import { UPDATE_POSITION, GET_GAME, DESTROY_GAME } from "../actions/game";

const defaultState = { position: { board:[] } };

const game = (state = defaultState, action) => {
  switch (action.type) {
    case GET_GAME:
      return action.payload;

    case UPDATE_POSITION:
      return { ...state, position: action.payload };

    case DESTROY_GAME:
      console.log("tearing down game!")
      return defaultState;

    default:
      return { ...state };
  }
}

export default game;
