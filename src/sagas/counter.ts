import { takeEvery, ForkEffect, put } from "@redux-saga/core/effects";
import { incrementAsync, increment } from "slices/counter/counterSlice";

const delayMs = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const sagas: ForkEffect<never>[] = [
  takeEvery(incrementAsync.toString(), incrementAsyncCallback),
];

export default sagas;

function* incrementAsyncCallback() {
  console.log("Increment async callback");
  yield delayMs(2000);
  yield put(increment());
}
