import React from "react";
import { ConnectedRouter } from "connected-react-router";
import EmailRestore from "pages/login/email/EmailRestoreContainer";
import Login from "pages/login/LoginContainer";
import RestorePassword from "pages/login/restorePassword/RestorePasswordContainer";
import DetailPickerContainer from "pages/pickers/detailPicker/DetailPickerContainer";
import PickersContainer from "pages/pickers/PickersContainer";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router"; // react-router v4/v5
import DashboardContainer from "../pages/dashboard/DashboardAdminContainer";
import { DetailPreliquidationContainer } from "pages/preliquidation/DetailPreliquidation/DetailPreliquidationContainer";
import Transaction from "../pages/transaction/TransactionContainer";
import PreliquidationContainer from "pages/preliquidation/PreliquidationContainer";
import { history, store } from "../store";
import { useTheming } from "config/theme";

const Routes = (): JSX.Element => {

  useTheming();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/restore/:mail/:cod" exact component={RestorePassword} />
          <Route path="/restore" exact component={EmailRestore} />
          <Route path="/dashboard" exact component={DashboardContainer} />
          <Route path="/pickers" exact component={PickersContainer} />
          <Route path="/pickers/:id" exact component={DetailPickerContainer} />
          <Route path="/transaction" exact component={Transaction} />
          <Route
            path="/preliquidation"
            exact
            component={PreliquidationContainer}
          />
          <Route
            path="/preliquidation/:id"
            exact
            component={DetailPreliquidationContainer}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default Routes;
