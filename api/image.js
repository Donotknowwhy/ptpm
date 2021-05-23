import axios from "axios";

// const domain = "https://nosy-zigzag-ball.glitch.me"
const domain = "http://soc.laptrinhwebthatzui.me:13000"

export function getListImage(params) {
  // return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
  return axios.get(
    `${domain}/v1/images?page=${params}`
  );
}

export function getSignedURL(params) {
  return axios.get(
    `${domain}/v1/images/gen-signed-url?key=${params}`
  );
}

export function putImage(url, data) {
  return axios.put(url, data);
}

export function saveUser(uid, params) {
  return axios.post(`${domain}domain/v1/users/${uid}`, {
    imageUrl: params,
  });
}

export function getImageByUser(uid) {
  // return axios.get(`http://soc.laptrinhwebthatzui.me:13000/v1/users/${uid}`);
  return axios.get(`${domain}/v1/users/${uid}`);

}
