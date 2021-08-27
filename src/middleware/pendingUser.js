import * as API from "config/api";

export const getPendingUser = (params) => API.get("/ms-admin-rest/api/v1.0/pickers", params);

// ?pickerStatusId=2,3"