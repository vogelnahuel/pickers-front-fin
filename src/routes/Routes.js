import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { DashboardAdmin } from '../pages/admin/DashboardAdmin';
import {EmailRestore} from '../pages/login/email/EmailRestore';
import Login from '../pages/login/Login'
import { RestorePassword } from '../pages/login/restorePassword/RestorePassword';
import {PendingUserAdmin} from '../pages/admin/PendingUser/PendingUserAdmin'
import {ActiveUserAdmin} from '../pages/admin/ActiveUser/ActiveUserAdmin'
import { PendingUserAdminPicker } from '../pages/admin/pendingUserAdminPicker/PendingUserAdminPicker';
import { ActiveUserAdminPicker } from '../pages/admin/ActiveUserAdminPicker/ActiveUserAdminPicker';
import { Transaction } from '../pages/transaction/Transaction';
import {Liquidation} from '../pages/pre-liquidation/Liquidation'
import {Planning} from '../pages/planning/Planning'
import {ConfigPicker} from '../pages/settingPickers/ConfigPicker'
import { Provider } from 'react-redux';
import store from '../store';



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <Route path='/' exact component={Login}/>
          <Route path='/restore/:mail/:cod' exact component={RestorePassword}/>
          <Route path='/restore' exact component={EmailRestore}/>
          <Route path='/Dashboard' exact component={DashboardAdmin}/>
          <Route path='/pendingUserAdmin' exact component={PendingUserAdmin}/>
          <Route path='/activeUserAdmin' exact component={ActiveUserAdmin}/>
          <Route path='/pendingUserAdminpicker/:id' exact component={PendingUserAdminPicker}/>
          <Route path='/activeUserAdminpicker/:id' exact component={ActiveUserAdminPicker}/>
          <Route path='/transaction' exact component={Transaction}/>
          <Route path='/planning' exact component={Planning}/>
          <Route path='/configPicker' exact component={ConfigPicker}/>
          <Route path='/liquidation' exact component={Liquidation}/>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
