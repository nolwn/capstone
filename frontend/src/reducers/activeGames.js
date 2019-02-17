import { GET_ACTIVE_GAMES } from "../actions/activeGames";

const activeGames = (state = [], action) => {
  switch(action.type) {
    case GET_ACTIVE_GAMES:
      return action.payload;

    default:
      return state;
  }
}

export default activeGames;
