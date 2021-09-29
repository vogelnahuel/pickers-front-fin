import { DashboardType } from "sagas/types/dashboard";

export type DashboardTypes = {
  DASHBOARD_GET_REQUEST: string;
  DASHBOARD_GET_SUCCESS: string;
  DASHBOARD_GET_ERROR: string;
};

export type ActionType = {
  getDashboardRequest: Function;
  getDashboardSuccess: Function;
  getDashboardError: Function;
};

export type SelectorType = {
  isFetching: Function;
  getDashboard: Function;
};

export type DashboardState = {
  fetching: boolean;
  dashboard: DashboardType
};

export type ActionDashboardType = {
  type: string;
  dashboard: object;
};

export type SelectorsDashboardType = {
  isFetching: Function;
  getDashboard: Function;
};