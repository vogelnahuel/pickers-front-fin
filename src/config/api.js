import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "country-code":"ar",
    "accessToken": window.localStorage.getItem('token'),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.localStorage.removeItem('token');
      api.defaults.headers = {
        apiKey: null,
      };
      window.location.reload();
    }
    return Promise.reject(error);
 },
);

export default api;