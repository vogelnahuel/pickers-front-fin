import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import {
  PickerType,
  EditPickerResponseType,
  ParamsMiddlewareType,
  PickersAxiosResponseType,
  PickersExportResponseType,
} from "../pages/pickers/types";

export const getPickers = (
  params: ParamsMiddlewareType
): Promise<AxiosResponse<PickersAxiosResponseType>> =>
  API.get("/ms-admin-rest/api/v1.0/pickers", params);
//TODO: unificar los export del csv
export const getPickersExport = (
  params?: ParamsMiddlewareType
): Promise<AxiosResponse<PickersExportResponseType>> =>
  API.get("/ms-admin-rest/api/v1.0/pickers.csv", params);
export const getPicker = (params: Number): Promise<AxiosResponse<PickerType>> =>
  API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);
export const getPickerExport = (
  params: ParamsMiddlewareType
): Promise<AxiosResponse<PickersExportResponseType>> =>
  API.get(`/ms-admin-rest/api/v1.0/pickers.csv`, params);
export const postPickerDocumentsEdit = (
  params: PickerType
): Promise<AxiosResponse<EditPickerResponseType>> =>
  API.post(
    `/ms-admin-rest/api/v1.0/pickers/${params.id}/invalid-documentation`,
    params
  );
export const postEditPicker = (
  params: PickerType
): Promise<AxiosResponse<EditPickerResponseType>> =>
  API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}`, params);
export const postAprovePicker = (
  params: PickerType
): Promise<AxiosResponse<EditPickerResponseType>> =>
  API.post(`/ms-admin-rest/api/v1.0/pickers/${params.id}/approve`, params);
