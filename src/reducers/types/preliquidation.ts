import { DetailPreliquidationsContentResponseType, PreliquidationItem } from "sagas/types/preliquidation";




export type PreliquidationFilterExtraType = {
  limit: number;
    offset: number;
}

export type PreliquitadionStateType = {
  fetching: boolean;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
  preliquidationsSelected: PreliquidationItem[];
  filters: any;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  detailPreliquidations:DetailPreliquidationsContentResponseType
};
