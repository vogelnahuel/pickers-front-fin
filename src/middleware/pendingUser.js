import * as API from "config/api";

export const getPendingUser = (params) => API.get("/ms-admin-rest/api/v1.0/pickers?pickerStatusId=2,3", params); 