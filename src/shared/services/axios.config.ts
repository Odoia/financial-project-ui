import axios from "axios";

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNjQ5MTk3MTI2fQ.gL0DHp6ns59A0C_-_1Z1azDAm_agBPIMxYdEQV6NQ-A'
const apiUrl = 'http://localhost:3000/api/v1'

const instance = axios.create({
  baseURL: apiUrl,
  headers: {   
    "content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(async (config) => {

  if(accessToken){
    config.headers!.Authorization = "Bearer " + accessToken;
  }

  return config
}, function (error) {
  console.log(error);
  return Promise.reject(error)
});

instance.interceptors.response.use(async (response) => {
  console.log('response interceptors', response);
  // const accessToken = response.data['auth_token'];

  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error)
});

export default instance;
