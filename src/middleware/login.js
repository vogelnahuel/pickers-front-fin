import * as API from "config/api";
export const getLogin = (params) => API.post('/ms-admin-rest/api/v1.0/login',params); 