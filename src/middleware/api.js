import axios from 'axios';
import {getValue} from "utils/localStorage";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "country-code":"ar",
        "Access-Control-Allow-Origin": "true",
    },
});

export const setAuthToken = (token) => {
    api.defaults.headers.Authorization = `bearer ${token}`;
};

api.interceptors.request.use((request) => {
    console.log(request.headers.Authorization);
    if (request.headers && !request.headers.Authorization) {
        let token = getValue("token");
        request.headers.Authorization = `bearer ${token}`;
        setAuthToken(token);
    }
    return request;
});

api.interceptors.response.use(
    (response) => {
        if (response.status === 204) {
            return response;
        }

        // cubre el caso de un download de un archivo
        if (response.status === 200 && (response.request.responseType === "blob")) {
            return response;
        }
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status !== 401) {
                return error.response;
            }
        }

        // se agrega el atributo para saber que es un error de saga
        // eslint-disable-next-line
        error.httpError = true;

        throw error;
    },
);

export const get = (path, query) => {
    return api.get(
        path,
        {params: query}
    );
};

export const post = (path, body) => {
    return api.post(
        path,
        body
    );
};

export const put = (path, body, query) => {
    return api.put(
        path,
        body,
        query
    );
};

export default api;