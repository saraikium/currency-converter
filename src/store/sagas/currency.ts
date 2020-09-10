import {call, put, select, takeLatest} from "redux-saga/effects";

import {fetchRates} from "../../data/api";
import {
  completeRatesRequest,
  saveCurrencyStateToStorage,
  setDate,
  loadCurrencyStateFromStorage,
  setCurrencyStateFromStorage
} from "../reducersAndActions/currency";
import {currencySelector} from "../selectors";
import {
  IStartRatesRequestAction,
  RATES_REQUEST_START,
  LOAD_CURRENCY_FROM_STORAGE
} from "../types/currency";

function* getLatestRates(action: IStartRatesRequestAction) {
  //fetch latest rates
  const {date, rates} = yield call(fetchRates, action.payload);
  yield put(completeRatesRequest(rates));
  const newDate = new Date(date);
  yield put(setDate(newDate));
  // When we get the latest rates, save the currency state to AsyncStorage
  const currencyState = yield select(currencySelector);
  yield call(saveCurrencyStateToStorage, currencyState);
}

function* loadRatesFromStorage() {
  const currencyState = yield call(loadCurrencyStateFromStorage);
  yield put(
    setCurrencyStateFromStorage({
      ...currencyState,
      date: new Date(currencyState.date)
    })
  );
}

export function* getLatestRatesWatcher() {
  yield takeLatest(RATES_REQUEST_START, getLatestRates);
}

export function* loadRatesFromStorageWatcher() {
  yield takeLatest(LOAD_CURRENCY_FROM_STORAGE, loadRatesFromStorage);
}
