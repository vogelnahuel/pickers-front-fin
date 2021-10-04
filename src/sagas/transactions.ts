import {
  call,
  takeLatest,
  put,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { types, actions } from "reducers/transactions";
import * as transactionsMiddleware from "middleware/transactions";
import createCSV from "utils/createCSV";
import { actions as notificationActions } from "reducers/notification";
import {
  getExportType,
  getTransactionsExportContent,
  getTransactionType,
  transactionGetMoreType,
  TransactionResponseContent,
} from "./types/transactions";
import { AxiosResponse } from "axios";

const sagas = [
  takeLatest(types.TRANSACTIONS_GET_REQUEST, getTransactions),
  takeLatest(types.TRANSACTIONS_EXPORT_REQUEST, getTransactionsExport),
  takeLatest(types.TRANSACTIONS_GET_MORE_REQUEST, getMoreTransactions),
];

export default sagas;

function* getTransactions({
  params,
}: getTransactionType): Generator<
  | CallEffect<unknown>
  | CallEffect<AxiosResponse<any>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: any; transactions: any }>
  | PutEffect<{ type: any }>,
  void,
  TransactionResponseContent
> {
  console.log(params)
  const response = yield call(transactionsMiddleware.getTransactions, params);


  
  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 20011:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "El rango seleccionado es inválido",
            body: "Por favor, ingresá un rango menor a 31 días",
          })
        );
        break;
      case 20013:
        //yield put(actions.setExportEnabled());
        yield put(
          actions.getTransactionsSuccess({
            items: [],
            offset: 0,
            hasMore: false,
          })
        );
        break;

      default:
        break;
    }
    //yield put(actions.setExportEnabled());
    yield put(actions.getTransactionsError());
  } else {
    const {
      result: { items },
      limit,
      offset,
      hasMore,
    } = response.data;
    yield put(
      actions.setExportEnabled(
        params.pickerId || params.transactionCode || params.minMinDeliveryDate
      )
    );
    yield put(
      actions.getTransactionsSuccess({ items, limit, offset, hasMore })
    );
  }
}

function* getMoreTransactions({
  params,
}: transactionGetMoreType): Generator<
  CallEffect<AxiosResponse<any>> | PutEffect<{ type: any }>|CallEffect<unknown>,
  void,
  TransactionResponseContent
> {
  const response = yield call(transactionsMiddleware.getTransactions, params);

  console.log(response);
  if (response.status !== 200) {
    yield put(actions.getTransactionsError());
  } else {
    const {
      result: { items },
      limit,
      offset,
      hasMore,
    } = response.data;
    yield put(
      actions.getMoreTransactionsSuccess({ items, limit, offset, hasMore })
    );
  }
}

function* getTransactionsExport({
  params,
  element,
}: getExportType): Generator<
  CallEffect<AxiosResponse<any>> | PutEffect<{ type: any }>|CallEffect<unknown>,
  void,
  getTransactionsExportContent
> {
  const response = yield call(
    transactionsMiddleware.getTransactionsExport,
    params
  );
  if (response.status !== 200) {
    yield put(actions.getTransactionsExportError());
  } else {
    createCSV(response);
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Exportaste exitosamente",
        body: "El archivo se descargó correctamente",
        element,
      })
    );
    yield put(actions.getTransactionsExportSuccess());
  }
}
