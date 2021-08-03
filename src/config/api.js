import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "country-code":"ar",
    "accessToken": `${window.localStorage.getItem('token')}`,
    "Authorization":`Bearer ${window.localStorage.getItem('token')}`
 
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
   
 },
);

export default api;