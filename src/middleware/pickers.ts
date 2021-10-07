import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { DocumentationType, EditPickerResponseType, ParamsTypeMiddleware, PickersAxiosResponseType, PickersExportResponseType } from "../pages/pickers/types";

export const getPickers = (params:ParamsTypeMiddleware):Promise<AxiosResponse<PickersAxiosResponseType>> => API.get("/ms-admin-rest/api/v1.0/pickers", params);
//TODO: unificar los export del csv
export const getPickersExport = (params?:ParamsTypeMiddleware):Promise<AxiosResponse<PickersExportResponseType>> => API.get("/ms-admin-rest/api/v1.0/pickers.csv", params);
export const getPicker = (params:Number):Promise<AxiosResponse<DocumentationType>> => API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);
export const getPickerExport = (params:ParamsTypeMiddleware):Promise<AxiosResponse<PickersExportResponseType>> => API.get(`/ms-admin-rest/api/v1.0/pickers.csv`,params); 
export const postPickerDocumentsEdit = (params:DocumentationType):Promise<AxiosResponse<EditPickerResponseType>> => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/invalid-documentation`,params);
export const postEditPicker = (params:DocumentationType):Promise<AxiosResponse<EditPickerResponseType>> => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}`,params);
export const postAprovePicker = (params:DocumentationType):Promise<AxiosResponse<EditPickerResponseType>> => API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/approve`,params);
