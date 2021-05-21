import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { DashboardAdmin } from '../pages/admin/DashboardAdmin';
import DashBoard from '../pages/login/dashboard/DashBoard';
import Login from '../pages/login/Login'
import { RestorePassword } from '../pages/login/restorePassword/RestorePassword';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/restore' exact component={DashBoard}/>
        <Route path='/newPassword' exact component={RestorePassword}/>
        <Route path='/Dashboard' exact component={DashboardAdmin}/>
        <Route path='/pendingUserAdmin' exact component={DashboardAdmin}/>
        <Route path='/activeUserAdmin' exact component={DashboardAdmin}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
