import {takeLatest, call, put} from "redux-saga/effects";
import {fetchRates} from "../../data/api";
import {RATES_REQUEST_START, IStartRatesRequestAction} from "../types/currency";
import {completeRatesRequest} from "../reducers/currency";

export function* getLatestRates(action: IStartRatesRequestAction) {
  yield call(fetchRates, action.payload);
}

export function* getLatestRatesWatcher() {
  const {rates} = yield takeLatest(RATES_REQUEST_START, getLatestRates);
  yield put(completeRatesRequest(rates));
}
