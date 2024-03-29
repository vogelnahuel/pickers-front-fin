import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import {
  DetailPreliquidationBodyParamsType,
  DetailPreliquidationsContentResponseType,
  DetailPreliquidationsInvoiceApiResponseType,
  PreliquidationsApiResponse,
  UploadInvoiceFileMiddlewareType,
  DetailPreliquidationsInvoiceTypesApiResponseType,
  PreliquidationCastParamsMiddlewareType,
  AdjustAmountMiddlewareType,
  DetatilPreliquidationsApiResponse,
  sendAccountinMiddlewareType,
} from "sagas/types/preliquidation";
import { ApiResponse } from "./api";

export const getPreliquidations = (
  params: PreliquidationCastParamsMiddlewareType
): Promise<AxiosResponse<PreliquidationsApiResponse>> =>
  API.get("/ms-admin-rest/api/v1.0/presettlements", params);

export const getDetailInvoice = (
  id: string | undefined
): Promise<AxiosResponse<DetailPreliquidationsContentResponseType>> =>
  API.get(`/ms-admin-rest/api/v1.0/presettlements/${id}/invoice`);

export const putSaveDetailInvoice = (
  presettementId: string | undefined,
  params: DetailPreliquidationBodyParamsType
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  API.put(
    `/ms-admin-rest/api/v1.0/presettlements/${presettementId}/invoice`,
    params
  );

export const patchApproveDetailInvoice = (
  presettementId: string | undefined,
  params: DetailPreliquidationBodyParamsType
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  API.patch(
    `/ms-admin-rest/api/v1.0/presettlements/${presettementId}/invoice`,
    params
  );

export const putDeleteDetailInvoice = (
  presettementId: string | undefined
): Promise<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>> =>
  API.put(
    `/ms-admin-rest/api/v1.0/presettlements/${presettementId}/rejected-invoice`
  );

export const getDetailInvoiceTypes = (): Promise<
  AxiosResponse<DetailPreliquidationsInvoiceTypesApiResponseType>
> => API.get(`/ms-admin-rest/api/v1.0/fiscal-data/invoice-type`);

export const replaceInvoiceFile = (
  params: UploadInvoiceFileMiddlewareType
): Promise<AxiosResponse<ApiResponse<void>>> =>
  API.put(`/ms-admin-rest/api/v1.0/presettlements/${params.id}/invoice/file`, {
    content: params.content,
  });
  export const uploadInvoiceFile = (
    params: UploadInvoiceFileMiddlewareType
  ): Promise<AxiosResponse<ApiResponse<void>>> =>
    API.post(`/ms-admin-rest/api/v1.0/presettlements/${params.id}/invoice/file`, {
      content: params.content,
    });
export const deleteInvoiceFile = (
  id: number
): Promise<AxiosResponse<ApiResponse<void>>> =>
  API.remove(`/ms-admin-rest/api/v1.0/presettlements/${id}/invoice/file`);

export const preliquidationAdjustment = (params: AdjustAmountMiddlewareType) => {
  const { id, callback, ...body } = params;
  return API.post(`/ms-admin-rest/api/v1.0/presettlements/${id}/adjustment`, body);
}
export const getDetailPreliquidations = (id: number): Promise<AxiosResponse<DetatilPreliquidationsApiResponse>> =>
  API.get(`/ms-admin-rest/api/v1.0/presettlements/${id}`);

  export const sendAccounting = (
    params:  sendAccountinMiddlewareType
  ): Promise<AxiosResponse<ApiResponse<void>>> =>
    API.post(`/ms-admin-rest/api/v1.0/presettlements/accounting`, params);

  
