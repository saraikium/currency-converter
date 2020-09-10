import {RootState} from "../reducersAndActions";

export const currencySelector = (state: RootState) => state.currency;

export const themeSelector = (state: RootState) => state.theme;

export const userSelector = (state: RootState) => state.user;
