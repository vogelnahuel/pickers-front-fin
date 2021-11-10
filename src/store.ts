// import { createStore, applyMiddleware, compose } from "redux";
// import { createBrowserHistory } from "history";
// import { routerMiddleware } from "connected-react-router";
// import reducer from "./reducers/index";

// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";
// export const history = createBrowserHistory();

// // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const sagaMiddleware = createSagaMiddleware();

// const store =
//   process.env.NODE_ENV === "production"
//     ? createStore(
//         reducer(history),
//         applyMiddleware(routerMiddleware(history), sagaMiddleware)
//       )
//     : createStore(
//         reducer(history),
//         composeEnhancers(
//           applyMiddleware(routerMiddleware(history), sagaMiddleware)
//         )
//       );

// sagaMiddleware.run(rootSaga);

// // export type RootState = ReturnType<typeof store>;
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// // store.close = () => store.dispatch(END);

// export default store;

import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas";

// Se obtienen todos los reduces
import counterReducer from "slices/counter/counterSlice";
import dashboardReducer from "slices/dashboard";
import loginReducer from "slices/login";

const sagaMiddleware = createSagaMiddleware();

// Crea el store de redux y configura automáticamente la extensión Redux DevTools
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Inicio el middleware de saga
sagaMiddleware.run(rootSaga);

// Infiero el `RootState` y `AppDispatch` directamente desde la store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
