import axios from "axios";
import io from "socket.io-client";

const server = process.env.REACT_APP_CHESS;


const request = (method, path, data) => {
  return axios(server + path, {
    method,
    headers: {
      "Authorization": "bearer " + localStorage.getItem("token"),
    },
    url: server + path,
    data
  })
}

// Get the x and y values based on board index.
const getPosFromIndex = (index, flip) => {
  const position = ({
    x: (index) % 8 * 64,
    y: -1 * Math.floor((index) / 8) * 64
  })

  // flip if player is playing black
  if (flip) {
    position.x = 64 * 7 - position.x;
    position.y = (-64 * 7) - position.y;
  }

  return position
}

// Get the index from a board position.
const getIndexFromPos = (pos, flip) => {
  let index = (Math.abs(pos.y) / 64) * 8 + (Math.abs(pos.x) / 64);

  // flip if player is playing black
  if (flip) {
    index = 63 - index;
  }

  return index;
}

const socket = io(process.env.REACT_APP_CHESS);

export { request, socket, getPosFromIndex, getIndexFromPos };
