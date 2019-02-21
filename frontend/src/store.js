import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import activeGames from "./reducers/activeGames"
import authentication from "./reducers/authentication";
import lobby from "./reducers/lobby";
import game from "./reducers/game";

const reducers = combineReducers({
  activeGames,
  authentication,
  lobby,
  game
});

export default createStore(reducers, applyMiddleware(thunk, logger));
