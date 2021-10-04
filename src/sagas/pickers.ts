import {
  call,
  CallEffect,
  CallEffectDescriptor,
  put,
  PutEffect,
  SimpleEffect,
  takeLatest,
} from "redux-saga/effects";
import {
  actions as pickersActions,
  types as pickersTypes,
} from "../reducers/pickers";
import {
  actions as detailPickerActions,
  types as detailPickerTypes,
} from "../reducers/detailPicker";
import { actions as notificationActions } from "../reducers/notification";
import createCSV from ".,/../../src/utils/createCSV";
import moment from "moment";
import * as pickersMiddleware from "../middleware/pickers";
import { goBack } from "connected-react-router";
import { getPickersType, PickersResposeType,PickerExportType, ParamGetPendingUser, PostEditPickerType } from "./types/pickers";
import { DocumentationType, PickersAxiosResponseType, } from "../pages/pickers/types";
import { AxiosResponse } from "axios";

const sagas = [
  takeLatest(pickersTypes.PENDING_USER_GET_REQUEST, getPickers),
  takeLatest(
    pickersTypes.PENDING_USER_EXPORT_GET_REQUEST,
    getPendingUserExport
  ),
  takeLatest(pickersTypes.PENDING_USER_GET_MORE_REQUEST, getMorePendingUser),
  takeLatest(
    detailPickerTypes.PENDING_USER_ADMIN_PICKER_GET_REQUEST,
    getPendingUserPicker
  ),
  takeLatest(
    detailPickerTypes.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST,
    getPendingUserPickerExport
  ),
  takeLatest(
    detailPickerTypes.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST,
    postPendingUserDocumentsEdit
  ),
  takeLatest(detailPickerTypes.PICKER_APROVE_POST_REQUEST, postAprovePicker),
  takeLatest(detailPickerTypes.PICKER_EDIT_POST_REQUEST, postEditPicker),
];

export default sagas;

const process = (body:any):DocumentationType => {
  debugger
  return {
    ...body,
    dateOfBirth: moment(body.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD"),
    expirationDatePolicyPersonal:
      body.expirationDatePolicyPersonal &&
      moment(body.expirationDatePolicyPersonal, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
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
          moment(
            body.vehicle[body.vehicleType].expirationDatePolicyVehicle,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD"),
        expirationDateIdentificationVehicle:
          body.vehicle[body.vehicleType].expirationDateIdentificationVehicle &&
          moment(
            body.vehicle[body.vehicleType].expirationDateIdentificationVehicle,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD"),
        expirationDateDriverLicense:
          body.vehicle[body.vehicleType].expirationDateDriverLicense &&
          moment(
            body.vehicle[body.vehicleType].expirationDateDriverLicense,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD"),
      },
    },
  };
};

function* getPickers({
  params,
}:getPickersType): Generator<
 CallEffect<AxiosResponse<PickersAxiosResponseType>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  debugger
  const response = yield call(pickersMiddleware.getPickers, params);
  if (response.status !== 200) {
    yield put(pickersActions.getPendingUserError());
  } else {
    const {
      result: { items },
      limit,
      offset,
      hasMore,
    } = response.data;
    yield put(
      pickersActions.getPendingUserSuccess({ items, limit, offset, hasMore })
    );
  }
}

function* getMorePendingUser({
  params,
}:getPickersType):Generator<
CallEffect<AxiosResponse<PickersAxiosResponseType>> | PutEffect<any>,
void,
 PickersResposeType
>{
  const response = yield call(pickersMiddleware.getPickers, params);
  if (response.status !== 200) {
    yield put(pickersActions.getPendingUserError());
  } else {
    const {
      result: { items },
      limit,
      offset,
      hasMore,
    } = response.data;
    yield put(
      pickersActions.getMorePendingUserSuccess({
        items,
        limit,
        offset,
        hasMore,
      })
    );
  }
}

function* getPendingUserPicker({
  params,
}:ParamGetPendingUser): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  const response = yield call(pickersMiddleware.getPicker, params);
  if (response.status !== 200) {
    yield put(detailPickerActions.getPendingUserPickerError());
  } else {
    const { result } = response.data;
    yield put(detailPickerActions.getPendingUserPickerSuccess(result));
    yield put(
      pickersActions.setActualPage(
        result.status.id === 4 || result.status.id === 5 ? "ACTIVE" : "PENDING"
      )
    );
  }
}

function* getPendingUserExport({
  params,
  element,
}:getPickersType): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  any
  //TODO: tipar junto con el createCSV
> {
  const response = yield call(
    pickersMiddleware.getPickersExport,
    params
    //filterUpdate
  );

  if (response.status !== 200) {
    yield put(pickersActions.getPendingUserExportError());
  } else {
    createCSV(response);
    yield put(pickersActions.getPendingUserExportSuccess(response));
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Exportaste exitosamente",
        body: "El archivo se descargó correctamente",
        element,
      })
    );
  }
}

function* getPendingUserPickerExport({
  params,
  element,
}:PickerExportType): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  const response = yield call(
    pickersMiddleware.getPickerExport,
    params
  );
  if (response.status !== 200) {
    yield put(detailPickerActions.getPendingUserPickerExportError());
  } else {
    createCSV(response);
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Exportaste exitosamente",
        body: "El archivo se descargó correctamente",
        element,
      })
    );
    yield put(detailPickerActions.getPendingUserPickerExportSuccess(response));
  }
}

function* postPendingUserDocumentsEdit({
  params,
  element,
}:PostEditPickerType): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  let body = process(params);
  const response = yield call(
    pickersMiddleware.postPickerDocumentsEdit,
    body
  );
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: "Error de conexión",
        body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
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
}:PostEditPickerType): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  let body = process(params);
  const response = yield call(pickersMiddleware.postAprovePicker, body);
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: "Error de conexión",
        body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
        element,
      })
    );
    yield put(detailPickerActions.getAprovePickerError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Aprobación exitosa",
        body: "Ya podés visualizar sus datos en la pestaña pickers",
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
}:PostEditPickerType): Generator<
  SimpleEffect<"CALL", CallEffectDescriptor<unknown>> | PutEffect<any>,
  void,
  PickersResposeType
> {
  let body = process(params);
  const response = yield call(pickersMiddleware.postEditPicker, body);
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: "Error de conexión",
        body: "Hubo un error de comunicación con el servidor. Por favor, intentalo nuevamente",
        element,
      })
    );
    yield put(detailPickerActions.getEditPickerError());
  } else {
    yield put(
      notificationActions.showNotification({
        level: "success",
        title: "Datos guardados",
        body: "Ya quedaron registrados los cambios",
        onClick: goBack,
        element,
      })
    );
    yield put(detailPickerActions.getEditPickerSuccess(body));
  }
}
