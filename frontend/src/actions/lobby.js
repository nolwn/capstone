import { request } from "../utils";

const GET_GAMES = "GET_GAMES";

const getGames = () => {
  console.log("outer thunk");

  return (dispatch) => {
    console.log("inner thunk");

    return request("get", "/games")
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: GET_GAMES, payload: data });
      })
      .catch(err => console.log(err));
  }
}

export { GET_GAMES, getGames };
