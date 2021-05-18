import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import "./index.css"
import { RestorePassword } from './pages/login/restorePassword/RestorePassword';


ReactDOM.render(
  <React.StrictMode>
    <RestorePassword />
  </React.StrictMode>,
  document.getElementById('root')
);

