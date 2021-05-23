import axios from "axios";

export function getListImage(params) {
  // return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
  // return axios.get(`http://209.126.13.177:13000/v1/flickr`)
  // return axios.get(`http://localhost:3005/v1/images?page=${params}`)
  return axios.get(
    `http://soc.laptrinhwebthatzui.me:13000/v1/images?page=${params}`
  );
}

export function getSignedURL(params) {
  return axios.get(
    `http://soc.laptrinhwebthatzui.me:13000/v1/images/gen-signed-url?key=${params}`
  );
}

export function putImage(url, data) {
  return axios.put(url, data);
}

export function saveUser(uid, params) {
  return axios.post(`http://soc.laptrinhwebthatzui.me:13000/v1/users/${uid}`, {
    imageUrl: params,
  });
}

export function getImageByUser(uid) {
  return axios.get(`http://soc.laptrinhwebthatzui.me:13000/v1/users/${uid}`);
}
