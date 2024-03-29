import {
  call,
  takeLatest,
  put,
  CallEffect,
  PutEffect,
  ForkEffect,
} from "redux-saga/effects";
import { actions } from "reducers/dashboard";
import * as dashboardMiddleware from "middleware/dashboard";
import {
  dashboardResponseDataType,
  dashboardResponseType,
} from "./types/dashboard";
import { AxiosResponse } from "axios";

const sagas:ForkEffect<never>[] = [takeLatest(actions.getDashboardRequest.type,getDashboard)];

export default sagas;

function* getDashboard(): Generator<
  CallEffect<AxiosResponse<dashboardResponseDataType>> | PutEffect<{ type: string;}>,
  void,
  dashboardResponseType
> {
  const response = yield call(dashboardMiddleware.getDashboard);
  if (response.status !== 200) {
    yield put(actions.getDashboardError());
  } else {
    const { result } = response.data;
    yield put(actions.getDashboardSuccess(result));
  }
}
