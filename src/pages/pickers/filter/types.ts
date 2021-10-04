import { ParamsTypeMiddleware } from "../types";

export type FilterContainerTypes = {
  reset: Function;
  setPendingUserFilters: Function;
  getPendingUser: Function;
  filters: ParamsTypeMiddleware;
  filtersExtra: ParamsTypeMiddleware;
};

export type FilterTypes = {
  onSubmit: any;
  filters: ParamsTypeMiddleware;
  validationSchema: Object;
};
