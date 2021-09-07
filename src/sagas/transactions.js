import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/transactions";
import * as transactionsMiddleware from "middleware/transactions";
import createCSV from "../utils/createCSV";

const sagas = [
    takeLatest(types.TRANSACTIONS_GET_REQUEST, getTransactions),
    takeLatest(types.TRANSACTIONS_EXPORT_REQUEST, getTransactionsExport),
    takeLatest(types.TRANSACTIONS_GET_MORE_REQUEST, getMoreTransactions),
];

export default sagas;

function* getTransactions({ params }) {
    const response = yield call(
        transactionsMiddleware.getTransactions,
        params
    );
    if (response.status !== 200) {
       
        if(response.data.statusCode===20011){
            yield put(actions.setOpenErrorDatePicker(true));
        }
        yield put(actions.getTransactionsError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(actions.getTransactionsSuccess({ items, limit, offset, hasMore }));
    }

}
function* getMoreTransactions({ params }) {
    const response = yield call(
        transactionsMiddleware.getTransactions,
        params
    );
    if (response.status !== 200) {
        yield put(actions.getTransactionsError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(actions.getMoreTransactionsSuccess({ items, limit, offset, hasMore }));
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
