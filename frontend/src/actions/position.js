const UPDATE_POSITION = "UPDATE_POSITION";

const updatePosition = position => {
  return { type: UPDATE_POSITION, payload: position }
}

export { UPDATE_POSITION, updatePosition };
