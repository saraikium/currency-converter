import {combineReducers} from "redux";
import {currencyReducer} from "./currency";

export const rootReducer = combineReducers({
  currency: currencyReducer
});

export type RootState = ReturnType<typeof rootReducer>;
