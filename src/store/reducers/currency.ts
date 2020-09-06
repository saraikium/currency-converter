import {
  SET_BASE_CURRENCY,
  SET_QUOTE_CURRENCY,
  RATES_REQUEST_COMPLETE,
  ICurrencyState,
  CurrencyActionTypes,
  IRates,
  RATES_REQUEST_START
} from "../types/currency";

//Action creators
export const setBaseCurrency = (currency: string): CurrencyActionTypes => {
  return {type: SET_BASE_CURRENCY, payload: currency};
};

export const setQuoteCurrency = (currency: string): CurrencyActionTypes => {
  return {type: SET_QUOTE_CURRENCY, payload: currency};
};

export const startRatesRequest = (currency: string): CurrencyActionTypes => {
  return {type: RATES_REQUEST_START, payload: currency};
};

export const completeRatesRequest = (rates: IRates): CurrencyActionTypes => {
  return {type: RATES_REQUEST_COMPLETE, payload: rates};
};

// default state
const defaultState: ICurrencyState = {
  baseCurrency: "USD",
  quoteCurrency: "GBP",
  rates: {
    GBP: 0.843
  }
};

// Reducer
export const currencyReducer = (
  state = defaultState,
  action: CurrencyActionTypes
): ICurrencyState => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return {...state, baseCurrency: action.payload};
    case SET_QUOTE_CURRENCY:
      return {...state, quoteCurrency: action.payload};
    case RATES_REQUEST_START:
      return {...state};
    case RATES_REQUEST_COMPLETE:
      return {...state, rates: action.payload};
    default:
      return state;
  }
};
