import * as API from "./api";

export const getPendingUserPicker = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);
export const getPendingUserPickerExport = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers.csv`,params); 
export const postPendingUserDocumentsEdit = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/invalid-documentation`,params); 
export const postEditPicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}`,params);
export const postAprovePicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/approve`,params);

//export const postPendingUserApprovePicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params}`); 
 