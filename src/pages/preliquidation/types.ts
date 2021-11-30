import { PreliquidationFilterExtraType } from "reducers/types/preliquidation"
import { PreliquidationItem, PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation"

export type PreliquidationContainerProps = {
  preliquidations: PreliquidationItem[],
  isFetching: boolean,
  filters: any,
  filtersExtra: PreliquidationFilterExtraType,
  filtersExtraSeeMore: PreliquidationFilterExtraType,
  seeMore: boolean,
  anyPreliquidationSelected: boolean,
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void,
  setPreliquidationExtraFilters: (params: PreliquidationFilterExtraType) => void,
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => void,
}