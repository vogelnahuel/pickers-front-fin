import { PreliquidationItem } from "sagas/types/preliquidation";

export type PreliquitadionStateType = {
  fetching: boolean;
  seeMore: boolean;
  preliquidations: PreliquidationItem[];
};
