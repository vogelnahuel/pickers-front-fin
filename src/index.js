import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import "./index.css"
import { Dashboard } from './pages/admin/Dashboard';


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

