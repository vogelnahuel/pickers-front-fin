import {call, put, takeLatest} from "redux-saga/effects";
import {actions, types} from "../reducers/login";
import * as loginMiddleware from "../middleware/login";
import {removeItem, saveValue} from "../utils/localStorage";
import {replace} from 'connected-react-router';
import {actions as notificationActions} from "../reducers/notification";

const sagas = [
    takeLatest(types.LOGIN_GET_REQUEST, getLogin),
    takeLatest(types.LOGOUT, logout)
];

export default sagas;

function* getLogin({params,element}:any):any {

            const response = yield call(
                loginMiddleware.getLogin,
                params
            )
            if (response.status !== 200) {
                switch (response.data.statusCode) {
                    case 400:
                        yield put(notificationActions.showNotification(
                            {
                                level:"error",
                                title: "Error de conexión",
                                body:"Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
                                element
                            }
                        ));
                        yield put(actions.getLoginError());
                        break;
                    case 10005:
                        yield put(notificationActions.showNotification(
                            {
                                level:"error",
                                title: "Usuario y/o contraseña inválidos",
                                body:"Tu usuario y/o contraseña ingresados son incorrectos. Por favor, ingresalos nuevamente.",
                                element
                            }
                        ));
                        yield put(actions.getLoginError());
                        break;
                    
                    default:
                        yield put(notificationActions.showNotification(
                            {
                                level:"error",
                                title: "Error de conexión",
                                body:"Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
                                element
                            }
                        ));
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
