import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import { actions } from "reducers/pickers";
import { actions as detailPickerActions } from "../reducers/detailPicker";
import { actions as notificationActions } from "../reducers/notification";

import createCSV from ".,/../../src/utils/createCSV";
import * as pickersMiddleware from "../middleware/pickers";
import { goBack } from "connected-react-router";
import {
  getPickersType,
  PickerResponseType,
  PickerExportType,
  ParamGetPendingUser,
  PostEditPickerType,
  CsvResponseType,
  PickersResponseType,
} from "./types/pickers";
import {
  AcountDataType,
  EditPickerResponseType,
  ParamsMiddlewareType,
  PhoneType,
  PickersAxiosResponseType,
  PickersExportResponseType,
  PickersResponse,
  PickerType,
  StatusType,
} from "../pages/pickers/types";
import { AxiosResponse } from "axios";
import i18next from "i18next";
import { DATE_FORMATS } from "utils/constants";

const sagas = [
  takeLatest(actions.getPendingUserRequest.type, getPickers),
  takeLatest(actions.getPendingUserExportRequest.type, getPendingUserExport),
  takeLatest(actions.getMorePendingUserRequest.type, getMorePendingUser),
  takeLatest(
    detailPickerActions.getPendingUserPickerRequest.type,
    getPendingUserPicker
  ),
  takeLatest(
    detailPickerActions.getPendingUserPickerExportRequest.type,
    getPendingUserPickerExport
  ),
  takeLatest(
    detailPickerActions.getPendingUserPickerDocumentsEditRequest.type,
    postPendingUserDocumentsEdit
  ),
  takeLatest(detailPickerActions.getAprovePickerRequest.type, postAprovePicker),
  takeLatest(detailPickerActions.getEditPickerRequest.type, postEditPicker),
];

export default sagas;

const process = (body: //TODO: vehiculos any?
{
  accountingData: AcountDataType;
  dateOfBirth: string;
  email: string;
  enable: boolean;
  expirationDatePolicyPersonal: string;
  id: number;
  identificationNumber: string;
  name: string;
  phone: PhoneType;
  registerDate: string;
  status: StatusType;
  surname: string;
  vehicle: any;
  vehicleType: string;
}) => {
  return {
    ...body,
    dateOfBirth: moment(body.dateOfBirth, DATE_FORMATS.shortDate).format(
      DATE_FORMATS.shortISODate
    ),
    accountingData: {
      ...body.accountingData,
      fiscalNumber:
        body.accountingData.fiscalNumber.slice(0, 2) +
        body.accountingData.fiscalNumber.slice(5, 13) +
        body.accountingData.fiscalNumber.slice(16, 17),
    },
    vehicle: {
      ...body.vehicle,
      [body.vehicleType]: {
        ...body.vehicle[body.vehicleType],
        expirationDatePolicyVehicle:
          body.vehicle[body.vehicleType].expirationDatePolicyVehicle &&
          body.vehicle[body.vehicleType].expirationDatePolicyVehicle.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
                body.vehicle[body.vehicleType].expirationDatePolicyVehicle,
                DATE_FORMATS.shortDate
              ).format(DATE_FORMATS.shortISODate)
            : body.vehicle[body.vehicleType].expirationDatePolicyVehicle,
        expirationDateIdentificationVehicle:
          body.vehicle[body.vehicleType].expirationDateIdentificationVehicle &&
          body.vehicle[
            body.vehicleType
          ].expirationDateIdentificationVehicle.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
                body.vehicle[body.vehicleType]
                  .expirationDateIdentificationVehicle,
                DATE_FORMATS.shortDate
              ).format(DATE_FORMATS.shortISODate)
            : body.vehicle[body.vehicleType]
                .expirationDateIdentificationVehicle,
        expirationDateDriverLicense:
          body.vehicle[body.vehicleType].expirationDateDriverLicense &&
          body.vehicle[body.vehicleType].expirationDateDriverLicense.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
                body.vehicle[body.vehicleType].expirationDateDriverLicense,
                DATE_FORMATS.shortDate
              ).format(DATE_FORMATS.shortISODate)
            : body.vehicle[body.vehicleType].expirationDateDriverLicense,
        expirationDatePolicyPersonal:
          body.vehicle[body.vehicleType].expirationDatePolicyPersonal &&
          body.vehicle[body.vehicleType].expirationDatePolicyPersonal.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
                body.expirationDatePolicyPersonal,
                DATE_FORMATS.shortDate
              ).format(DATE_FORMATS.shortISODate)
            : body.expirationDatePolicyPersonal,
      },
    },
  };
};
function* getPickers({
  payload,
}: PayloadAction<ParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PickersAxiosResponseType>>
  | PutEffect<{ type: string; pendingUsers: PickersResponse }>
  | PutEffect<{ type: string }>,
  void,
  PickersResponseType
> {
  const response = yield call(pickersMiddleware.getPickers, payload);
  if (response.status !== 200) {
    yield put(actions.getPendingUserError());
  } else {
    const {
      result: { items },
      ...rest
    } = response.data;
    yield put(actions.getPendingUserSuccess({ items, ...rest }));
  }
}

function* getMorePendingUser({
  payload,
}: PayloadAction<ParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PickersAxiosResponseType>>
  | PutEffect<{ type: string }>,
  void,
  PickersResponseType
> {
  const response = yield call(pickersMiddleware.getPickers, payload);
  if (response.status !== 200) {
    yield put(actions.getPendingUserError());
  } else {
    const {
      result: { items },
      ...rest
    } = response.data;
    yield put(actions.getMorePendingUserSuccess({ items, ...rest }));
  }
}

function* getPendingUserPicker({
  params,
}: ParamGetPendingUser): Generator<
  CallEffect<AxiosResponse<PickerType>> | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  const response = yield call(pickersMiddleware.getPicker, params);
  if (response.status !== 200) {
    yield put(detailPickerActions.getPendingUserPickerError());
  } else {
    const { result } = response.data;
    yield put(detailPickerActions.getPendingUserPickerSuccess(result));
    yield put(
      actions.setActualPage(
        result.status.id === 4 || result.status.id === 5 ? "ACTIVE" : "PENDING"
      )
    );
  }
}

function* getPendingUserExport({
  params,
  element,
}: getPickersType): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  const response = yield call(pickersMiddleware.getPickersExport, params);

  if (response.status !== 200) {
    yield put(actions.getPendingUserExportError());
  } else {
    createCSV(response.data);
    yield put(actions.getPendingUserExportSuccess());
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
        element,
      })
    );
  }
}

function* getPendingUserPickerExport({
  params,
  element,
}: PickerExportType): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  const response = yield call(pickersMiddleware.getPickerExport, params);
  if (response.status !== 200) {
    yield put(detailPickerActions.getPendingUserPickerExportError());
  } else {
    createCSV(response.data);
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
        element,
      })
    );
    yield put(detailPickerActions.getPendingUserPickerExportSuccess());
  }
}

function* postPendingUserDocumentsEdit({
  payload: { params, element },
}: PayloadAction<PostEditPickerType>): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  let body = process(params);
  const response = yield call(pickersMiddleware.postPickerDocumentsEdit, body);

  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: i18next.t("global:title.modal.connectionError"),
        body: i18next.t("global:label.modal.connectionError"),
        element,
      })
    );
    yield put(detailPickerActions.getPendingUserPickerDocumentsEditError());
  } else {
    yield put(goBack());
    yield put(
      detailPickerActions.getPendingUserPickerDocumentsEditSuccess(body)
    );
  }
}

function* postAprovePicker({
  params,
  goBack,
  element,
}: PostEditPickerType): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  let body = process(params);
  const response = yield call(pickersMiddleware.postAprovePicker, body);
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: i18next.t("global:title.modal.connectionError"),
        body: i18next.t("global:label.modal.connectionError"),
        element,
      })
    );
    yield put(detailPickerActions.getAprovePickerError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("detailPicker:title.modal.approved"),
        body: i18next.t("detailPicker:label.modal.approved"),
        onClick: goBack,
        element,
      })
    );
    yield put(detailPickerActions.getAprovePickerSuccess(body));
  }
}

function* postEditPicker({
  params,
  goBack,
  element,
}: PostEditPickerType): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  let body = process(params);
  const response = yield call(pickersMiddleware.postEditPicker, body);
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: i18next.t("global:title.modal.connectionError"),
        body: i18next.t("global:label.modal.connectionError"),
        element,
      })
    );
    yield put(detailPickerActions.getEditPickerError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.changesSaved"),
        body: i18next.t("global:label.modal.changesSaved"),
        onClick: goBack,
        element,
      })
    );
    yield put(detailPickerActions.getEditPickerSuccess(body));
  }
}
