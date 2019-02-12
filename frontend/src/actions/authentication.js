import { request } from "../utils";

const SET_AUTHENTICATION = "SET_AUTHENTICATION";
const JOIN_GAME = "JOIN_GAME";


const setAuthentication = claim => ({
  type: SET_AUTHENTICATION,
  payload: claim
});

const joinGame = (game_id, color) =>
  dispatch =>
    request("patch", `/games/${game_id}/join`, { color })
      .then(({ data }) => {
        dispatch({ type: JOIN_GAME, payload: data });
      })
      .catch(err => console.error(err));

export { JOIN_GAME, SET_AUTHENTICATION, joinGame, setAuthentication };
