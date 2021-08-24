import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
// import reducer from './reducers/indexOLD'
import reducer from "reducers/index"
import createSagaMiddleware, { END } from "redux-saga";

import rootSaga from "sagas/index";


// const store = createStore(
//     reducer,
//     compose(
//         applyMiddleware(thunk),
//         typeof window === 'object' &&
//         typeof window.__REDUX_DEVTOOLS_EXTENSION__!=='undefined'?
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         : f=>f
//     )
// );
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

// export default store;

const store =
    process.env.NODE_ENV === "production"
        ? createStore(reducer, applyMiddleware(sagaMiddleware,thunk))
        : createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware,thunk)));

// function storeRehydrationFinished() {
//     const { user } = store.getState().session;
//
//     if (user && user.accessToken !== "") {
//         session.setAuthToken(user.accessToken);
//     }
//
//     store.dispatch({ type: globalTypes.INIT });
// }

sagaMiddleware.run(rootSaga);
// .done.catch((e) => {
//     // eslint-disable-next-line no-console
//     console.error("[Run Root Saga]", e.message);
// });

// persistStore(store, null, storeRehydrationFinished);

store.close = () => store.dispatch(END);

export default store;