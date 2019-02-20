import axios from "axios";
import io from "socket.io-client";

const server = process.env.REACT_APP_CHESS;


const request = (method, path, data) => {
  return axios(path, {
    method,
    headers: {
      "Authorization": "bearer " + localStorage.getItem("token"),
    },
    url: server + path,
    data
  })
}

const socket = io(process.env.REACT_APP_CHESS);

socket.on("update", e => console.log("🕹"));

export { request, socket };
