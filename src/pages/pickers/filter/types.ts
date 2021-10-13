import { ParamsMiddlewareType } from "../types";

export type FilterContainerTypes = {
  reset: Function;
  setPendingUserFilters: Function;
  getPendingUser: Function;
  filters: ParamsMiddlewareType;
  filtersExtra: ParamsMiddlewareType;
};
export type FilterContainerValidationSchemaTypes = {
  name?: string;
  identificationNumber?: Number | string;
  email?: string;
};

export type FilterTypes = {
  onSubmit: Function;
  filters: ParamsMiddlewareType;
  validationSchema: Object;
};
