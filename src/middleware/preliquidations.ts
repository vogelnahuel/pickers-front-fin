import axios, { AxiosResponse } from "axios";
//import * as API from "middleware/api";
import { DetailPreliquidationBodyParamsType, DetailPreliquidationsContentResponseType, PreliquidationsApiResponse } from "sagas/types/preliquidation";

// export const getPreliquidations = (
//   params: any
// ): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
//   API.get("/ms-admin-rest/api/v1.0/presettlments", params);

// export const getPreliquidations = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
// axios.get("http://localhost:8080/presettlments")

export const getPreliquidations = (params:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/presettlments",params)

export const getDetailInvoice = (id:any): Promise<AxiosResponse<DetailPreliquidationsContentResponseType>> =>
axios.get(`http://localhost:8080/detailInvoice/${id}`)

export const putSaveDetailInvoice = (id:number,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<any>> =>
axios.put(`http://localhost:8080/detailInvoiceResult/${id}`,params)

export const patchApproveDetailInvoice = (id:number,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<any>> =>
axios.patch(`http://localhost:8080/detailInvoiceResult/${id}`,params)

export const putDeleteDetailInvoice = (id:number) : Promise<AxiosResponse<any>> =>
axios.put(`http://localhost:8080/detailInvoiceResult/${id}/rejected`)




export const getInvoiceType = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/invoiceType")





