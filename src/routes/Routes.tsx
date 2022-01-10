import React from "react";
import EmailRestore from "pages/login/email/EmailRestoreContainer";
import Login from "pages/login/LoginContainer";
import RestorePassword from "pages/login/restorePassword/RestorePasswordContainer";
import DetailPickerContainer from "pages/pickers/detailPicker/DetailPickerContainer";
import PickersContainer from "pages/pickers/PickersContainer";
import { Route, Switch } from "react-router"; // react-router v4/v5
import DashboardContainer from "../pages/dashboard/DashboardAdminContainer";
import Transaction from "../pages/transaction/TransactionContainer";
import { DetailPreliquidationContainer } from "pages/preliquidation/DetailPreliquidation/DetailPreliquidationContainer";
import PreliquidationContainer from "pages/preliquidation/PreliquidationContainer";
import useScrollToTop from "../hooks/useScrollToTop";

const Routes = (): JSX.Element => {

  useScrollToTop();
  return (

    
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/restore/:mail/:cod" exact component={RestorePassword} />
          <Route path="/restore" exact component={EmailRestore} />
          <Route path="/dashboard" exact component={DashboardContainer} />
          <Route path="/pickers" exact component={PickersContainer} />
          <Route path="/pickers/:id" exact component={DetailPickerContainer} />
          <Route path="/transaction" exact component={Transaction} />
          <Route
            path="/presettlements"
            exact
            component={PreliquidationContainer}
          />
          <Route
            path="/presettlements/:id"
            exact
            component={DetailPreliquidationContainer}
          />
        </Switch>

  );
};

export default Routes;
