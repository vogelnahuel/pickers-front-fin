import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { CallHistoryMethodAction, replace } from "connected-react-router";
import i18next from "i18next";
import { LoginType } from "pages/login/types";
import { RestorePasswordActionsTypes } from "reducers/types/login";
import { NotificationStateType } from "reducers/types/notification";
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import * as loginMiddleware from "../middleware/login";
import { actions } from "../reducers/login";
import { actions as notificationActions } from "../reducers/notification";
import { removeItem, saveValue } from "../utils/localStorage";
import {
  EmailType,
  ILoginResponse,
  LoginEmailTypeResponse,
  RestoreEmailResponse,
} from "./types/login";

const sagas: ForkEffect<never>[] = [
  takeLatest(actions.getLoginRequest.type, getLogin),
  takeLatest(actions.logout.type, logout),
  takeLatest(actions.getLoginEmailRequest.type, getLoginEmail),
  takeLatest(actions.getLoginRestoreRequest.type, getLoginRestore),
];

export default sagas;

function* getLogin({
  payload,
}: PayloadAction<LoginType>): Generator<
  | CallEffect<AxiosResponse<ILoginResponse>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>
  | CallEffect<void>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLogin, payload);

  if (response.status !== 200) {
    yield put(actions.getLoginError());
    switch (response.data.statusCode) {
      case 400:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.connectionError"),
            body: i18next.t("global:label.modal.connectionError"),
          })
        );
        break;
      case 10005:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("login:title.modal.invalid"),
            body: i18next.t("login:label.modal.invalid"),
          })
        );
        break;
      case 403:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("login:title.modal.invalid"),
            body: i18next.t("login:label.modal.invalid"),
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
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
  payload,
}: PayloadAction<EmailType>): Generator<
  | PutEffect<{ payload: NotificationStateType; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<LoginEmailTypeResponse>>
  | PutEffect<CallHistoryMethodAction<[string, unknown?]>>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLoginEmail, payload);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 400:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
          })
        );
        break;
      case 403:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
          })
        );
        break;
      case 404:
        yield put(
          notificationActions.showNotification({
            level: "warning",
            title: i18next.t("login:title.modal.restore"),
            body: i18next.t("login:label.modal.restore"),
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
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
      })
    );
    yield put(replace("/"));
    yield put(actions.getLoginEmailSuccess());
  }
}

function* getLoginRestore({
  payload,
}: PayloadAction<RestorePasswordActionsTypes>): Generator<
  | PutEffect<{ payload: undefined; type: string }>
  | PutEffect<{ payload: NotificationStateType; type: string }>
  | CallEffect<AxiosResponse<RestoreEmailResponse>>
  | PutEffect<CallHistoryMethodAction<[string, unknown?]>>,
  void,
  ILoginResponse
> {
  const response = yield call(loginMiddleware.getLoginRestore, payload);

  if (response.status !== 200) {
    switch (response.data.statusCode) {
      case 10003:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("login:title.modal.expiredCode"),
            body: i18next.t("login:label.modal.expiredCode"),
          })
        );
        break;
      default:
        yield put(
          notificationActions.showNotification({
            level: "error",
            title: i18next.t("global:title.modal.serverError"),
            body: i18next.t("global:label.modal.serverError"),
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
      })
    );
    yield put(replace("/"));
    yield put(actions.getLoginRestoreSuccess());
  }
}
