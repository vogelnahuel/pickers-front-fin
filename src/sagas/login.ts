import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { actions, types } from "../reducers/login";
import * as loginMiddleware from "../middleware/login";
import { removeItem, saveValue } from "../utils/localStorage";
import { CallHistoryMethodAction, replace } from "connected-react-router";
import { actions as notificationActions } from "../reducers/notification";
import {
  getLoginEmailType,
  getLoginType,
  getRestoreType,
  ILoginResponse,
  LoginEmailTypeResponse,
  RestoreEmailResponse,
} from "./types/login";
import { AxiosResponse } from "axios";

const sagas: ForkEffect<never>[] = [
  takeLatest(types.LOGIN_GET_REQUEST, getLogin),
  takeLatest(types.LOGOUT, logout),
  takeLatest(types.LOGIN_EMAIL_GET_REQUEST, getLoginEmail),
  takeLatest(types.LOGIN_RESTORE_GET_REQUEST, getLoginRestore),
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
    yield put(actions.getLoginError());
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
      case 403:
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
            title: "Error en nuestro servidor",
            body: "Por favor, reintentalo nuevamente.",
            element,
          })
        );
        break;
    }
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

function* getLoginEmail({
  params,
  element,
}: getLoginEmailType): Generator<
  | CallEffect<AxiosResponse<LoginEmailTypeResponse>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<CallHistoryMethodAction<[string, unknown?]>>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLoginEmail, params);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 400:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: "Enviamos un correo a tu email",
            body: "Ingresá al mismo para restaurar tu contraseña",
            element,
          })
        );
        break;
      case 403:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: "Enviamos un correo a tu email",
            body: "Ingresá al mismo para restaurar tu contraseña",
            element,
          })
        );
        break;
      case 404:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: "Enviamos un correo a tu email",
            body: "Ingresá al mismo para restaurar tu contraseña",
            element,
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error en nuestro servidor",
            body: "Por favor, reintentalo nuevamente.",
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

function* getLoginRestore({
  params,
  element,
}: getRestoreType): Generator<
  | CallEffect<AxiosResponse<RestoreEmailResponse>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<CallHistoryMethodAction<[string, unknown?]>>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLoginRestore, params);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 10003:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Código de verificación vencido",
            body: "Se venció el plazo de recuperación de tu contraseña. Solicitala nuevamente",
            element,
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: "Error en nuestro servidor",
            body: "Por favor, reintentalo nuevamente.",
            element,
          })
        );
        break;
    }
    yield put(actions.getLoginREstoreError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Restauraste tu contraseña exitosamente",
        body: "Ya podés ingresar con tu nueva contraseña.",
        element,
      })
    );
    yield put(replace("/"));
    yield put(actions.getLoginRestoreSuccess());
  }
}
