import axios, { AxiosResponse } from "axios";
//import * as API from "middleware/api";
import {
  DetailPreliquidationBodyParamsType,
  DetailPreliquidationsContentResponseType,
  DetailPreliquidationsInvoiceApiResponseType,
  PreliquidationsApiResponse,
  UploadInvoiceFileMiddlewareType,
} from "sagas/types/preliquidation";
import { ApiResponse } from "./api";

// export const getPreliquidations = (
//   params: any
// ): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
//   API.get("/ms-admin-rest/api/v1.0/presettlments", params);

// export const getPreliquidations = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
// axios.get("http://localhost:8080/presettlments")

export const getPreliquidations = (
  params: any
): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
  axios.get("http://localhost:8080/presettlments", params);

export const getDetailInvoice = (
  id: any
): Promise<AxiosResponse<DetailPreliquidationsContentResponseType>> =>
  axios.get(`http://localhost:8080/detailInvoice/${id}`);

export const putSaveDetailInvoice = (
  id: number,
  params: DetailPreliquidationBodyParamsType
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  axios.put(`http://localhost:8080/detailInvoiceResult/${id}`, params);

export const patchApproveDetailInvoice = (
  id: number,
  params: DetailPreliquidationBodyParamsType
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  axios.patch(`http://localhost:8080/detailInvoiceResult/${id}`, params);

export const putDeleteDetailInvoice = (
  id: number
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  axios.put(`http://localhost:8080/detailInvoiceResult/${id}`);

export const getInvoiceType = (): Promise<
  AxiosResponse<PreliquidationsApiResponse>
> => axios.get("http://localhost:8080/invoiceType");

// export const uploadInvoiceFile = (
//   params: UploadInvoiceFileMiddlewareType
// ): Promise<AxiosResponse<ApiResponse<void>>> =>
//   axios.put(`/presettlments/${params.id}/invoice/file`, { content: params.content });

// export const deleteInvoiceFile = (id: number): Promise<AxiosResponse<ApiResponse<void>>> =>
//   axios.delete(`/presettlments/${id}/invoice/file`);


export const uploadInvoiceFile = (
  params: UploadInvoiceFileMiddlewareType
): Promise<AxiosResponse<ApiResponse<void>>> =>
  axios.get("http://localhost:8080/invoiceType");

export const deleteInvoiceFile = (id: number): Promise<AxiosResponse<ApiResponse<void>>> =>
  axios.get("http://localhost:8080/invoiceType");
