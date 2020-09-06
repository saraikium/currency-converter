import {currencySaga} from "./currency";
import {fork} from "redux-saga/effects";

export function* rootSaga() {
  yield fork(currencySaga);
}
