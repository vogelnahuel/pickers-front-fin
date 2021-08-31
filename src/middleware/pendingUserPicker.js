import * as API from "config/api";

export const getPendingUserPicker = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);
export const getPendingUserPickerExport = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers.csv`,params); 
export const postPendingUserDocumentsEdit = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/invalid-documentation`,params); 
                                           
//export const postPendingUserApprovePicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params}`); 
 