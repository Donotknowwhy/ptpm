import axios from "axios";

export function getListImage(params) {
  // return axios.get(`https://picsum.photos/v2/list?page=${params}&limit=10`);
  // return axios.get(`http://209.126.13.177:13000/v1/flickr`) 
<<<<<<< HEAD
<<<<<<< HEAD
  // return axios.get(`http://localhost:3005/v1/images?page=${params}`) 
  return axios.get(`http://soc.laptrinhwebthatzui.me:13000/v1/images?page=${params}`) 
=======
  return axios.get(`http://localhost:3005/v1/images?page=${params}`) 
>>>>>>> refactor api
=======
  return axios.get(`http://localhost:3005/v1/images?page=${params}`) 
  // return axios.get(`http://soc.laptrinhwebthatzui.me:13000/v1/images?page=${params}`) 
>>>>>>> style for content index
}