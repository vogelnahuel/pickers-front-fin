import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DashBoard from '../pages/login/dashboard/DashBoard';
import Login from '../pages/login/Login'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/dashboard' exact component={DashBoard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
