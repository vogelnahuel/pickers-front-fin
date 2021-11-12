import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas";

// Se obtienen todos los reducers
import rootReducer from "reducers";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

// Crea el store de redux y configura automáticamente la extensión Redux DevTools
export const store = configureStore({
  reducer: rootReducer(history),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      .concat(sagaMiddleware)
      .concat(routerMiddleware(history)),
});

// Inicio el middleware de saga
sagaMiddleware.run(rootSaga);

// Infiero el `RootState` y `AppDispatch` directamente desde la store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
