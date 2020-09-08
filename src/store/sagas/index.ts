import {getLatestRatesWatcher} from "./currency";
import {changeThemeWatcher, loadThemeWatcher} from "./themes";
import {all} from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    getLatestRatesWatcher(),
    changeThemeWatcher(),
    loadThemeWatcher()
  ]);
}
