import {combineReducers} from "redux";
import {currencyReducer} from "./currency";
import {themesReducer} from "./theme";

export const rootReducer = combineReducers({
  currency: currencyReducer,
  theme: themesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
