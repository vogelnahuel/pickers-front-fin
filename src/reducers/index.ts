import { combineReducers } from "redux";
import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard";
import pendingUser from "reducers/pickers";
import pendingUserAdminPicker from "reducers/detailPicker";
import login from "./login";
import notification from "reducers/notification";
import { connectRouter } from 'connected-react-router'

import { RouteComponentProps } from 'react-router-dom';


const rootReducer = (history: RouteComponentProps['history']) => combineReducers({
    router: connectRouter(history),
    transactions,
    dashboard,
    pendingUser,
    pendingUserAdminPicker,
    login,
    notification,
});

export default rootReducer;
