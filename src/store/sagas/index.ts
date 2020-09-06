import {getLatestRatesWatcher} from "./currency";
import {all} from "redux-saga/effects";

export function* rootSaga() {
  yield all([getLatestRatesWatcher()]);
}
