import { GET_GAMES, GET_GAME } from "../actions/lobby";

const lobby = (state = [], action) => {
  switch (action.type) {
    case GET_GAMES:
      return action.payload;

    default:
      return state;
  }
}

export default lobby;
