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
import { getLoginType, ILoginResponse } from "./types/login";
import { AxiosResponse } from "axios";

const sagas = [
  takeLatest(types.LOGIN_GET_REQUEST, getLogin),
  takeLatest(types.LOGOUT, logout),
];

export default sagas;

function* getLogin({
  params,
  element,
}: getLoginType): Generator<
  | CallEffect<AxiosResponse<ILoginResponse>>
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
