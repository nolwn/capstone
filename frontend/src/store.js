import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { setAuthentication } from "./reducers/authentication";

const reducers = combineReducers({
  setAuthentication
});

export default createStore(reducers, applyMiddleware(thunk, logger));
