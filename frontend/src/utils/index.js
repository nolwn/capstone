import axios from "axios";

const server = process.env.REACT_APP_CHESS;


const request = (method, path, data) => {
  return axios(path, {
    method,
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
    url: server + path,
    data
  })
}

export { request };
