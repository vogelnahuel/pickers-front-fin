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
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";
import { hasPickerWrongFilesSelector } from "reducers/detailPicker";
import { pickerTabs } from "./detailPicker/types";

const PendingUserAdminContainer: React.FC<PickerContainerTypes> = (
  props
): JSX.Element => {
  const changePage = (page: string) => {

    if (props.isDetail || props.actualPage !== page) props.setActualPage(page);
  };

  useEffect(() => {
    const filters =
      props.actualPage === "PENDING"
        ? { pickerStatusId: "2,3" }
        : { pickerStatusId: "4,5" };
    const filtersExtra = { limit: 3 };
    props.setPendingUserExtraFilters(filtersExtra);
    props.setPendingUserFilters(filters);
    props.getPendingUser({ ...filtersExtra, ...filters });
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.actualPage]);

  return (
    <Pickers
      {...props}
      changePage={changePage}
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
  wrongFiles: hasPickerWrongFilesSelector(state),
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
  setActualPage: (page: pickerTabs) => {
    dispatch(actions.setActualPage(page));
  },
  getPendingUsersExportRequest: (
    params: ParamsMiddlewareType,
    element: HTMLElement
  ) => {
    element.blur();
    dispatch(actions.getPendingUserExportRequest(params));
  },
  getMorePendingUser: (params: ParamsMiddlewareType) => {
    dispatch(actions.getMorePendingUserRequest(params));
  },
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingUserAdminContainer);
