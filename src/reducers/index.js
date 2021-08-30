import { combineReducers } from "redux";

import transactions from "reducers/transactions";
import pendingUser from "reducers/PendingUser";
import pendingUserAdminPicker from "reducers/pendingUserAdminPicker";

const rootReducer = combineReducers({
    transactions,
    pendingUser,
    pendingUserAdminPicker

});

export default rootReducer;
