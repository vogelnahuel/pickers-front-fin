import { combineReducers } from "@reduxjs/toolkit";
import transactions from "reducers/transactions";
import dashboard from "reducers/dashboard";
import detailTransaction from "reducers/detailTransaction";
import pickers from "./pickers";
import detailPicker from "reducers/detailPicker";
import login from "./login";
import notification from "reducers/notification";
import { connectRouter } from "connected-react-router";

import { RouteComponentProps } from "react-router-dom";

const rootReducer = (history: RouteComponentProps["history"]) =>
  combineReducers({
    router: connectRouter(history),
    pickers,
    transactions,
    dashboard,
    detailPicker,
    login,
    notification,
    detailTransaction,
  });

export default rootReducer;
