import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import authentication from "./reducers/authentication";
import lobby from "./reducers/lobby";
import match from "./reducers/match";

const reducers = combineReducers({
  authentication,
  lobby,
  match
});

export default createStore(reducers, applyMiddleware(thunk, logger));
