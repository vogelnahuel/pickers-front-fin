import React from "react";
import { Provider } from "react-redux";
// import { Route, Switch } from "react-router"; // react-router v4/v5
// import { ConnectedRouter } from "connected-react-router";
// import DashboardContainer from "../pages/dashboard/DashboardAdminContainer";
// import Login from "pages/login/LoginContainer";
// import RestorePassword from "pages/login/restorePassword/RestorePasswordContainer";
// import PickersContainer from "pages/pickers/PickersContainer";
// import DetailPickerContainer from "pages/pickers/detailPicker/DetailPickerContainer";
// import Transaction from "../pages/transaction/TransactionContainer";
// import store, { history } from "store";
// import EmailRestore from "pages/login/email/EmailRestoreContainer";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { store } from "../store";
import {
  decrement,
  increment,
  incrementAsync,
} from "slices/counter/counterSlice";

// function Routes(): JSX.Element {
//   return (
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <Switch>
//           <Route path="/" exact component={Login} />
//           <Route path="/restore/:mail/:cod" exact component={RestorePassword} />
//           <Route path="/restore" exact component={EmailRestore} />
//           <Route path="/dashboard" exact component={DashboardContainer} />
//           <Route path="/pickers" exact component={PickersContainer} />
//           <Route path="/pickers/:id" exact component={DetailPickerContainer} />
//           <Route path="/transaction" exact component={Transaction} />
//         </Switch>
//       </ConnectedRouter>
//     </Provider>
//   );
// }

const Routes = () => (
  <Provider store={store}>
    <CounterTest />
  </Provider>
);

const CounterTest = () => {
  const state = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <input value={state} />
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(incrementAsync())}>
        Increment Async
      </button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Routes;
