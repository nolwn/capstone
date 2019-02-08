import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { authentication } from "./reducers/authentication";

const reducers = combineReducers({
  authentication
});

export default createStore(reducers, applyMiddleware(thunk, logger));
