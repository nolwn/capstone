const SET_AUTHENTICATION = "SET_AUTHENTICATION";

const setAuthentication = claim => ({
  type: SET_AUTHENTICATION,
  payload: claim
});

export { SET_AUTHENTICATION, setAuthentication };
