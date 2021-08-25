import { combineReducers } from "redux";

import transactions from "reducers/transactions";

const rootReducer = combineReducers({
    transactions,
});

export default rootReducer;
