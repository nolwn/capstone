import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import authentication from "./reducers/authentication";
import lobby from "./reducers/lobby";

const reducers = combineReducers({
  authentication,
  lobby
});

export default createStore(reducers, applyMiddleware(thunk, logger));
