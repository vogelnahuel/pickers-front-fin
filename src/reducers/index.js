import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";

import transactions from "reducers/transactions";

const rootReducer = combineReducers({
    // router: routerReducer,
    transactions,
});

export default rootReducer;
