// @flow

import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers";
import promiseMiddleware from "redux-promise-middleware";
import {initialState} from "./state";
import thunk from "redux-thunk";

// Redux DevTools setup: https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
        const nextRootReducer: any = require("./reducers");
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
