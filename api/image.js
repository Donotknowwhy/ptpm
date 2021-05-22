import axios from "axios";

export function getListImage(params) {
  // return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
  // return axios.get(`http://209.126.13.177:13000/v1/flickr`) 
  return axios.get(`http://localhost:3005/v1/images?page=${params}`) 
}