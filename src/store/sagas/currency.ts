import {takeLatest, call, put, select, takeEvery} from "redux-saga/effects";
import {fetchRates} from "../../data/api";
import {
  RATES_REQUEST_START,
  IStartRatesRequestAction,
  SET_QUOTE_CURRENCY,
  ISetCurrencyAction,
  SET_BASE_CURRENCY,
  ICurrencyState
} from "../types/currency";
import {
  completeRatesRequest,
  setDate,
  setConversionRate,
  setBaseCurrency,
  setQuoteCurrency
} from "../reducers/currency";
import {RootState} from "../reducers";

const getCurrencyState = (state: RootState): ICurrencyState => state.currency;

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

// function* changeBaseCurrency(action: ISetCurrencyAction) {
//   yield put(setBaseCurrency(action.payload));
//   const {baseCurrency, quoteCurrency, rates} = yield select(getCurrencyState);
//   //if both currencies are same rate = 1
//   const newRate = baseCurrency !== quoteCurrency ? rates[quoteCurrency] : 1;
//   yield put(setConversionRate(newRate));
// }

// function* changeQuoteCurrency(action: ISetCurrencyAction) {
//   yield put(setQuoteCurrency(action.payload));
//   const {baseCurrency, quoteCurrency, rates} = yield select(getCurrencyState);
//   //if both currencies are same rate = 1
//   console.log({
//     test: baseCurrency === quoteCurrency,
//     quoteCurrency,
//     baseCurrency
//   });
//   const newRate = baseCurrency !== quoteCurrency ? rates[quoteCurrency] : 1;
//   yield put(setConversionRate(newRate));
// }

// export function* changeCurrencyWatcher() {
//   yield takeEvery(SET_BASE_CURRENCY, getLatestRates);
//   yield takeEvery(SET_BASE_CURRENCY, changeBaseCurrency);
//   yield takeEvery(SET_QUOTE_CURRENCY, changeQuoteCurrency);
// }
