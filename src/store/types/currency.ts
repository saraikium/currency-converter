// Currency actions and action types
export const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
export const SET_QUOTE_CURRENCY = "SET_QUOTE_CURRENCY";
export const RATES_REQUEST_START = "REQUEST_CONVERSION_RATES";
export const RATES_REQUEST_COMPLETE = "CONVERSION_RATES_REQUEST_COMPLETE";

// Interfaces
export interface IRates {
  [key: string]: number;
}

export interface ICurrencyState {
  baseCurrency: string;
  quoteCurrency: string;
  rates: IRates;
}

export interface ISetCurrencyAction {
  type: typeof SET_BASE_CURRENCY | typeof SET_QUOTE_CURRENCY;
  payload: string;
}

export interface IStartRatesRequestAction {
  type: typeof RATES_REQUEST_START;
  payload: string;
}

export interface ICompleteRatesRequestAction {
  type: typeof RATES_REQUEST_COMPLETE;
  payload: IRates;
}

export type CurrencyActionTypes =
  | ISetCurrencyAction
  | ICompleteRatesRequestAction
  | IStartRatesRequestAction;
