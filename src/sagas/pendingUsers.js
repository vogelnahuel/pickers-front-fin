import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/PendingUser";
import * as pendingMiddleware from "middleware/pendingUser";
import createCSV from "tools/createCSV";

const sagas = [takeLatest(types.PENDING_USER_GET_REQUEST, getPendingUser),
    takeLatest(types.PENDING_USER_EXPORT_GET_REQUEST, getPendingUserExport),
    takeLatest(types.PENDING_USER_GET_MORE_REQUEST, getMorePendingUser)];

export default sagas;

function* getPendingUser({ params }) {
    const response = yield call(
        pendingMiddleware.getPendingUser,
        params
        );
    if (response.status !== 200) {
        yield put(actions.getPendingUserError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(actions.getPendingUserSuccess({ items, limit, offset, hasMore }));
    }
}

function* getMorePendingUser({ params }) {
    const response = yield call(
        pendingMiddleware.getPendingUser,
        params
        );
    if (response.status !== 200) {
        yield put(actions.getPendingUserError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(actions.getMorePendingUserSuccess({ items, limit, offset, hasMore }));
    }
}


function* getPendingUserExport({ params }) {
    const response = yield call(
        pendingMiddleware.getPendingUserExport,
        params
    );

    if (response.status !== 200) {
        yield put(actions.getPendingUserExportError());
    } else {
        createCSV(response)
        yield put(actions.getPendingUserSuccess(response));
    }  
}
