import {combineReducers} from "redux";

import {userReducer} from "./auth";
import {currencyReducer} from "./currency";
import {themesReducer} from "./theme";

export const rootReducer = combineReducers({
  currency: currencyReducer,
  theme: themesReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
