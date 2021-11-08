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
import i18next from "i18next";

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
            title: i18next.t("global:title.modal.connectionError"),
            body: i18next.t("global:label.modal.connectionError"),
            element,
          })
        );
        break;
      case 10005:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("login:title.modal.invalid"),
            body: i18next.t("login:label.modal.invalid"),
            element,
          })
        );
        break;
      case 403:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("login:title.modal.invalid"),
            body: i18next.t("login:label.modal.invalid"),
            element,
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
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
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
            element,
          })
        );
        break;
      case 403:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
            element,
          })
        );
        break;
      case 404:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
            element,
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
            element,
          })
        );
        break;
    }
    yield put(replace("/"));
    yield put(actions.getLoginEmailError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "warning",
        title: i18next.t("login:title.modal.restore"),
        body: i18next.t("login:label.modal.restore"),
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
            title: i18next.t("login:title.modal.expiredCode"),
            body: i18next.t("login:label.modal.expiredCode"),
            element,
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
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
        title: i18next.t("login:title.modal.successfulRestore"),
        body: i18next.t("login:label.modal.successfulRestore"),
        element,
      })
    );
    yield put(replace("/"));
    yield put(actions.getLoginRestoreSuccess());
  }
}
