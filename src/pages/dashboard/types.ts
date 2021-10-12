import { DashboardType } from "sagas/types/dashboard";

export type DashboardTypes = {
  dashboard: DashboardType;
  isFetching: boolean;
};

export type DashboardContainerTypes = {
  dashboard: DashboardType;
  isFetching: boolean;
  getDashboard: Function;
};
