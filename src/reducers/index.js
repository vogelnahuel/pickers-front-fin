import { combineReducers } from "redux";

import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard";
import pendingUser from "reducers/PendingUser";
import pendingUserAdminPicker from "reducers/pendingUserAdminPicker";
import login from "reducers/login";
const rootReducer = combineReducers({
    transactions,
    dashboard,
    pendingUser,
    pendingUserAdminPicker,
    login

});

export default rootReducer;
