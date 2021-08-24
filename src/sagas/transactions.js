import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/transactions";
import { actions as notificationActions } from "reducers/notification";
import * as transactionsMiddleware from "middleware/petersen/pdfMaker";

const sagas = [takeLatest(types.TRANSACTIONS_GET_REQUEST, getTransactions)];

export default sagas;

function* getTransactions({ params }) {
    const response = yield call(
        transactionsMiddleware.getTransactions,
        params
    );
    if (response.type === "W") {
        yield put(actions.getTransactionsError());
    } else {
        const { transactions } = response.data.data;
        yield put(actions.getTransactionsSuccess(transactions));
    }
}
