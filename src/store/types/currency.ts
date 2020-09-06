// Currency actions and action types
export const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
export const SET_QUOTE_CURRENCY = "SET_QUOTE_CURRENCY";
export const RATES_REQUEST_START = "REQUEST_CONVERSION_RATES";
export const RATES_REQUEST_COMPLETE = "CONVERSION_RATES_REQUEST_COMPLETE";
export const SET_CURRENCIES = "SET_CURRENCIES";
export const SET_CONVERSION_RATE = "SET_CONVERSION_RATE";
export const SET_DATE = "SET_DATE";

// Interfaces
export interface IRates {
  [key: string]: number;
}

export interface ICurrencyState {
  conversionRate: number;
  baseCurrency: string;
  quoteCurrency: string;
  currencies: string[];
  rates: IRates;
  date: Date;
}

export interface ISetCurrencyAction {
  type: typeof SET_BASE_CURRENCY | typeof SET_QUOTE_CURRENCY;
  payload: string;
}

export interface ISetCurreciesAction {
  type: typeof SET_CURRENCIES;
  payload: string[];
}

export interface ISetConversionRateAction {
  type: typeof SET_CONVERSION_RATE;
  payload: number;
}

export interface IStartRatesRequestAction {
  type: typeof RATES_REQUEST_START;
  payload: string;
}

export interface ICompleteRatesRequestAction {
  type: typeof RATES_REQUEST_COMPLETE;
  payload: IRates;
}

export interface ISetDateAction {
  type: typeof SET_DATE;
  payload: Date;
}

export type CurrencyActionTypes =
  | ISetCurrencyAction
  | ICompleteRatesRequestAction
  | IStartRatesRequestAction
  | ISetConversionRateAction
  | ISetCurreciesAction
  | ISetDateAction;
