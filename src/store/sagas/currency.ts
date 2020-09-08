import {takeLatest, call, put} from "redux-saga/effects";
import {fetchRates} from "../../data/api";
import {RATES_REQUEST_START, IStartRatesRequestAction} from "../types/currency";
import {completeRatesRequest, setDate} from "../reducersAndActions/currency";

/**
 */
function* getLatestRates(action: IStartRatesRequestAction) {
  //fetch latest rates
  const {rates, date} = yield call(fetchRates, action.payload);
  yield put(completeRatesRequest(rates));
  // get the quote currency from the state and change the conversion rate
  yield put(setDate(new Date(date)));
}

export function* getLatestRatesWatcher() {
  yield takeLatest(RATES_REQUEST_START, getLatestRates);
}
