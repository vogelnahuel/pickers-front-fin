import { NotificationStateType } from "reducers/types/notification";
import {
  PreliquidationItem,
  PreliquidationParamsMiddlewareType,
} from "sagas/types/preliquidation";
import { PreliquidationFilterExtraType } from "./filter/types";

export type PreliquidationContainerProps = {
  preliquidations: PreliquidationItem[];
  isFetching: boolean;
  filters: PreliquidationParamsMiddlewareType;
  filtersExtra: PreliquidationFilterExtraType;
  filtersExtraSeeMore: PreliquidationFilterExtraType;
  seeMore: boolean;
  anyPreliquidationSelected: boolean;
  numberOfPreliSelected: number;
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  setPreliquidationExtraFilters: (
    params: PreliquidationFilterExtraType
  ) => void;
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  showNotification: (content: NotificationStateType) => void;
};

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
  setPreliquidationExtraFilters: (
    params: PreliquidationFilterExtraType
  ) => void;
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => void;
  sendToAccounting: () => void;
};
