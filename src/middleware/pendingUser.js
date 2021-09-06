import * as API from "./api";

export const getPendingUser = (params) => API.get("/ms-admin-rest/api/v1.0/pickers", params);

export const getPendingUserExport = (params) => API.get("/ms-admin-rest/api/1.0/pickers.csv", params);