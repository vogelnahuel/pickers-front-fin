import * as API from "middleware/api";

export const getLogin = (params:object) => API.post('/ms-admin-rest/api/v1.0/login',params);
export const setAuthToken = (token:string) => {
    API.setAuthToken(token);
};
export const getLoginEmail = (params:object) => API.post('ms-admin-rest/api/v1.0/admin/request-change-password',params);