import { JOIN_GAME, SET_AUTHENTICATION } from "../actions/authentication";

const unAuthenticated = {
  pending: true,
  claim: null
}

const authentication = (state = unAuthenticated, action) => {
  switch (action.type) {
    case JOIN_GAME:
      return { claim: action.payload, pending: false };

    case SET_AUTHENTICATION:
      return { claim: action.payload, pending: false };

    default:
      return state;
  }
}

export default authentication;