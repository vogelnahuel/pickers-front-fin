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

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/restore/:mail/:cod' exact component={RestorePassword}/>
        <Route path='/restore' exact component={EmailRestore}/>
        <Route path='/Dashboard' exact component={DashboardAdmin}/>
        <Route path='/pendingUserAdmin' exact component={PendingUserAdmin}/>
        <Route path='/activeUserAdmin' exact component={ActiveUserAdmin}/>
        <Route path='/pendingUserAdminPicker' exact component={PendingUserAdminPicker}/>
        <Route path='/activeUserAdminPicker' exact component={ActiveUserAdminPicker}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
