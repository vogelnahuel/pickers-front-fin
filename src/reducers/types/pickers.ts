import {
  PickerType,
  ParamsMiddlewareType,
  PickersParamsType,
} from "pages/pickers/types";

export type PickersTypes = {
  PENDING_USER_GET_REQUEST: string;
  PENDING_USER_GET_SUCCESS: string;
  PENDING_USER_GET_ERROR: string;
  PENDING_USER_SET_FILTERS: string;
  PENDING_USER_SET_EXTRA_FILTERS: string;
  PENDING_USER_SET_ACTUAL_PAGE: string;
  PENDING_USER_EXPORT_GET_REQUEST: string;
  PENDING_USER_EXPORT_GET_SUCCESS: string;
  PENDING_USER_EXPORT_GET_ERROR: string;
  PENDING_USER_GET_MORE_REQUEST: string;
  PENDING_USER_GET_MORE_SUCCESS: string;
  PENDING_USER_GET_MORE_ERROR: string;
  PENDING_USER_RESET: string;
};

export type PickerStateType = {
  fetching: boolean;
  users: PickerType[];
  filters: PickersParamsType;
  filtersExtra: {
    limit: Number;
    offset: Number;
  };
  filtersExtraSeeMore: {
    limit: number;
    offset: number;
  };
  seeMore: Boolean;
  sizePage: Number;
  actualPage: String;
};

export type SelectorType = {
  isFetching: Function;
  getPendingUser: Function;
  getFilters: Function;
  getFiltersExtra: Function;
  getFiltersExtraSeeMore: Function;
  getSeeMore: Function;
  getSizePage: Function;
  getActualPage: Function;
};

export type ActionTypePickers = {
  type: string;
  pendingUsers: {
    limit: number;
    offset: number;
    hasMore: boolean;
    items: any;
  };
  filters?: ParamsMiddlewareType;
  extraFilters?: ParamsMiddlewareType;
  page?: String;
};

export type ActionsType = {
  reset: Function;
  getPendingUserRequest: Function;
  getPendingUserSuccess: Function;
  getPendingUserError: Function;
  setPendingUserFilters: Function;
  setActualPage: Function;
  setPendingUserExtraFilters: Function;
  getMorePendingUserRequest: Function;
  getMorePendingUserSuccess: Function;
  getMorePendingUserError: Function;
  getPendingUserExportRequest: Function;
  getPendingUserExportSuccess: Function;
  getPendingUserExportError: Function;
};
