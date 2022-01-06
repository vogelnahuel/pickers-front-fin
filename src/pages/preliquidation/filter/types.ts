import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";

export type PreliquidationFilterContainerPropsType = {
  filters: PreliquidationFiltersType;
  filtersExtra: PreliquidationFilterExtraType;
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  setPreliquidationFilters: (params: PreliquidationFiltersType) => void;
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

export type generatedAtType = {
  from: string;
};

export type PreliquidationFiltersType = {
  presettlmentId?: number;
  fiscalNumber?: string;
  generatedAt?:  generatedAtType;
  status?: string;
};
export type filterPreliquidationValidationSchema = {
  presettlmentId?: string;
  fiscalNumber?: string;
};