import { request } from "../utils";

const SET_AUTHENTICATION = "SET_AUTHENTICATION";
const JOIN_GAME = "JOIN_GAME";



const setAuthentication = authData => ({
  type: SET_AUTHENTICATION,
  payload: authData
});

const joinGame = (game_id, color, pushHistory) =>
  dispatch =>
    request("patch", `/games/${game_id}/join`, { color })
      .then(({ data }) => {
        localStorage.setItem("token", data)
        dispatch({ type: JOIN_GAME, payload: data });
        pushHistory(`/game/${game_id}`);
      })
      .catch(err => console.error(err));

export { JOIN_GAME, SET_AUTHENTICATION, joinGame, setAuthentication };
