import chess from "chess-rules";

import { UPDATE_POSITION, GET_GAME } from "../actions/position";

const defaultState = chess.getInitialPosition();

const position = (state = defaultState, action) => {
  switch (action.type) {
    case GET_GAME:
      return action.payload;

    case UPDATE_POSITION:
      return action.payload;

    default:
      return { ...state };
  }
}

export default position;
