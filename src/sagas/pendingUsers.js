import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/PendingUser";
// import { actions as notificationActions } from "reducers/notification";
import * as pendingMiddleware from "middleware/pendingUser";

const sagas = [takeLatest(types.PENDING_USER_GET_REQUEST, getPendingUser)];

export default sagas;

function* getPendingUser({ params }) {
    const response = yield call(
        pendingMiddleware.getPendingUser,
        params
        );
    if (response.type === "W") {
        yield put(actions.getPendingUserError());
    } else {
        const { items } = response.data.result;
        yield put(actions.getPendingUserSuccess(items));
    }

}
