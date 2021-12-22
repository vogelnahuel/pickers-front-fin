import axios, { AxiosResponse } from "axios";
import * as API from "middleware/api";
//import * as API from "middleware/api";
import { DetailPreliquidationBodyParamsType, DetailPreliquidationsContentResponseType, DetailPreliquidationsInvoiceApiResponseType, DetailPreliquidationsInvoiceTypesApiResponseType, PreliquidationsApiResponse } from "sagas/types/preliquidation";

// export const getPreliquidations = (
//   params: any
// ): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
//   API.get("/ms-admin-rest/api/v1.0/presettlments", params);

// export const getPreliquidations = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
// axios.get("http://localhost:8080/presettlments")

export const getPreliquidations = (params:any): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
API.get("/ms-admin-rest/api/v1.0/presettlements",params)

export const getDetailInvoice = (id:any): Promise<AxiosResponse<DetailPreliquidationsContentResponseType>> =>
API.get(`/ms-admin-rest/api/v1.0/presettlements/${id}/invoice`)

export const putSaveDetailInvoice = (presettementId:string | undefined,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
API.put(`/ms-admin-rest/api/v1.0/presettlements/${presettementId}/invoice`,params)

export const patchApproveDetailInvoice = (presettementId:string | undefined,params:DetailPreliquidationBodyParamsType) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
API.patch(`/ms-admin-rest/api/v1.0/presettlements/${presettementId}/invoice`,params)

export const putDeleteDetailInvoice = (presettementId:string | undefined) : Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
API.put(`/ms-admin-rest/api/v1.0/presettlements/${presettementId}/rejected-invoice`)

export const getDetailInvoiceTypes = () : Promise<AxiosResponse<DetailPreliquidationsInvoiceTypesApiResponseType>> =>
API.get(`/ms-admin-rest/api/v1.0/fiscal-data/invoice-type`)




export const getInvoiceType = (): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
axios.get("http://localhost:8080/invoiceType")





