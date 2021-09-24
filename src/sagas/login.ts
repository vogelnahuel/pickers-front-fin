import {call, put, takeLatest} from "redux-saga/effects";
import {actions, types} from "../reducers/login";
import * as loginMiddleware from "../middleware/login";
import {removeItem, saveValue} from "../utils/localStorage";
import {replace} from 'connected-react-router';

const sagas = [
    takeLatest(types.LOGIN_GET_REQUEST, getLogin),
    takeLatest(types.LOGOUT, logout)
];

export default sagas;

function* getLogin({params}:any):any {

            const response = yield call(
                loginMiddleware.getLogin,
                params
            )

            if (response.status !== 200) {
                switch (response.status) {
                    case 400:
                        yield put(actions.setModalOpen(true));
                        yield put(actions.getLoginError());
                        break;
                    case 403:
                        yield put(actions.setModalOpen(true));
                        yield put(actions.getLoginError());
                        break;
                    
                    default:
                        yield put(actions.setmodalOpenServerError(true));
                        yield put(actions.getLoginError());
                        break;
                }
                
            } else {
                const {result} = response.data;
                yield call(loginMiddleware.setAuthToken, result.accessToken);
                saveValue("token", result.accessToken);
                yield put(replace("/dashboard"));
                yield put(actions.getLoginSuccess(result));
            }
       
}

function* logout(){
    removeItem("token")
    yield put(replace("/"));
}
