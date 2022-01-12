import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";

export type PreliquidationFilterContainerPropsType = {
  filters: PreliquidationFiltersType;
  filtersExtra: PreliquidationFilterExtraType;
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  setPreliquidationFilters: (params: PreliquidationFiltersType) => void;
  reset: () => void;
  resetAllSelected: () => void;
};

export type PreliquidationFilterPropsType = {
  onSubmit: Function;
  filters: PreliquidationFiltersType;
  validationSchema: object;
};
export type PreliquidationFilterExtraType = {
  limit: number;
  offset: number;
};

export type PreliquidationFiltersType = {
  presettlementId?: number;
  fiscalNumber?: string;
  generatedAt?: string;
  status?: string;
};
export type filterPreliquidationValidationSchema = {
  presettlementId?: string;
  fiscalNumber?: string;
};
