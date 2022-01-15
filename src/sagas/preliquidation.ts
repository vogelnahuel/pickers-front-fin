import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import moment from "moment";
import { ApiResponse } from "middleware/api";
import { detailPreliquidationDatePicker } from "pages/preliquidation/DetailPreliquidation/invoice/types";

import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { DATE_FORMATS } from "utils/constants";
import * as preliquidationsMiddleware from "../middleware/preliquidations";
import { actions as notificationActions } from "../reducers/notification";
import { actions as preliquidationActions } from "../reducers/preliquidation";
import {
  DetailPreliquidationBodyParamsType,
  DetailPreliquidationsApiResponseType,
  DetailPreliquidationsContentResponseType,
  DetailPreliquidationsInvoiceApiResponseType,
  DetailPreliquidationsInvoiceTypesApiResponseType,
  DetatilPreliquidationsApiResponse,
  PreliquidationCastParamsMiddlewareType,
  PreliquidationParamsMiddlewareType,
  PreliquidationsApiResponse,
  RejectInvoiceMiddlewareType,
  UploadInvoiceFileMiddlewareType,
} from "./types/preliquidation";
import i18next from "i18next";
import { NotificationStateType } from "reducers/types/notification";
import { replace } from "connected-react-router";

const sagas = [
  takeLatest(
    preliquidationActions.getPreliquidationsRequest.type,
    getPreliquidations
  ),
  takeLatest(
    preliquidationActions.getDetailPreliquidationsRequest.type,
    getDetailPreliquidations
  ),
  takeLatest(
    preliquidationActions.getMorePreliquidationsRequest.type,
    getMorePreliquidations
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailRequest.type,
    getInvoiceDetail
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailSaveRequest.type,
    putSaveDetailInvoice
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailApproveRequest.type,
    patchApproveDetailInvoice
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailDeleteRequest.type,
    putDeleteDetailInvoice
  ),
  takeLatest(preliquidationActions.uploadInvoiceFile.type, uploadInvoiceFile),
  takeLatest(
    preliquidationActions.deleteInvoiceFileRequest.type,
    deleteInvoiceFile
  ),
  takeLatest(
    preliquidationActions.getInvoiceDetailTypesRequest.type,
    getDetailInvoiceTypes
  ),
];

export default sagas;

const process = (body: DetailPreliquidationBodyParamsType) => {
  return {
    ...body,
    emisionDate: body?.emisionDate
      ? moment(body?.emisionDate, DATE_FORMATS.shortDate).format(
          DATE_FORMATS.shortISODate
        )
      : null,
  };
};

const processDatePicker = (
  payload: PreliquidationParamsMiddlewareType
): PreliquidationCastParamsMiddlewareType => {
  let payloadCast: PreliquidationCastParamsMiddlewareType =
    payload as PreliquidationCastParamsMiddlewareType;
  if (payload.generatedAt) {
    const castDatePicker = moment(
      payload.generatedAt?.from,
      DATE_FORMATS.shortDate
    ).format(DATE_FORMATS.shortISODate);

    payloadCast = {
      ...payload,
      generatedAt: castDatePicker,
    };
  }

  return payloadCast;
};

function* getPreliquidations({
  payload,
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PreliquidationsApiResponse>>
  | PutEffect<{ type: string }>,
  void,
  PreliquidationsApiResponse
> {
  if (payload?.status === "") {
    delete payload["status"];
  }
  let payloadCast: PreliquidationCastParamsMiddlewareType =
    processDatePicker(payload);

  const response = yield call(
    preliquidationsMiddleware.getPreliquidations,
    payloadCast
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getPreliquidationsError());
  } else {
    yield put(preliquidationActions.getPreliquidationsSuccess(response.data));
  }
}

function* getDetailPreliquidations({
  payload,
}: PayloadAction<number>): Generator<
  | CallEffect<AxiosResponse<DetatilPreliquidationsApiResponse>>
  | PutEffect<{ type: string }>,
  void,
  DetatilPreliquidationsApiResponse
> {
  const response = yield call(
    preliquidationsMiddleware.getDetailPreliquidations,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getDetailPreliquidationsError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getDetailPreliquidationsSuccess(result));
  }
}

function* getMorePreliquidations({
  payload,
}: PayloadAction<PreliquidationParamsMiddlewareType>): Generator<
  | CallEffect<AxiosResponse<PreliquidationsApiResponse>>
  | PutEffect<{ type: string }>,
  void,
  PreliquidationsApiResponse
> {
  let payloadCast: PreliquidationCastParamsMiddlewareType =
    processDatePicker(payload);
  const response = yield call(
    preliquidationsMiddleware.getPreliquidations,
    payloadCast
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getMorePreliquidationsError());
  } else {
    const {
      result: { items },
      ...rest
    } = response.data;
    yield put(
      preliquidationActions.getMorePreliquidationsSuccess({ items, ...rest })
    );
  }
}

function* getInvoiceDetail({
  payload,
}: PayloadAction<string | undefined>): Generator<
  | PutEffect<{
      payload: DetailPreliquidationsContentResponseType;
      type: string;
    }>
  | PutEffect<{ payload: undefined; type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsContentResponseType>>,
  void,
  DetailPreliquidationsApiResponseType
> {
  const response = yield call(
    preliquidationsMiddleware.getDetailInvoice,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getInvoiceDetailSuccess(result));
  }
}

function* putSaveDetailInvoice({
  payload,
}: PayloadAction<detailPreliquidationDatePicker>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ type: string }>
  | PutEffect<{ type: string; content: NotificationStateType }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  let result: DetailPreliquidationBodyParamsType = {
    emisionDate:
      typeof payload.emisionDate !== "string"
        ? payload.emisionDate?.from
        : null,
    invoiceType: payload.invoiceType?.tag ? payload.invoiceType : null,
    invoiceNumber: payload.invoiceNumber || null,
    salePoint: payload.salePoint || null,
    caeNumber: payload.caeNumber || null,
  };
  result = process(result);

  const response = yield call(
    preliquidationsMiddleware.putSaveDetailInvoice,
    payload.presettementId,
    result
  );
  if (response.status !== 200) {
    yield put(
      notificationActions.showNotification({
        level: "error",
        title: i18next.t("global:title.modal.connectionError"),
        body: i18next.t("global:label.modal.connectionError"),
      })
    );
    yield put(preliquidationActions.getInvoiceDetailSaveError());
  } else {
    yield put(replace("/preliquidation"));
    yield put(preliquidationActions.getInvoiceDetailSaveSuccess());
  }
}

function* patchApproveDetailInvoice({
  payload,
}: PayloadAction<detailPreliquidationDatePicker>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  let result: DetailPreliquidationBodyParamsType = {
    emisionDate:
      typeof payload.emisionDate !== "string" ? payload.emisionDate?.from : "",
    invoiceType: payload.invoiceType,
    invoiceNumber: payload.invoiceNumber,
    salePoint: payload.salePoint,
    caeNumber: payload.caeNumber,
  };
  result = process(result);

  const response = yield call(
    preliquidationsMiddleware.patchApproveDetailInvoice,
    payload.presettementId,
    result
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailApproveError());
  } else {
    yield put(replace("/preliquidation"));
  }
}

function* putDeleteDetailInvoice({
  payload,
}: PayloadAction<RejectInvoiceMiddlewareType>): Generator<
  | PutEffect<{ payload: detailPreliquidationDatePicker; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceApiResponseType
> {
  const response = yield call(
    preliquidationsMiddleware.putDeleteDetailInvoice,
    payload.presettlementId
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailDeleteError());
  } else {
    yield put(replace("/preliquidation"));
    yield put(preliquidationActions.getInvoiceDetailDeleteSuccess());
  }
}

function* uploadInvoiceFile({
  payload,
}: PayloadAction<UploadInvoiceFileMiddlewareType>): Generator<
  | PutEffect<{ payload: string; type: string }>
  | PutEffect<{ payload: undefined; type: string }>
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<ApiResponse<void>>>,
  void,
  ApiResponse<void>
> {
  const response = yield call(
    preliquidationsMiddleware.uploadInvoiceFile,
    payload
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.uploadInvoiceFileError());
  } else {
    if (payload.refreshPage) {
      yield put(
        preliquidationActions.getInvoiceDetailRequest(payload.id.toString())
      );
      yield put(preliquidationActions.setInvoiceFileStatus({ loading: false }));
    } else
      yield put(
        preliquidationActions.uploadInvoiceFileSuccess(payload.content)
      );
  }
}

function* deleteInvoiceFile({
  payload,
}: PayloadAction<{ id: number }>): Generator<
  | PutEffect<{ payload: undefined; type: string }>
  | PutEffect<{ payload: string | undefined; type: string }>
  | CallEffect<AxiosResponse<ApiResponse<void>>>,
  void,
  ApiResponse<void>
> {
  const response = yield call(
    preliquidationsMiddleware.deleteInvoiceFile,
    payload.id
  );
  if (response.status !== 200) {
    yield put(preliquidationActions.deleteInvoiceFileError());
  } else {
    yield put(
      preliquidationActions.getInvoiceDetailRequest(payload.id.toString())
    );
  }
}

function* getDetailInvoiceTypes(): Generator<
  | PutEffect<{ type: string }>
  | CallEffect<AxiosResponse<DetailPreliquidationsInvoiceTypesApiResponseType>>,
  void,
  DetailPreliquidationsInvoiceTypesApiResponseType
> {
  const response = yield call(preliquidationsMiddleware.getDetailInvoiceTypes);
  if (response.status !== 200) {
    yield put(preliquidationActions.getInvoiceDetailTypesError());
  } else {
    const { result } = response.data;
    yield put(preliquidationActions.getInvoiceDetailTypesSuccess(result));
  }
}
