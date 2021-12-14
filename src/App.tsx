import { useTheming } from "config/theme";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import Routes from "routes/Routes";
import { history, store } from "./store";

export const App = () => {

  useTheming();
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Routes/>
      </ConnectedRouter>
    </Provider>
  );
};
