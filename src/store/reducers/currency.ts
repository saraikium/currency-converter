import {
  SET_BASE_CURRENCY,
  SET_QUOTE_CURRENCY,
  RATES_REQUEST_COMPLETE,
  ICurrencyState,
  CurrencyActionTypes,
  IRates,
  RATES_REQUEST_START,
  SET_CONVERSION_RATE,
  SET_CURRENCIES,
  SET_DATE
} from "../types/currency";

//Action creators
export const setBaseCurrency = (currency: string): CurrencyActionTypes => ({
  type: SET_BASE_CURRENCY,
  payload: currency
});

export const setQuoteCurrency = (currency: string): CurrencyActionTypes => ({
  type: SET_QUOTE_CURRENCY,
  payload: currency
});

export const startRatesRequest = (currency: string): CurrencyActionTypes => ({
  type: RATES_REQUEST_START,
  payload: currency
});

export const completeRatesRequest = (rates: IRates): CurrencyActionTypes => ({
  type: RATES_REQUEST_COMPLETE,
  payload: rates
});

export const setConversionRate = (rate: number): CurrencyActionTypes => ({
  type: SET_CONVERSION_RATE,
  payload: rate
});

export const setCurrencies = (currencies: string[]): CurrencyActionTypes => ({
  type: SET_CURRENCIES,
  payload: currencies
});

export const setDate = (date: Date): CurrencyActionTypes => ({
  type: SET_DATE,
  payload: date
});

// default state
const defaultState: ICurrencyState = {
  conversionRate: 1,
  currencies: [],
  baseCurrency: "USD",
  quoteCurrency: "GBP",
  date: new Date(),
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
      console.log({
        baseCurrency: action.payload,
        quoteCurrency: state.quoteCurrency
      });
      if (action.payload === state.quoteCurrency)
        return {...state, baseCurrency: action.payload, conversionRate: 1};
      return {...state, baseCurrency: action.payload};
    case SET_DATE:
      return {...state, date: action.payload};
    case SET_CURRENCIES:
      return {...state, currencies: action.payload};
    case SET_CONVERSION_RATE:
      return {...state, conversionRate: action.payload};
    case SET_QUOTE_CURRENCY:
      console.log({
        quoteCurrency: action.payload,
        baseCurrency: state.baseCurrency
      });
      if (action.payload === state.baseCurrency)
        return {...state, quoteCurrency: action.payload, conversionRate: 1};
      return {...state, quoteCurrency: action.payload};
    case RATES_REQUEST_START:
      return {...state};
    case RATES_REQUEST_COMPLETE:
      return {...state, rates: action.payload};
    default:
      return state;
  }
};
