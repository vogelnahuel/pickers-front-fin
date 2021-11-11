import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Pickers } from "pages/pickers/Pickers";
import { titlesAdminPending, titlesAdminActive } from "utils/constants";
import {
  PickersParamsType,
  ParamsMiddlewareType,
  PickerContainerTypes,
} from "./types";
import { AppDispatch, RootState } from "store";
import { actions, pickersSelector } from "reducers/pickers";

const PendingUserAdminContainer: React.FC<PickerContainerTypes> = (
  props
): JSX.Element => {
  useEffect(() => {
    const filters =
      props.actualPage === "PENDING"
        ? { pickerStatusId: "2,3" }
        : { pickerStatusId: "4,5" };
    const filtersExtra = { limit: 3 };
    props.setPendingUserExtraFilters(filtersExtra);
    props.setPendingUserFilters(filters);
    const request = { ...filtersExtra, ...filters };
    console.log("Request: ", request);
    props.getPendingUser({ ...filtersExtra, ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.actualPage]);

  return (
    <Pickers
      {...props}
      tableTitles={
        props.actualPage === "PENDING" ? titlesAdminPending : titlesAdminActive
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  pendingUsers: pickersSelector(state).users,
  isFetching: pickersSelector(state).fetching,
  filters: pickersSelector(state).filters,
  filtersExtra: pickersSelector(state).filtersExtra,
  filtersExtraSeeMore: pickersSelector(state).filtersExtraSeeMore,
  seeMore: pickersSelector(state).seeMore,
  actualPage: pickersSelector(state).actualPage,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  reset: () => {
    dispatch(actions.reset());
  },
  getPendingUser: (params: ParamsMiddlewareType) => {
    dispatch(actions.getPendingUserRequest(params));
  },
  setPendingUserFilters: (filters: PickersParamsType) => {
    dispatch(actions.setPendingUserFilters(filters));
  },
  setPendingUserExtraFilters: (extraFilters: PickersParamsType) => {
    dispatch(actions.setPendingUserExtraFilters(extraFilters));
  },
  setActualPage: (page: string) => {
    dispatch(actions.setActualPage(page));
  },
  getPendingUsersExportRequest: (
    params: ParamsMiddlewareType,
    element: HTMLElement
  ) => {
    dispatch(actions.getPendingUserExportRequest({ params, element }));
  },
  getMorePendingUser: (params: ParamsMiddlewareType) => {
    dispatch(actions.getMorePendingUserRequest(params));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingUserAdminContainer);
