import { request } from "../utils";

const GET_ACTIVE_GAMES = "GET_ACTIVE_GAMES";

const getActiveGames = userId =>
  dispatch =>
    request("get", `/users/${userId}/games`)
      .then(({ data }) =>
        dispatch({ type: GET_ACTIVE_GAMES, payload: data })
      );

export { GET_ACTIVE_GAMES, getActiveGames };
