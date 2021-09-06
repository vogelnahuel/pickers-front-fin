import * as API from "./api";
export const getLogin = (params) => API.post('/ms-admin-rest/api/v1.0/login',params);
export const setAuthToken = (token) => {
    API.setAuthToken(token);
};