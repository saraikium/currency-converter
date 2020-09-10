import {all} from "redux-saga/effects";

import {loginUserWatcher, loadUserFromStorageWatcher} from "./auth";
import {getLatestRatesWatcher, loadRatesFromStorageWatcher} from "./currency";
import {changeThemeWatcher, loadThemeWatcher} from "./themes";

export function* rootSaga() {
  yield all([
    getLatestRatesWatcher(),
    changeThemeWatcher(),
    loadThemeWatcher(),
    loginUserWatcher(),
    loadUserFromStorageWatcher(),
    loadRatesFromStorageWatcher()
  ]);
}
