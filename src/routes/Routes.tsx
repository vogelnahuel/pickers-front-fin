import React from "react";
import { connect, Provider } from "react-redux";
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
import { RootState, store } from "../store";
import {
  counterSelector,
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
    <CounterTestContainer />
  </Provider>
);

const CounterTest = ({ value, increment, decrement, incrementAsync }: any) => {
  //const state = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <input value={value} />
      <button onClick={increment}>Increment</button>
      <button onClick={incrementAsync}>Increment Async</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  value: counterSelector(state).value,
});

const mapDispatchToProps = (dispatch: any) => ({
  increment: () => dispatch(increment()),
  incrementAsync: () => dispatch(incrementAsync()),
  decrement: () => dispatch(decrement()),
});

const CounterTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterTest);

export default Routes;
