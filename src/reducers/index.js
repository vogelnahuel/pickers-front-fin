import { combineReducers } from "redux";

import transactions from "reducers/transactions";
import pendingUser from "reducers/PendingUser";

const rootReducer = combineReducers({
    transactions,
    pendingUser,
});

export default rootReducer;
