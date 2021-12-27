
import { PreliquidationItem, PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation"
import { PreliquidationFilterExtraType } from "./filter/types"

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