import { PickersParamsType } from "pages/pickers/types";

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


export type StateType = {
  fetching: boolean,
  users: any[],
  filters: PickersParamsType,
  filtersExtra: {
      limit: Number,
      offset: Number
  },
  filtersExtraSeeMore: {
      limit: Number,
      offset: Number
  },
  seeMore: Boolean,
  pag: Number,
  actualPage: String,
}
