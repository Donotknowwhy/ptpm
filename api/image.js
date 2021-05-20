import axios from "axios";

export function getListImage(params) {
  return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
}