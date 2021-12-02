import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes.tsx';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.scss"
import "./i18n/i18n"

import { createBrowserHistory } from 'history'

Sentry.init({
  dsn: "https://56030d2fde8e4cba9d0879eb7986a3d8@o550400.ingest.sentry.io/5957565",
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.REACT_APP_ENV,
  tracesSampleRate: 1.0,
});

const replaceHashPath = () => {
  const history = createBrowserHistory()
  const hash = history.location.hash
  if (hash) {
    const path = hash.replace(/^#/, '')
    if (path) {
      history.replace(path)
    }
  }
}
replaceHashPath()

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

