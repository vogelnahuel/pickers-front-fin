import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";
import { AppDispatch, RootState } from "store";
import { Preliquidation } from "./Preliquidation";
import { actions as preliActions, preliquidationSelector } from "../../reducers/preliquidation";

const PreliquidationContainer = (props: any): JSX.Element => {
  useEffect(() => {
    console.log("-INGRESA AL USEEFFECT")
    // const filtersExtra = { limit: 3 };
    // props.setPreliquidationExtraFilters(filtersExtra);
    // props.getPreliquidations({ ...filtersExtra });
    //props.setPendingUserFilters(filters);
    //props.getPendingUser({ ...filtersExtra, ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Preliquidation {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  preliquidations: preliquidationSelector(state).preliquidations,
  isFetching: preliquidationSelector(state).fetching,
  filters: preliquidationSelector(state).filters,
  filtersExtra: preliquidationSelector(state).filtersExtra,
  filtersExtraSeeMore: preliquidationSelector(state).filtersExtraSeeMore,
  seeMore: preliquidationSelector(state).seeMore
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    console.log("Ingresa al dispatch")
    dispatch(preliActions.getPreliquidationsRequest(params));
  },
  setPreliquidationExtraFilters: (params: any) => {
    dispatch(preliActions.setPreliquidationExtraFilters(params))
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationContainer);
