import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import transactions from "reducers/transactions";
//import dashboard from "reducers/dashboard_old";
import dashboard from "reducers/dashboard";
import detailTransaction from "reducers/detailTransaction";
import pendingUser from "reducers/pickers_old";
import pickers from "./pickers";
import detailPicker from "reducers/detailPicker";
import login from "./login";
import notification from "reducers/notification";
import { connectRouter } from "connected-react-router";

import { RouteComponentProps } from "react-router-dom";

export const isRequestAction = (action: AnyAction) => {
  return action.type.endsWith("Request");
};

export const isResponseAction = (action: AnyAction) => {
  return action.type.endsWith("Success") || action.type.endsWith("Error");
};

const rootReducer = (history: RouteComponentProps["history"]) =>
  combineReducers({
    router: connectRouter(history),
    pickers,
    transactions,
    dashboard,
    pendingUser,
    detailPicker,
    login,
    notification,
    detailTransaction,
  });

export default rootReducer;
