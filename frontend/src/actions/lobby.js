import { request } from "../utils";

const GET_GAMES = "GET_GAMES";

const getGames = () =>
  dispatch =>
    request("get", "/games")
      .then(({ data }) =>
        dispatch({ type: GET_GAMES, payload: data })
      )
      .catch(err => console.error(err));


export { GET_GAMES, getGames };
