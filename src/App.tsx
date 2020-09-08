import React from "react";
import {Provider} from "react-redux";

import Navigation from "./Navigation";
import {store} from "./store";

export const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
