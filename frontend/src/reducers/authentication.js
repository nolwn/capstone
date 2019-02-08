import { SET_AUTHENTICATION } from "../actions/authentication";

const unAuthenticated = {
  pending: true,
  claim: null
}

const authentication = (state = unAuthenticated, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      console.log("tasty poop")
      return { claim: action.payload, pending: false };

    default:
      return state;
  }
}

export { authentication }
