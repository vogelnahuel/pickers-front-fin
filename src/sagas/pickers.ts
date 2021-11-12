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
  PostEditPickerType,
  CsvResponseType,
  PickersResponseType,
  PickerExportParamType,
} from "./types/pickers";
import {
  AcountDataType,
  EditPickerResponseType,
  ParamsMiddlewareType,
  FilesType,
  PersonalDataType,
  PickersAxiosResponseType,
  PickersExportResponseType,
  PickersResponse,
  PickerType,
  StatusType,
  VehicleType,
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

// export type PickerType = {
//   id: number;
//   enable: boolean,
//   registerDatetime: string,
//   status: StatusType;
//   personalData:  PersonalDataType;
//   accountingData:AcountDataType
//   vehicle: VehicleType ;
//   files:filesType
// };

const process = (body: //TODO: vehiculos any?
{
  id: number;
  enable: boolean;
  registerDatetime: string;
  status: StatusType;
  personalData: PersonalDataType;
  accountingData: AcountDataType;
  vehicle: VehicleType;
  files: FilesType;
}) => {
  return {
    ...body,
    dateOfBirth: moment(
      body.personalData.dateOfBirth,
      DATE_FORMATS.shortDate
    ).format(DATE_FORMATS.shortISODate),
    accountingData: {
      ...body.accountingData,
      fiscalNumber:
        body.accountingData.fiscalNumber.slice(0, 2) +
        body.accountingData.fiscalNumber.slice(5, 13) +
        body.accountingData.fiscalNumber.slice(16, 17),
    },
    vehicle: {
      ...body.vehicle,

      expirationDatePolicyVehicle:
        body.vehicle.expirationDatePolicyVehicle &&
        body.vehicle.expirationDatePolicyVehicle.match(
          DATE_FORMATS.regexshortDate
        )
          ? moment(
              body.vehicle.expirationDatePolicyVehicle,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
          : body.vehicle.expirationDatePolicyVehicle,
      expirationDateIdentificationVehicle:
        body.vehicle.expirationDateIdentificationVehicle &&
        body.vehicle.expirationDateIdentificationVehicle.match(
          DATE_FORMATS.regexshortDate
        )
          ? moment(
              body.vehicle.expirationDateIdentificationVehicle,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
          : body.vehicle.expirationDateIdentificationVehicle,
      expirationDateDriverLicense:
        body.vehicle.expirationDateDriverLicense &&
        body.vehicle.expirationDateDriverLicense.match(
          DATE_FORMATS.regexshortDate
        )
          ? moment(
              body.vehicle.expirationDateDriverLicense,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
          : body.vehicle.expirationDateDriverLicense,
      // expirationDatePolicyPersonal:
      //   body.vehicle[body.vehicleType].expirationDatePolicyPersonal &&
      //   body.vehicle[body.vehicleType].expirationDatePolicyPersonal.match(DATE_FORMATS.regexshortDate)
      //     ? moment(
      //         body.expirationDatePolicyPersonal,
      //         DATE_FORMATS.shortDate
      //       ).format(DATE_FORMATS.shortISODate)
      //     : body.expirationDatePolicyPersonal,
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
  payload,
}: PayloadAction<number>): Generator<
  CallEffect<AxiosResponse<PickerType>> | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  const response = yield call(pickersMiddleware.getPicker, payload);
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
  payload: { params, element },
}: PayloadAction<getPickersType>): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  console.log("exports");

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
  payload: { params, element },
}: PayloadAction<PickerExportType>): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  const paramsPost: PickerExportParamType = {
    email: params.email,
  };

  const response = yield call(pickersMiddleware.getPickerExport, paramsPost);
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
  payload,
}: PayloadAction<PickerType>): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: any }>
  | PutEffect<{ type: string }>,
  void,
  PickerResponseType
> {
  let body = process(payload);
  const response = yield call(pickersMiddleware.postPickerDocumentsEdit, body);

  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: i18next.t("global:title.modal.connectionError"),
        body: i18next.t("global:label.modal.connectionError"),
        //element,
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
  payload: { params, goBack, element },
}: PayloadAction<PostEditPickerType>): Generator<
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
  payload: { params, goBack, element },
}: PayloadAction<PostEditPickerType>): Generator<
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
