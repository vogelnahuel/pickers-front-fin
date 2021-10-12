import { FiltersExtraType } from "reducers/types/transaction";

export type FilterContainerPropsType = {
  filters: FilterPropsType;
  filtersExtra: FiltersExtraType;
  getTransactions: Function;
  reset: Function;
  setFilters: Function;
};

export type DateType = {
  from: string;
  until: string;
};
export type FilterDateType = {
  date?: DateType;
  maxMinDeliveryDate?: string;
  minMinDeliveryDate?: string;
};
export type FilterValuesType = {
  date: DateType;
  inAlert: boolean;
  pickerId: number;
  state: string;
  transactionCode: string;
};
export type FilterPropsType = {
  date?: DateType;
  maxMinDeliveryDate?: string;
  minMinDeliveryDate?: string;
  inAlert?: boolean;
  state?: string;
};
export type FilterTransactionPropsType = {
  onSubmit: Function;
  filters: FilterPropsType;
  validationSchema: object;
  filtersExtra: FiltersExtraType;
  getTransactions: Function;
  reset: Function;
  setFilters: Function;
};
