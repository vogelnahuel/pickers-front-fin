import React from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { DetailPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector } from "reducers/preliquidation";

export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
): JSX.Element => {
  return <DetailPreliquidation {...props} />;
};
const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPreliquidationContainer);

