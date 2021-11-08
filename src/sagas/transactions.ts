import {
  call,
  takeLatest,
  put,
  CallEffect,
  PutEffect,
  ForkEffect,
} from "redux-saga/effects";
import { types, actions } from "reducers/transactions";
import * as transactionsMiddleware from "middleware/transactions";
import createCSV from "utils/createCSV";
import { actions as notificationActions } from "reducers/notification";
import {
  TransactionsExportContentType,
  TransactionsActionType,
  TransactionResponseContent,
} from "./types/transactions";
import { AxiosResponse } from "axios";
import { GetTransactionsSuccessType } from "reducers/types/transaction";
import i18next from "i18next";

const sagas: ForkEffect<never>[] = [
  takeLatest(types.TRANSACTIONS_GET_REQUEST, getTransactions),
  takeLatest(types.TRANSACTIONS_EXPORT_REQUEST, getTransactionsExport),
  takeLatest(types.TRANSACTIONS_GET_MORE_REQUEST, getMoreTransactions),
];

export default sagas;

function* getTransactions({
  params,
}: TransactionsActionType): Generator<
  | CallEffect<AxiosResponse<TransactionResponseContent>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string; transactions: GetTransactionsSuccessType }>
  | PutEffect<{ type: string }>,
  void,
  TransactionResponseContent
> {
  delete params["date"];
  const response = yield call(transactionsMiddleware.getTransactions, params);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 20011:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("transactions:title.modal.rangeExceeded"),
            body: i18next.t("transactions:label.modal.rangeExceeded"),
          })
        );
        break;
      case 20013:
        yield put(actions.setExportEnabled());
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
    yield put(actions.setExportEnabled());
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
}: TransactionsActionType): Generator<
  | CallEffect<AxiosResponse<TransactionResponseContent>>
  | PutEffect<{ type: string }>,
  void,
  TransactionResponseContent
> {
  delete params["date"];
  const response = yield call(transactionsMiddleware.getTransactions, params);

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
}: TransactionsActionType): Generator<
  | CallEffect<AxiosResponse<TransactionsExportContentType>>
  | PutEffect<{ type: string }>,
  void,
  TransactionsExportContentType
> {
  const response = yield call(
    transactionsMiddleware.getTransactionsExport,
    params
  );
  if (response.status !== 200) {
    yield put(actions.getTransactionsExportError());
  } else {
    createCSV(response.data);
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
        element,
      })
    );
    yield put(actions.getTransactionsExportSuccess());
  }
}
