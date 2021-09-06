import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router'; // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router';
import DashboardContainer from 'pages/dashboard/DashboardAdminContainer';
import {EmailRestore} from 'pages/login/email/EmailRestore';
import Login from 'pages/login/LoginContainer'
import {RestorePassword} from 'pages/login/restorePassword/RestorePassword';
import PendingUserAdmin from 'pages/admin/PendingUser/PickersContainer'
import PendingUserAdminPicker from 'pages/admin/pendingUserAdminPicker/PendingUserAdminPickerContainer';
import Transaction from 'pages/transaction/TransactionContainer';
import {Liquidation} from 'pages/pre-liquidation/Liquidation'
import {Planning} from 'pages/planning/Planning'
import {ConfigPicker} from 'pages/settingPickers/ConfigPicker'
import store, {history} from 'store'

            //TODO cambiar path de pickers
function Routes() {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/restore/:mail/:cod' exact component={RestorePassword}/>
            <Route path='/restore' exact component={EmailRestore}/>
            <Route path='/Dashboard' exact component={DashboardContainer}/>
            <Route path='/pendingUserAdmin' exact component={PendingUserAdmin}/>
            {/* <Route path='/activeUserAdmin' exact component={ActiveUserAdmin}/> */}
            <Route path='/pendingUserAdminpicker/:id' exact component={PendingUserAdminPicker}/>
            {/* <Route path='/activeUserAdminpicker/:id' exact component={ActiveUserAdminPicker}/> */}
            <Route path='/transaction' exact component={Transaction}/>
            {/* <Route path='/transaction/:filterParams' exact component={Transaction}/> */}
            <Route path='/planning' exact component={Planning}/>
            <Route path='/configPicker' exact component={ConfigPicker}/>
            <Route path='/liquidation' exact component={Liquidation}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
  );
}

export default Routes;
