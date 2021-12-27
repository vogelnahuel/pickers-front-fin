import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import moment from "moment";
import { ApiResponse } from "middleware/api";
import { detailPreliquidationDatePicker } from "pages/preliquidation/DetailPreliquidation/invoice/types";

import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DATE_FORMATS } from "utils/constants";
import * as preliquidationsMiddleware from "../middleware/preliquidations";

import { actions as preliquidationActions } from "../reducers/preliquidation";
import {
  DetailPreliquidationBodyParamsType,
  DetailPreliquidationsApiResponseType,
  DetailPreliquidationsContentResponseType,
  DetailPreliquidationsInvoiceApiResponseType,
  DetailPreliquidationsInvoiceTypesApiResponseType,
  PreliquidationParamsMiddlewareType,
  PreliquidationsApiResponse,
  UploadInvoiceFileMiddlewareType,
} from "./types/preliquidation";

const sagas = [
  takeLatest(
    preliquidationActions.getPreliquidationsRequest.type,
    getPreliquidations
  ),
  takeLatest(
    preliquidationActions.getMorePreliquidationsRequest.type,
    getMorePreliquidations
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailRequest.type,
    getInvoiceDetail
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailSaveRequest.type,
    putSaveDetailInvoice
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailApproveRequest.type,
    patchApproveDetailInvoice
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailDeleteRequest.type,
    putDeleteDetailInvoice
  ),
  takeLatest(
    preliquidationActions.uploadInvoiceFile.type,
    uploadInvoiceFile
  ),
  takeLatest(
    preliquidationActions.deleteInvoiceFileRequest.type,
    deleteInvoiceFile
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailTypesRequest.type,
    getDetailInvoiceTypes
  ),
];

export default sagas;

const process = (body:DetailPreliquidationBodyParamsType)=>{

  return{
    ...body,
    emisionDate: moment(body.emisionDate,DATE_FORMATS.shortDate).format(DATE_FORMATS.shortISODate),
  }
}

function* getPreliquidations({
  payload,
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PreliquidationsApiResponse>>
  | PutEffect<{ type: string }>,
  void,
  PreliquidationsApiResponse
> {
  const response = yield call(
    preliquidationsMiddleware.getPreliquidations,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getPreliquidationsError());
  } else {
    yield put(preliquidationActions.getPreliquidationsSuccess(response.data));
  }
}

function* getMorePreliquidations({
  payload,
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PreliquidationsApiResponse>>
  | PutEffect<{ type: string }>,
  void,
  PreliquidationsApiResponse
> {
  const response = yield call(
    preliquidationsMiddleware.getPreliquidations,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getMorePreliquidationsError());
  } else {
    const {
      result: { items },
      ...rest
    } = response.data;
    yield put(
      preliquidationActions.getMorePreliquidationsSuccess({ items, ...rest })
    );
  }
}

function* getInvoiceDetail({
  payload,
}: PayloadAction<string | undefined>): Generator<
  | PutEffect<{
      payload: DetailPreliquidationsContentResponseType;
      type: string;
    }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsContentResponseType>>,
  void,
  DetailPreliquidationsApiResponseType
> {
  const response = yield call(
    preliquidationsMiddleware.getDetailInvoice,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getInvoiceDetailSuccess(result));
  }
}

function* putSaveDetailInvoice({
  payload,
}: PayloadAction<detailPreliquidationDatePicker>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  let result: DetailPreliquidationBodyParamsType = {
    emisionDate: payload.emisionDate?.from,
    invoiceType: payload.invoiceType,
    invoiceNumber: payload.invoiceNumber,
    salePoint: payload.salePoint,
    caeNumber: payload.caeNumber,
  };
  result = process(result)

  const response = yield call(
    preliquidationsMiddleware.putSaveDetailInvoice,
    payload.presettementId,
    result
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailSaveError());
  } else {
    yield put(preliquidationActions.getInvoiceDetailSaveSuccess());
  }
}

function* patchApproveDetailInvoice({
  payload,
}: PayloadAction<detailPreliquidationDatePicker>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  let result: DetailPreliquidationBodyParamsType = {
    emisionDate: payload.emisionDate?.from,
    invoiceType: payload.invoiceType,
    invoiceNumber: payload.invoiceNumber,
    salePoint: payload.salePoint,
    caeNumber: payload.caeNumber,
  };
  result = process(result)

  const response = yield call(
    preliquidationsMiddleware.patchApproveDetailInvoice,
    payload.presettementId,
    result
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailApproveError());
  } else {
    yield put(preliquidationActions.getInvoiceDetailApproveSuccess());
  }
}

function* putDeleteDetailInvoice({
  payload,
}: PayloadAction<detailPreliquidationDatePicker>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  const response = yield call(
    preliquidationsMiddleware.putDeleteDetailInvoice,
    payload.presettementId
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailDeleteError());
  } else {
    yield put(preliquidationActions.getInvoiceDetailDeleteSuccess());
  }
}

function* uploadInvoiceFile({
  payload,
}: PayloadAction<UploadInvoiceFileMiddlewareType>): Generator<
  | PutEffect<{ payload: string; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<ApiResponse<void>>>,
  void,
  ApiResponse<void>
> {
 
  const response = yield call(
    preliquidationsMiddleware.uploadInvoiceFile, payload);
  if (response.status !== 200) {
    yield put(preliquidationActions.uploadInvoiceFileError());
  } else {
    yield put(preliquidationActions.uploadInvoiceFileSuccess(payload.content));
  }
}

function* deleteInvoiceFile({
  payload,
}: PayloadAction<number>): Generator<
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<ApiResponse<void>>>,
  void,
  ApiResponse<void>
> {
 
  const response = yield call(
    preliquidationsMiddleware.deleteInvoiceFile, payload);
  if (response.status !== 200) {
    yield put(preliquidationActions.deleteInvoiceFileError());
  } else {
    yield put(preliquidationActions.deleteInvoiceFileSuccess());
  }
}

function* getDetailInvoiceTypes(): Generator<
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceTypesApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceTypesApiResponseType
> {
  const response = yield call(preliquidationsMiddleware.getDetailInvoiceTypes);
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailTypesError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getInvoiceDetailTypesSuccess(result));
  }
}
