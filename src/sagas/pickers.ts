import createCSV from ".,/../../src/utils/createCSV";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { DeleteFileType } from "component/admin/ExpandableFile/types";
import { goBack } from "connected-react-router";
import i18next from "i18next";
import { ApiResponse } from "middleware/api";
import moment from "moment";
import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { actions } from "reducers/pickers";
import { NotificationStateType } from "reducers/types/notification";
import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DATE_FORMATS } from "utils/constants";
import * as pickersMiddleware from "../middleware/pickers";
import {
  AcountDataType,
  DetailPickerTagFileType,
  EditPickerResponseType,
  FilesType,
  ParamsMiddlewareType,
  PersonalDataType,
  PickerFileResponseType,
  PickersAxiosResponseType,
  PickersExportResponseType,
  PickersResponse,
  PickerType,
  StatusType,
  VehicleType,
} from "../pages/pickers/types";
import { actions as detailPickerActions } from "../reducers/detailPicker";
import { actions as notificationActions } from "../reducers/notification";
import {
  BankType,
  CsvResponseType,
  PickerResponseType,
  PickersResponseType,
} from "./types/pickers";

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
  takeLatest(detailPickerActions.getPickerFileRequest.type, getPickerFile),
  takeLatest(detailPickerActions.getPickerFileSaveRequest.type, putFileUpload),
  takeLatest(detailPickerActions.getBankNameRequest.type, getBankName),
  takeLatest(detailPickerActions.getPickerFileDeleteRequest.type, fileDelete),
];

export default sagas;

const process = (body: {
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

    personalData: {
      ...body.personalData,
      dateOfBirth: moment(
        body.personalData.dateOfBirth,
        DATE_FORMATS.shortDate
      ).format(DATE_FORMATS.shortISODate),
    },
    accountingData: {
      ...body.accountingData,
      fiscalNumber:
        body.accountingData.fiscalNumber.slice(0, 2) +
        body.accountingData.fiscalNumber.slice(5, 13) +
        body.accountingData.fiscalNumber.slice(16, 17),
    },
    vehicle: {
      ...body.vehicle,
      patent: body?.vehicle?.patent?.toUpperCase(),
      expirationDatePolicyVehicle:
        body.vehicle.expirationDatePolicyVehicle &&
          body.vehicle.expirationDatePolicyVehicle !== ""
          ? body.vehicle.expirationDatePolicyVehicle.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
              body.vehicle.expirationDatePolicyVehicle,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
            : body.vehicle.expirationDatePolicyVehicle
          : null,
      expirationDateIdentificationVehicle:
        body.vehicle.expirationDateIdentificationVehicle &&
          body.vehicle.expirationDateIdentificationVehicle !== ""
          ? body.vehicle.expirationDateIdentificationVehicle.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
              body.vehicle.expirationDateIdentificationVehicle,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
            : body.vehicle.expirationDateIdentificationVehicle
          : null,
      expirationDateDriverLicense:
        body.vehicle.expirationDateDriverLicense &&
          body.vehicle.expirationDateDriverLicense !== ""
          ? body.vehicle.expirationDateDriverLicense.match(
            DATE_FORMATS.regexshortDate
          )
            ? moment(
              body.vehicle.expirationDateDriverLicense,
              DATE_FORMATS.shortDate
            ).format(DATE_FORMATS.shortISODate)
            : body.vehicle.expirationDateDriverLicense
          : null,
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



function* getBankName({
  payload,
}: PayloadAction<{ cbuPrefix: number }>): Generator<
  CallEffect<unknown>
  | PutEffect<{ payload: undefined; type: string; }>
  | PutEffect<{ payload: { id: number; name: string; }; type: string; }>,
  void,
  ApiResponse<BankType>
> {
  const response = yield call(pickersMiddleware.getBankName, payload.cbuPrefix);
  if (response.status !== 200) {
    yield put(detailPickerActions.getBankNameError());
  } else {
    const { result } = response.data;
    yield put(detailPickerActions.getBankNameSuccess(result));
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
  payload,
}: PayloadAction<ParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  const response = yield call(pickersMiddleware.getPickersExport, payload);

  if (response.status !== 200) {
    yield put(actions.getPendingUserExportError());
  } else {
    createCSV(response.data, "pickers");
    yield put(actions.getPendingUserExportSuccess());
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
      })
    );
  }
}

function* getPendingUserPickerExport({
  payload: { email },
}: PayloadAction<ParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PickersExportResponseType>>
  | PutEffect<{ type: string }>,
  void,
  CsvResponseType
> {
  const response = yield call(pickersMiddleware.getPickerExport, { email });
  if (response.status !== 200) {
    yield put(detailPickerActions.getPendingUserPickerExportError());
  } else {
    createCSV(response.data, "pickers");
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: i18next.t("global:title.modal.export"),
        body: i18next.t("global:label.modal.export"),
      })
    );
    yield put(detailPickerActions.getPendingUserPickerExportSuccess());
  }
}

function* postPendingUserDocumentsEdit({
  payload,
}: PayloadAction<PickerType>): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: NotificationStateType }>
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
  payload: { params, goBack },
}: PayloadAction<{ params: PickerType; goBack: Function }>): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: NotificationStateType }>
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
      })
    );
    yield put(detailPickerActions.getAprovePickerSuccess(body));
  }
}

function* postEditPicker({
  payload: { params, goBack },
}: PayloadAction<{ params: PickerType; goBack: Function }>): Generator<
  | CallEffect<AxiosResponse<EditPickerResponseType>>
  | PutEffect<{ type: string; content: NotificationStateType }>
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
      })
    );
    yield put(detailPickerActions.getEditPickerSuccess(body));
  }
}

function* getPickerFile({
  payload,
}: PayloadAction<PickerFileRequestType>): Generator<
  | CallEffect<AxiosResponse<PickerFileResponseType>>
  | PutEffect<{ type: string }>,
  void,
  { status: number; data: PickerFileResponseType }
> {
  const response = yield call(pickersMiddleware.getFile, payload);

  if (response.status !== 200) {
    yield put(detailPickerActions.getPickerFileError());
  } else {
    const { result } = response.data;
    if (result.url) window.open(result.url, "_blank");
    yield put(detailPickerActions.getPickerFileSuccess());
  }
}

function* fileDelete({
  payload: { id, tag },
}: PayloadAction<DeleteFileType>): Generator<
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<any>>
  | Promise<AxiosResponse<any>>
  | void,
  void,
  { status: number; data: {} }
> {
  const response = yield call(pickersMiddleware.deleteFile, id, tag);
  if (response.status !== 200) {
    yield put(detailPickerActions.getPickerFileDeleteError({ tag }));
  } else {
    yield put(detailPickerActions.getPickerFileDeleteSuccess({ tag }));
    yield put(detailPickerActions.getPendingUserPickerRequest(id));
  }
}

function* putFileUpload({
  payload: { id, content, tag },
}: PayloadAction<{
  id: number;
  content: string;
  tag: keyof DetailPickerTagFileType;
}>): Generator<
  CallEffect<AxiosResponse<{}>> | PutEffect<{ type: string }> | void,
  void,
  { status: number; data: {} }
> {
  const response = yield call(pickersMiddleware.fileUpload, id, {
    content: content,
    tag: tag,
  });
  if (response.status !== 200) {
    yield put(detailPickerActions.getPickerFileSaveError({ tag }));
  } else {
    yield put(detailPickerActions.getPickerFileSaveSuccess({ tag }));
    yield put(detailPickerActions.getPendingUserPickerRequest(id));
  }
}
