import axios, { AxiosResponse } from "axios";
//import * as API from "middleware/api";
import { DetailPreliquidationBodyParamsType, DetailPreliquidationsContentResponseType, DetailPreliquidationsInvoiceApiResponseType, DetailPreliquidationsInvoiceTypesApiResponseType, PreliquidationsApiResponse } from "sagas/types/preliquidation";

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

export const putSaveDetailInvoice = (id:number,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
axios.put(`http://localhost:8080/detailInvoiceResult/${id}`,params)

export const patchApproveDetailInvoice = (id:number,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
axios.patch(`http://localhost:8080/detailInvoiceResult/${id}`,params)

export const putDeleteDetailInvoice = (id:number) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
axios.put(`http://localhost:8080/detailInvoiceResult/${id}`)

export const getDetailInvoiceTypes = () : Promise<AxiosResponse<DetailPreliquidationsInvoiceTypesApiResponseType>> =>
axios.get(`http://localhost:8080/fiscalData`)




export const getInvoiceType = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/invoiceType")





