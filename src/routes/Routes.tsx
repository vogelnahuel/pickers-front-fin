import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router'; // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router';
import DashboardContainer from '../pages/dashboard/DashboardAdminContainer';
import Login from 'pages/login/LoginContainer'
import RestorePassword from 'pages/login/restorePassword/RestorePasswordContainer';
import PickersContainer from 'pages/pickers/PickersContainer'
import DetailPickerContainer from 'pages/pickers/detailPicker/DetailPickerContainer';
import Transaction from 'pages/transaction/TransactionContainer';
import store, {history} from 'store'
import EmailRestore from 'pages/login/email/EmailRestoreContainer';

function Routes():JSX.Element {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact  component={Login}/>
            <Route path='/restore/:mail/:cod' exact component={RestorePassword}/>
            <Route path='/restore' exact component={EmailRestore}/>
            <Route path='/dashboard' exact component={DashboardContainer}/>
            <Route path='/pickers' exact component={PickersContainer}/>
            <Route path='/pickers/:id' exact component={DetailPickerContainer}/>
            <Route path='/transaction' exact component={Transaction}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
  );
}

export default Routes;
