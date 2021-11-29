import axios, { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { PreliquidationsApiResponse } from "sagas/types/preliquidation";

// export const getPreliquidations = (
//   params: any
// ): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
//   API.get("/ms-admin-rest/api/v1.0/presettlments", params);

// export const getPreliquidations = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
// axios.get("http://localhost:8080/presettlments")

export const getPreliquidations = (params:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/presettlments",params)




export const getInvoiceType = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/invoiceType")

export const saveDetailInvoice = (id:any,params:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.patch(`http://localhost:8080/invoiceType/${id}`,params)

export const aproveDetailInvoice = (id:any,params:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.patch(`http://localhost:8080/invoiceType/${id}`,params)

export const deleteDetailInvoice = (id:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.patch(`http://localhost:8080/invoiceType/${id}`)
