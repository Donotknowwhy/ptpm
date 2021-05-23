import axios from "axios";

export function getListImage(params) {
  return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
}

export function getSignedURL(params) {
  return axios.get(
    `http://soc.laptrinhwebthatzui.me:13000/v1/images/gen-signed-url?key=${params}`
  );
}

export function putImage(url, data) {
  return axios.put(url, data);
}
