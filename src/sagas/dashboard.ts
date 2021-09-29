import { call, takeLatest, put, CallEffect, PutEffect } from "redux-saga/effects";
import { types, actions } from "reducers/dashboard";
import * as dashboardMiddleware from "middleware/dashboard";
import { dashboardResponseType } from "./types/types";

const sagas = [takeLatest(types.DASHBOARD_GET_REQUEST, getDashboard)];

export default sagas;

function* getDashboard(): Generator<
CallEffect<unknown>|PutEffect<any>,
void,
dashboardResponseType
> {
    const response = yield call(
        dashboardMiddleware.getDashboard
    );
    if (response.status !== 200) {
        yield put(actions.getDashboardError());
    } else {
        const { result } = response.data;
        yield put(actions.getDashboardSuccess(result));
    }

}
