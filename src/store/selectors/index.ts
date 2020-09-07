import {RootState} from "../reducers";
import {ICurrencyState} from "../types/currency";

export const currencySelector = (state: RootState): ICurrencyState =>
  state.currency;
