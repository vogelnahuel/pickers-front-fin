import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "country-code":"ar",
    "Authorization":`Bearer ${window.localStorage.getItem('token')}`
 
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   (err) => err
// );

export default api;