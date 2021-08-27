import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/dashboard";
// import { actions as notificationActions } from "reducers/notification";
import * as dashboardMiddleware from "middleware/dashboard";

const sagas = [takeLatest(types.DASHBOARD_GET_REQUEST, getDashboard)];

export default sagas;

function* getDashboard() {
   
    const response = yield call(
        dashboardMiddleware.getDashboard
    );
   
 
    if (response.type === "W") {
        yield put(actions.getDashboardError());
    } else {
        const { result } = response.data;
        yield put(actions.getDashboardSuccess(result));
    }

}
