import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import * as preliquidationsMiddleware from "../middleware/preliquidations";

import { actions as preliquidationActions } from "../reducers/preliquidation";
import {
  DetailPreliquidationsApiResponseType,
  DetailPreliquidationsContentResponseType,
  PreliquidationParamsMiddlewareType,
  PreliquidationsApiResponse,
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
];

export default sagas;

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
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
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
}: PayloadAction<any>): Generator<
  | PutEffect<{ payload: any; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<any>>,
  void,
  any
> {
  const id =0;
  const response = yield call(
    preliquidationsMiddleware.putSaveDetailInvoice,
    id,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailSaveError());
  } else {

    yield put(preliquidationActions.getInvoiceDetailSaveSuccess());
  }
}

function* patchApproveDetailInvoice({
  payload,
}: PayloadAction<any>): Generator<
  | PutEffect<{ payload: any; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<any>>,
  void,
  any
> {
  const id =0;
  const response = yield call(
    preliquidationsMiddleware.patchApproveDetailInvoice,
    id,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailApproveError());
  } else {

    yield put(preliquidationActions.getInvoiceDetailApproveSuccess());
  }
}

function* putDeleteDetailInvoice({
  payload,
}: PayloadAction<any>): Generator<
  | PutEffect<{ payload: any; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<any>>,
  void,
  any
> {
  const response = yield call(
    preliquidationsMiddleware.putDeleteDetailInvoice,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailDeleteError());
  } else {
    yield put(preliquidationActions.getInvoiceDetailDeleteSuccess());
  }
}
