import { NotificationStateType } from "reducers/types/notification"
import { PreliquidationFilterExtraType } from "reducers/types/preliquidation"
import { PreliquidationItem, PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation"

export type PreliquidationContainerProps = {
  preliquidations: PreliquidationItem[];
  isFetching: boolean;
  filters: any;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  seeMore: boolean;
  anyPreliquidationSelected: boolean;
  numberOfPreliSelected: number;
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  setPreliquidationExtraFilters: (params: PreliquidationFilterExtraType) => void;
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  showNotification: (content: NotificationStateType) => void;
}

export type PreliquidationsProps = {
  preliquidations: PreliquidationItem[];
  isFetching: boolean;
  filters: any;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  seeMore: boolean;
  anyPreliquidationSelected: boolean;
  numberOfPreliSelected: number;
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  setPreliquidationExtraFilters: (params: PreliquidationFilterExtraType) => void;
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  sendToAccounting: () => void;
}