import { combineReducers } from "redux";

import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard"

const rootReducer = combineReducers({
    transactions,
    dashboard,
});

export default rootReducer;
