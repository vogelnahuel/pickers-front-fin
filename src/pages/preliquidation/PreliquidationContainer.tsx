import React from "react";
import { connect } from "react-redux";
import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";
import { AppDispatch, RootState } from "store";
import { Preliquidation } from "./Preliquidation";
import { actions as preliActions } from "../../reducers/preliquidation";

const PreliquidationContainer = (props: any): JSX.Element => {
  return <Preliquidation {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: false,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    dispatch(preliActions.getPreliquidationsRequest(params));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationContainer);
