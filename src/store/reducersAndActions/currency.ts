import {
  SET_BASE_CURRENCY,
  SET_QUOTE_CURRENCY,
  RATES_REQUEST_COMPLETE,
  ICurrencyState,
  CurrencyActionTypes,
  IRates,
  RATES_REQUEST_START,
  SET_CURRENCIES,
  SET_DATE,
  SET_DEFAULT_STATE_FROM_STORAGE,
  ILoadCurrencyStateAction,
  LOAD_CURRENCY_FROM_STORAGE,
  ISetCurrencyStateAction
} from "../types/currency";
import {Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import currencies from "../../data/currencies";

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

export const setCurrencies = (currencyList: string[]): CurrencyActionTypes => ({
  type: SET_CURRENCIES,
  payload: currencyList
});

export const setDate = (date: Date): CurrencyActionTypes => ({
  type: SET_DATE,
  payload: date
});

export const loadCurrencyState = (): ILoadCurrencyStateAction => ({
  type: LOAD_CURRENCY_FROM_STORAGE
});

export const setCurrencyStateFromStorage = (
  state: ICurrencyState
): ISetCurrencyStateAction => ({
  type: SET_DEFAULT_STATE_FROM_STORAGE,
  payload: state
});

// storage functions
const key = "currency_state";

export const saveCurrencyStateToStorage = async (
  currencyState: ICurrencyState
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(currencyState));
  } catch (error) {
    Alert.alert(error);
  }
};

export const loadCurrencyStateFromStorage = async (): Promise<ICurrencyState | null> => {
  try {
    const currencyState = await AsyncStorage.getItem(key);
    if (currencyState) return JSON.parse(currencyState) as ICurrencyState;
    return null;
  } catch (error) {
    Alert.alert(error);
  }
};

// default state
const defaultState: ICurrencyState = {
  conversionRate: 1,
  currencies: currencies,
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
    case SET_DEFAULT_STATE_FROM_STORAGE:
      return action.payload;
    case SET_BASE_CURRENCY:
      return {...state, baseCurrency: action.payload};
    case SET_DATE:
      return {...state, date: action.payload};
    case SET_CURRENCIES:
      return {...state, currencies: action.payload};
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
