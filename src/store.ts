import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import reducer from "./reducers/index";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
export const history = createBrowserHistory();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store =
  process.env.NODE_ENV === "production"
    ? createStore(
        reducer(history),
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
      )
    : createStore(
        reducer(history),
        composeEnhancers(
          applyMiddleware(routerMiddleware(history), sagaMiddleware)
        )
      );

sagaMiddleware.run(rootSaga);

// export type RootState = ReturnType<typeof store>;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// store.close = () => store.dispatch(END);

export default store;
