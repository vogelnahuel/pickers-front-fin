import { combineReducers } from "redux";

import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard";
import pendingUser from "reducers/PendingUser";

const rootReducer = combineReducers({
    transactions,
    dashboard,
    pendingUser,
});

export default rootReducer;
