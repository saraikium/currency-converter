import {call, put, takeLatest} from "redux-saga/effects";

import {loginUser} from "../../data/api";
import {
  completeUserLogin,
  getUserFromStorage,
  saveUserToStorage
} from "../reducersAndActions/auth";
import {
  IRequestUserLoginAction,
  LOAD_USER_FROM_STORAGE,
  REQUEST_USER_LOGIN
} from "../types/auth";

function* signinUser(action: IRequestUserLoginAction) {
  const user = yield call(loginUser, action.payload);
  yield call(saveUserToStorage, user);
  yield put(completeUserLogin(user));
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
