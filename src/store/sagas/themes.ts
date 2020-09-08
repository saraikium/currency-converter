import {call, put, takeLatest} from "redux-saga/effects";

import {
  getThemeFromAsyncStorage,
  saveThemeToAsyncStorage,
  setTheme
} from "../reducersAndActions/theme";
import {
  CHANGE_THEME,
  GET_THEME_FROM_ASYNC_STORAGE,
  ISetThemeAction
} from "../types/theme";

function* changeTheme(action: ISetThemeAction) {
  yield put(setTheme(action.payload));
  yield call(saveThemeToAsyncStorage, action.payload);
}

function* loadTheme() {
  const theme = yield call(getThemeFromAsyncStorage);
  yield put(setTheme(theme));
}

export function* changeThemeWatcher() {
  yield takeLatest(CHANGE_THEME, changeTheme);
}

export function* loadThemeWatcher() {
  yield takeLatest(GET_THEME_FROM_ASYNC_STORAGE, loadTheme);
}
