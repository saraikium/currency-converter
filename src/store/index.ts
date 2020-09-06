import {createStore, applyMiddleware} from "redux";
import createSageMiddleware from "redux-saga";
import {rootReducer} from "./reducers";
import {rootSaga} from "./sagas";

const sagaMiddleware = createSageMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
