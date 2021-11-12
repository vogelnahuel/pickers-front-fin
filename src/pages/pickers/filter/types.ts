import { ParamsMiddlewareType, PickersParamsType } from "../types";

export type FilterContainerTypes = {
  reset: Function;
  setPendingUserFilters: Function;
  getPendingUser: Function;
  //filters: ParamsMiddlewareType;
  filters: PickersParamsType;
  filtersExtra: ParamsMiddlewareType;
};
export type FilterContainerValidationSchemaTypes = {
  name?: string;
  identificationNumber?: number | string;
  email?: string;
};

export type FilterTypes = {
  onSubmit: Function;
  //filters: ParamsMiddlewareType;
  filters: PickersParamsType;
  validationSchema: Object;
};
