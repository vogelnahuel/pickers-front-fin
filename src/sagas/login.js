import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/login";
// import { actions as notificationActions } from "reducers/notification";
import * as loginMiddleware from "middleware/login";
import { replace } from "react-router-redux";
import { saveValue } from "utils/localStorage";

const sagas = [
    takeLatest(types.LOGIN_GET_REQUEST, getLogin)
];

export default sagas;

function* getLogin({params}) {

    
    const response = yield call(
        loginMiddleware.getLogin,
        params
    );


    if (response.type === "W") {
       

        yield put(actions.getLoginError());

    } else {

        const { result } = response.data;
        saveValue("token",result.accessToken);
        window.location.href= "/dashboard"  //implementar react redux router
        yield put(actions.getLoginSuccess(result));
    }

}
