import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
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
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
