import { SET_AUTHENTICATION } from "../actions/authentication";

const unAuthenticated = {
  pending: true,
  claim: null
}

const setAuthentication = (state = unAuthenticated, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      console.log("tasty poop")
      return { claim: action.payload, panding: false };

    default:
      return state;
  }
}

export { setAuthentication }
