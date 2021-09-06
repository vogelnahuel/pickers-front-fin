import { combineReducers } from "redux";
import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard";
import pendingUser from "reducers/PendingUser";
import pendingUserAdminPicker from "reducers/pendingUserAdminPicker";
import login from "reducers/login";
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    transactions,
    dashboard,
    pendingUser,
    pendingUserAdminPicker,
    login,
});

export default rootReducer;
