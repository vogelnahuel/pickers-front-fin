import * as API from "middleware/api";

export const getLogin = (params:any) => API.post('/ms-admin-rest/api/v1.0/login',params);
export const setAuthToken = (token:any) => {
    API.setAuthToken(token);
};