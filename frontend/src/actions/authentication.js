import { request } from "../utils";

const SET_AUTHENTICATION = "SET_AUTHENTICATION";
const JOIN_GAME = "JOIN_GAME";
const LOG_OUT = "LOGOUT";

const setAuthentication = authData => ({
  type: SET_AUTHENTICATION,
  payload: authData
});

const logOut = () => {
  localStorage.removeItem("token");
  return { type: LOG_OUT };
}

const joinGame = (game_id, color, pushHistory) =>
  dispatch =>
    request("patch", `/games/${game_id}/join`, { color })
      .then(({ data }) => {
        localStorage.setItem("token", data)
        dispatch({ type: JOIN_GAME, payload: data });
        pushHistory(`/game/${game_id}`);
      })
      .catch(err => console.error(err));

export {
  JOIN_GAME,
  LOG_OUT,
  SET_AUTHENTICATION,
  joinGame,
  logOut,
  setAuthentication
};
