import { request } from "../utils";

const SET_AUTHENTICATION = "SET_AUTHENTICATION";
const JOIN_GAME = "JOIN_GAME";
const LOG_OUT = "LOGOUT";
const CREATE_GAME = "CREATE_GAME";

const setAuthentication = authData => ({
  type: SET_AUTHENTICATION,
  payload: authData
});

const logOut = () => {
  localStorage.removeItem("token");
  return { type: LOG_OUT };
}

const createGame = (reqBody, color, pushHistory) =>
  dispatch =>
    request("post", "/games", reqBody)
      .then(({ data }) => {
        console.log("CREATE", data.token)
        localStorage.setItem("token", data.token)
        dispatch({ type: CREATE_GAME, payload: data.token })
        pushHistory(`game/${data.id}`);
      });

const joinGame = (game_id, color, pushHistory) => {
  console.log(game_id, color, pushHistory)
  return dispatch =>
    request("patch", `/games/${game_id}/join`, { color })
      .then(({ data }) => {
        localStorage.setItem("token", data)
        dispatch({ type: JOIN_GAME, payload: data });
        pushHistory(`/game/${game_id}`);
      })
      .catch(err => console.error(err));
}

export {
  JOIN_GAME,
  LOG_OUT,
  CREATE_GAME,
  SET_AUTHENTICATION,
  joinGame,
  createGame,
  logOut,
  setAuthentication
};
