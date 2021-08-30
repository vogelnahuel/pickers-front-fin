import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/transactions";
// import { actions as notificationActions } from "reducers/notification";
import * as transactionsMiddleware from "middleware/transactions";
import createCSV from "tools/createCSV";

const sagas = [
    takeLatest(types.TRANSACTIONS_GET_REQUEST, getTransactions),
    takeLatest(types.TRANSACTIONS_EXPORT_REQUEST, getTransactionsExport),
];

export default sagas;

function* getTransactions({ params }) {
    const response = yield call(
        transactionsMiddleware.getTransactions,
        params
    );
    if (response.status !== 200) {
        yield put(actions.getTransactionsError());
    } else {
        const { result: {items}, limit, offset } = response.data;
        yield put(actions.getTransactionsSuccess({ items, limit, offset }));
    }

}

function* getTransactionsExport({ params }) {
    const response = yield call(
        transactionsMiddleware.getTransactionsExport,
        params
    );
    if (response.status !== 200) {
        yield put(actions.getTransactionsExportError());
    } else {
        createCSV(response);
        yield put(actions.getTransactionsExportSuccess());
    }
}
