import { GET_GAMES } from "../actions/lobby";

const lobby = (state = [], action) => {
  switch (action.type) {
    case GET_GAMES:
      return action.payload;

    default:
      return state;
  }
}

export default lobby;
