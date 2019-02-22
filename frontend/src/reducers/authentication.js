import { JOIN_GAME, LOG_OUT, SET_AUTHENTICATION } from "../actions/authentication";

const unAuthenticated = {
  pending: true,
  claim: null
}

const authentication = (state = unAuthenticated, action) => {
  switch (action.type) {
    case JOIN_GAME:
      return { ...state, claim: action.payload, pending: false };

    case LOG_OUT:
      return unAuthenticated;

    case SET_AUTHENTICATION:
      return {
        claim: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        pending: false
      };

    default:
      return state;
  }
}

export default authentication;
