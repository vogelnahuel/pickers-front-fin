import * as API from "./api";
import moment from "moment";

const process = (body) => {
 return {
     ...body,
     dateOfBirth: moment(body.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD"),
     expirationDatePolicyPersonal: moment(body.expirationDatePolicyPersonal, "DD/MM/YYYY").format("YYYY-MM-DD"),
     vehicle: {
         ...body.vehicle,
         [body.vehicleType]: {
             ...body.vehicle[body.vehicleType],
             expirationDatePolicyVehicle: moment(body.vehicle[body.vehicleType].expirationDatePolicyVehicle, "DD/MM/YYYY").format("YYYY-MM-DD"),
             expirationDateIdentificationVehicle: moment(body.vehicle[body.vehicleType].expirationDateIdentificationVehicle, "DD/MM/YYYY").format("YYYY-MM-DD"),
             expirationDateDriverLicense: moment(body.vehicle[body.vehicleType].expirationDateDriverLicense, "DD/MM/YYYY").format("YYYY-MM-DD"),
         }
     }
 };
};


export const getPendingUserPicker = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);
export const getPendingUserPickerExport = (params) => API.get(`/ms-admin-rest/api/v1.0/pickers.csv`,params); 
export const postPendingUserDocumentsEdit = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/invalid-documentation`,process(params));
export const postEditPicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}`,process(params));
export const postAprovePicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/approve`,process(params));

//export const postPendingUserApprovePicker = (params) => API.post(`/ms-admin-rest/api/v1.0/pickers/${params}`);