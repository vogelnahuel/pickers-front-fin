import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import * as preliquidationsMiddleware from "../middleware/preliquidations";

import { actions as preliquidationActions } from "../reducers/preliquidation";
import { PreliquidationsApiResponse } from "./types/preliquidation";

const sagas = [
  takeLatest(
    preliquidationActions.getPreliquidationsRequest.type,
    getPreliquidations
  ),
];

export default sagas;

function* getPreliquidations({
  payload,
}: PayloadAction<any>): Generator<
  CallEffect<AxiosResponse<any>> | PutEffect<{ type: string }>,
  void,
  PreliquidationsApiResponse
> {
  // const response = yield call(
  //   preliquidationsMiddleware.getPreliquidations,
  //   payload
  // );
  // if (response.status !== 200) {
  //   yield put(preliquidationActions.getPreliquidationsError());
  // } else {
  //   const {
  //     result: { items },
  //     ...rest
  //   } = response.data;
  //   yield put(
  //     preliquidationActions.getPreliquidationsSuccess({ items, ...rest })
  //   );
  // }
}
