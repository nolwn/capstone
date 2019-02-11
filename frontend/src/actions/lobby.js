import { request } from "../utils";

const GET_GAMES = "GET_GAMES";

const getGames = () => {
  console.log("outer thunk");

  return async (dispatch) => {
    console.log("inner thunk");
    let games;
    try {
      games = await request("get", "/games")

    } catch(err) {
      console.log(err)
    }

    return { type: GET_GAMES, payload: games }
  }
}

export { GET_GAMES, getGames };
