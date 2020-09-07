import {RootState} from "../reducers";

export const currencySelector = (state: RootState) => state.currency;

export const themeSelector = (state: RootState) => state.theme;
