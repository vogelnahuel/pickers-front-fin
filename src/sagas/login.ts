import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { actions, types } from "../reducers/login";
import * as loginMiddleware from "../middleware/login";
import { removeItem, saveValue } from "../utils/localStorage";
import { CallHistoryMethodAction, replace } from "connected-react-router";
import { actions as notificationActions } from "../reducers/notification";
import { getLoginType } from "./types/login";
import { ILoginResponse } from "./types/types";
import { AxiosResponse } from "axios";
const sagas = [
  takeLatest(types.LOGIN_GET_REQUEST, getLogin),
  takeLatest(types.LOGOUT, logout),
  takeLatest(types.LOGIN_EMAIL_GET_REQUEST, getLoginEmail),

];

export default sagas;

//yield , retorno , recibe
function* getLogin({
  params,
  element,
}: getLoginType): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>
  | CallEffect<void>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLogin, params);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 400:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error de conexión",
            body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
            element,
          })
        );

        break;
      case 10005:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Usuario y/o contraseña inválidos",
            body: "Tu usuario y/o contraseña ingresados son incorrectos. Por favor, ingresalos nuevamente.",
            element,
          })
        );

        break;

      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error de conexión",
            body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
            element,
          })
        );

        break;
    }
    yield put(actions.getLoginError());
  } else {
    const { result } = response.data;
    yield call(loginMiddleware.setAuthToken, result.accessToken);
    saveValue("token", result.accessToken);
    yield put(replace("/dashboard"));
    yield put(actions.getLoginSuccess());
  }
}

function* logout(): Generator<
  PutEffect<CallHistoryMethodAction<[string, unknown?]>>,
  void,
  void
> {
  removeItem("token");
  yield put(replace("/"));
}

function* getLoginEmail({ params, element}: getLoginType):any{
  const response = yield call(loginMiddleware.getLoginEmail, params);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 400:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error de conexión",
            body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
            element,
          })
        );

        break;
      case 10005:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Usuario y/o contraseña inválidos",
            body: "Tu usuario y/o contraseña ingresados son incorrectos. Por favor, ingresalos nuevamente.",
            element,
          })
        );

        break;

      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error de conexión",
            body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
            element,
          })
        );

        break;
    }
    yield put(actions.getLoginEmailError());
  } else {
    
    yield put(
      notificationActions.showNotification({
        level: "warning",
        title: "Enviamos un correo a tu email",
        body: "Ingresá al mismo para restaurar tu contraseña",
        element,
      })
    );
    yield put(replace("/"));
    yield put(actions.getLoginEmailSuccess());
  }

}