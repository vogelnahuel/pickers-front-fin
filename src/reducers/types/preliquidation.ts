import { PreliquidationItem } from "sagas/types/preliquidation";

export type PreliquitadionStateType = {
  fetching: boolean;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
  filters: any;
  filtersExtra: any;
  filtersExtraSeeMore: any;
};
