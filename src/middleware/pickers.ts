import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { PickerFileRequestType } from "pages/pickers/detailPicker/types";

import { BankType, ExpandableFileLoadParamType } from "sagas/types/pickers";
import {
  PickerType,
  EditPickerResponseType,
  ParamsMiddlewareType,
  PickersAxiosResponseType,
  PickersExportResponseType,
  PickerFileResponseType,
} from "../pages/pickers/types";

export const getPickers = (
  params: ParamsMiddlewareType
): Promise<AxiosResponse<PickersAxiosResponseType>> =>
  API.get("/ms-admin-rest/api/v1.0/pickers", params);

//TODO: unificar los export del csv
export const getPickersExport = (
  params: ParamsMiddlewareType
): Promise<AxiosResponse<PickersExportResponseType>> => {
  const { limit, offset, ...body } = params;
  return API.get("/ms-admin-rest/api/v1.0/pickers.csv", body);
};

export const getPicker = (params: number): Promise<AxiosResponse<PickerType>> =>
  API.get(`/ms-admin-rest/api/v1.0/pickers/${params}`);

export const getPickerExport = (
  params: ParamsMiddlewareType
): Promise<AxiosResponse<PickersExportResponseType>> => {
  const { limit, offset, ...body } = params;
  return API.get(`/ms-admin-rest/api/v1.0/pickers.csv`, body);
};

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

export const fileUpload = (
  id: number,
  params: ExpandableFileLoadParamType
): Promise<AxiosResponse<{}>> =>
  API.put(`/ms-admin-rest/api/v1.0/pickers/${id}/files`, params);

export const getFile = ({
  pickerId,
  tag,
}: PickerFileRequestType): Promise<AxiosResponse<PickerFileResponseType>> =>
  API.get(`/ms-admin-rest/api/v1.0/pickers/${pickerId}/files/${tag}`);

export const deleteFile = (
  id: number,
  tag: string
): Promise<AxiosResponse<{}>> =>
  API.remove(`/ms-admin-rest/api/v1.0/pickers/${id}/files/${tag}`);

export const getBankName = (
  cbuPrefix: number
): Promise<AxiosResponse<API.ApiResponse<BankType>>> => {
  return API.get(`/ms-admin-rest/api/v1.0/banks/${cbuPrefix}`);
};
