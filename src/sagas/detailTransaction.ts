import {
  call,
  takeLatest,
  put,
  CallEffect,
  PutEffect,
  ForkEffect,
} from "redux-saga/effects";
import { types, actions } from "reducers/detailTransaction";
import * as transactionsMiddleware from "middleware/transactions";
import {
  DetailTransactionResponseType,
  DetailTransactionSagasType,
  DevolutionUndeliveredResponseType,
  postCancelType,
  postDevolutionUndeliveredParamsType,
  postDniDeliveredParamsType,
  postReasonsCancelParamsType,
  TransactionCancelResponseType,
} from "./types/detailTransactions";
import { AxiosResponse } from "axios";
// import { replace } from "connected-react-router";


const sagas:ForkEffect<never>[] = [
  takeLatest(types.DETAIL_TRANSACTIONS_ID_REQUEST, getDetailTransaction),
  takeLatest(types.DETAIL_TRANSACTIONS_MENSSAGES_REQUEST, getMessages),
  takeLatest(types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST, postDevolutionUndelivered),
  takeLatest(types.DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST, postReasonsCanceled),
  takeLatest(types.DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST, postFinishReturned),
  takeLatest(types.DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST, postFinishLost),
  takeLatest(types.DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST, postDnidelivered),
];

function* getDetailTransaction({
  id,
}: DetailTransactionSagasType): Generator<
  CallEffect<AxiosResponse<DetailTransactionResponseType>> | PutEffect<{ type: string }> ,
  void,
  DetailTransactionResponseType
> {
  const response = yield call(transactionsMiddleware.getDetailTransaction, id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}

function* getMessages({
  id,
}: DetailTransactionSagasType): Generator<
  CallEffect<AxiosResponse<TransactionCancelResponseType>> | PutEffect<{ type: string }> ,
  void,
  TransactionCancelResponseType
> {
  const response = yield call(transactionsMiddleware.getMessages, id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionMenssagesError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionMenssagesSuccess(result.items));
  }
}

function* postDevolutionUndelivered({
  params,
  id
}: postDevolutionUndeliveredParamsType): Generator<
CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>> | PutEffect<{ type: string }> ,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postDevolutionUndelivered, params,id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}

function* postReasonsCanceled({
  params,
  id,
}: postReasonsCancelParamsType): Generator<
  CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>> | PutEffect<{ type: string }> ,
  void,
  DevolutionUndeliveredResponseType
> {

  const paramsPost:postCancelType={
    "cancellationReasonId":parseInt(params+"")
  }

 
  const response = yield call(transactionsMiddleware.postReasonsCanceled, paramsPost,id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    //yield put(replace("/transaction"));
    yield put(actions.getDetailTransactionSuccess(result));
    window.location.reload();
  }
}

function* postFinishReturned({
  id,
}: DetailTransactionSagasType): Generator<
  CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>> | PutEffect<{ type: string }> ,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postFinishReturned, id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}

function* postFinishLost({
  id,
}: DetailTransactionSagasType): Generator<
  CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>> | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postFinishLost, id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}
function* postDnidelivered({
  params,
  id
}: postDniDeliveredParamsType): Generator<
  CallEffect<AxiosResponse<DevolutionUndeliveredResponseType>>  | PutEffect<{ type: string }>,
  void,
  DevolutionUndeliveredResponseType
> {
  const response = yield call(transactionsMiddleware.postDnidelivered, params,id);
  if (response.status !== 200) {
    yield put(actions.getDetailTransactionError());
  } else {
    const { result } = response.data;
    yield put(actions.getDetailTransactionSuccess(result));
  }
}

export default sagas;
