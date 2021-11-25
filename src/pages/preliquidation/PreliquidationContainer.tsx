import React from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Preliquidation } from "./Preliquidation";

const PreliquidationContainer = (props: any): JSX.Element => {
  return <Preliquidation {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: false,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPreliquidations: () => {},
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationContainer);
