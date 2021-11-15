import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as transactionsMiddleware from "middleware/transactions";
import { actions } from "reducers/detailTransaction";
import { actions as transactionActions } from "reducers/transactions";
import {
  call, CallEffect, ForkEffect, put, PutEffect, takeLatest
} from "redux-saga/effects";
import {
  DetailTransactionResponseType, DevolutionUndeliveredResponseType,
  postCancelType, postDevolutionUndeliveredType, postDnideliveredResponseType, TransactionCancelResponseType
} from "./types/detailTransactions";

const sagas: ForkEffect<never>[] = [
  takeLatest(actions.getDetailTransactionRequest.type, getDetailTransaction),
  takeLatest(actions.getDetailTransactionMenssagesRequest.type, getMessages),
  takeLatest(actions.getDetailTransactionDevolutionUndeliveredRequest.type,
    postDevolutionUndelivered
  ),
  takeLatest(actions.getDetailTransactionReasonsCanceledRequest.type,
    postReasonsCanceled
  ),
  takeLatest(actions.getDetailTransactionFinishReturnedRequest.type,
    postFinishReturned
  ),
  takeLatest(actions.getDetailTransactionFinishLostRequest.type, postFinishLost),
  takeLatest(actions.getDetailTransactionDniDeliveredRequest.type, postDnidelivered),
];

function* getDetailTransaction({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<AxiosResponse<DetailTransactionResponseType>>
  | PutEffect<{ type: string }>,
  void,
  DetailTransactionResponseType
> {
  const response = yield call(transactionsMiddleware.getDetailTransaction, payload);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}

function* getMessages({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<AxiosResponse<TransactionCancelResponseType>>
  | PutEffect<{ type: string }>,
  void,
  TransactionCancelResponseType
> {
  const response = yield call(transactionsMiddleware.getMessages, payload);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionMenssagesError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionMenssagesSuccess(result.items));
  }
}

function* postDevolutionUndelivered({
  payload
}: PayloadAction<{id: string,params: postDevolutionUndeliveredType}>): Generator<
  | CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>
  | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const paramsPost: postDevolutionUndeliveredType = {
    impossibleDeliveryReasonId: Number(payload.params),
  };
  const response = yield call(
    transactionsMiddleware.postDevolutionUndelivered,
    paramsPost,
    payload.id
  );
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionDevolutionUndeliveredError());
  } else {
    yield put(transactionActions.getDetailTransactionDevolutionUndeliveredSuccess());
  }
}

function* postReasonsCanceled({
  payload
}: PayloadAction<{id: string,params: postCancelType}>): Generator<
  | CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>
  | PutEffect<{ type: string }>
  | void,
  void,
  DevolutionUndeliveredResponseType
> {
  const paramsPost: postCancelType = {
    cancellationReasonId: parseInt(payload.params + ""),
  };

  const response = yield call(
    transactionsMiddleware.postReasonsCanceled,
    paramsPost,
    payload.id
  );
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionReasonsCanceledError());
  } else {
    yield window.location.reload();
    yield put(transactionActions.getDetailTransactionReasonsCanceledSuccess());
  }
}

function* postFinishReturned({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>
  | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postFinishReturned, payload);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionFinishReturnedError());
  } else {
    yield put(transactionActions.getDetailTransactionFinishReturnedSuccess());
  }
}

function* postFinishLost({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>
  | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postFinishLost, payload);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionFinishLostError());
  } else {
    yield put(transactionActions.getDetailTransactionFinishLostSuccess());
  }
}

function* postDnidelivered({
  payload
}: PayloadAction<{id: string, params: postDnideliveredResponseType}>): Generator<
  | CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>
  | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(
    transactionsMiddleware.postDnidelivered,
    payload.params,
    payload.id
  );
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionDniDeliveredError());
  } else {
    yield put(transactionActions.getDetailTransactionDniDeliveredSuccess());
  }
}

export default sagas;
