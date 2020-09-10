import {call, put, takeLatest} from "redux-saga/effects";

import {loginUser} from "../../data/api";
import {
  completeUserLogin,
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
  logoutUser
} from "../reducersAndActions/auth";
import {
  IRequestUserLoginAction,
  LOAD_USER_FROM_STORAGE,
  REQUEST_USER_LOGIN,
  USER_LOGOUT_REQUEST
} from "../types/auth";

function* signinUser(action: IRequestUserLoginAction) {
  const user = yield call(loginUser, action.payload);
  yield call(saveUserToStorage, user);
  yield put(completeUserLogin(user));
}

function* logUserOut() {
  yield put(logoutUser());
  yield call(removeUserFromStorage);
}

function* loadUserFromStorage() {
  const user = yield call(getUserFromStorage);
  yield put(completeUserLogin(user));
}

export function* loginUserWatcher() {
  yield takeLatest(REQUEST_USER_LOGIN, signinUser);
}

export function* loadUserFromStorageWatcher() {
  yield takeLatest(LOAD_USER_FROM_STORAGE, loadUserFromStorage);
}

export function* logUserOutWatcher() {
  yield takeLatest(USER_LOGOUT_REQUEST, logUserOut);
}
