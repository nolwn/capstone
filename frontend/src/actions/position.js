import { request } from "../utils";

const UPDATE_POSITION = "UPDATE_POSITION";

const updatePosition = position => {
  request("patch", "/games/")

  return dispatch =>
    ({ type: UPDATE_POSITION, payload: position })
}

const revertPosition = position =>
    ({ type: UPDATE_POSITION, payload: position })

export { UPDATE_POSITION, updatePosition };
