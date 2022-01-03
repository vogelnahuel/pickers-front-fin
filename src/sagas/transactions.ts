import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import i18next from "i18next";
import * as transactionsMiddleware from "middleware/transactions";
import { actions as notificationActions } from "reducers/notification";
import { actions } from "reducers/transactions";
import { NotificationStateType } from "reducers/types/notification";
import { GetTransactionsSuccessType } from "reducers/types/transaction";
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import createCSV from "utils/createCSV";
import {
  FilterTransactionsType,
  TransactionResponseContent,
  TransactionsExportContentType,
} from "./types/transactions";

const sagas: ForkEffect<never>[] = [
  takeLatest(actions.getTransactionsRequest.type, getTransactions),
  takeLatest(actions.getTransactionsExportRequest.type, getTransactionsExport),
  takeLatest(actions.getMoreTransactionsRequest.type, getMoreTransactions),
];

export default sagas;

function* getTransactions({
  payload,
}: PayloadAction<FilterTransactionsType>): Generator<
  | CallEffect<AxiosResponse<TransactionResponseContent>>
  | PutEffect<{ type: string; content: NotificationStateType }>
  | PutEffect<{ type: string; transactions: GetTransactionsSuccessType }>
  | PutEffect<{ type: string }>,
  void,
  TransactionResponseContent
> {
  delete payload["date"];
  const response = yield call(transactionsMiddleware.getTransactions, payload);
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
            limit: 0,
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
        payload.pickerId ||
          payload.transactionCode ||
          payload.minMinDeliveryDate
      )
    );
    yield put(
      actions.getTransactionsSuccess({
        items,
        limit,
        offset,
        hasMore,
      })
    );
  }
}

function* getMoreTransactions({
  payload,
}: PayloadAction<FilterTransactionsType>): Generator<
  | CallEffect<AxiosResponse<TransactionResponseContent>>
  | PutEffect<{ type: string }>,
  void,
  TransactionResponseContent
> {
  delete payload["date"];
  const response = yield call(transactionsMiddleware.getTransactions, payload);

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
      actions.getMoreTransactionsSuccess({
        items,
        limit,
        offset,
        hasMore,
      })
    );
  }
}

function* getTransactionsExport({
  payload,
}: PayloadAction<FilterTransactionsType>): Generator<
  | CallEffect<AxiosResponse<TransactionsExportContentType>>
  | PutEffect<{ type: string; payload: NotificationStateType }>
  | PutEffect<{ type: string; payload: undefined }>,
  void,
  TransactionsExportContentType
> {
  const response = yield call(
    transactionsMiddleware.getTransactionsExport,
    payload
  );
  if (response.status !== 200) {
    yield put(actions.getTransactionsExportError());
  } else {
    createCSV(response.data, "transactions");
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
      })
    );
    yield put(actions.getTransactionsExportSuccess());
  }
}
