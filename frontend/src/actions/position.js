import { request } from "../utils";
import chess from "chess-rules";

const UPDATE_POSITION = "UPDATE_POSITION";
const GET_GAME = "GET_GAME";

const updatePosition = (gameId, position, move, socket) => {
  console.log("move", move)
    return dispatch =>
      request("post", "/games/" + gameId + "/turns/", move)
        .then(_ => {
          dispatch ({ type: UPDATE_POSITION, payload: chess.applyMove(position, move) })
        })
        .catch(err => {
          console.log("this didn't work")
          console.error(err);
        })
}

const getGame = gameId =>
  dispatch =>
    request("get", "/games/" + gameId)
      .then(({ data }) =>
        dispatch({ type: GET_GAME, payload: data })
      )
      .catch(err => console.error(err));

const revertPosition = position =>
  ({ type: UPDATE_POSITION, payload: position })

export { UPDATE_POSITION, GET_GAME, getGame, updatePosition, revertPosition };
