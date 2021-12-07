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
import { DetailPreliquidationsApiResponseType, DetailPreliquidationsContentResponseType, PreliquidationParamsMiddlewareType, PreliquidationsApiResponse } from "./types/preliquidation";

const sagas = [
  takeLatest(
    preliquidationActions.getPreliquidationsRequest.type,
    getPreliquidations
  ),
  takeLatest(preliquidationActions.getMorePreliquidationsRequest.type,
    getMorePreliquidations)
    ,
  takeLatest(preliquidationActions.getDetailPreliquidationsRequest.type,
    getDetailPreliquidations)
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
  const response = yield call(preliquidationsMiddleware.getPreliquidations, payload);
  if (response.status !== 200) {
    yield put(preliquidationActions.getMorePreliquidationsError());
  } else {
    const {
      result: { items },
      ...rest
    } = response.data;
    yield put(preliquidationActions.getMorePreliquidationsSuccess({ items, ...rest }));
  }
}

function* getDetailPreliquidations({
  payload,
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
  | PutEffect<{ payload: DetailPreliquidationsContentResponseType; type: string; }>
  | PutEffect<{ payload: undefined; type: string; }>
  | CallEffect<AxiosResponse<DetailPreliquidationsContentResponseType>>,
  void,
  DetailPreliquidationsApiResponseType
> {
  const response = yield call(preliquidationsMiddleware.getDetailInvoice, payload);
  if (response.status !== 200) {
    yield put(preliquidationActions.getDetailPreliquidationsError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getDetailPreliquidationsSuccess(result));
  }
}