import chess from "chess-rules";

import { UPDATE_POSITION } from "../actions/position";

const defaultState = chess.getInitialPosition();

const position = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_POSITION:
      console.log("update")
      return action.payload;

    default:
      return { ...state };
  }
}

export default position;
