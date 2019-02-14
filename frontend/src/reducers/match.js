import chess from "chess-rules";

const defaultState = chess.getInitialPosition();

const match = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default match;
