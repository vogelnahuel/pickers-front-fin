import { PreliquidationItem } from "sagas/types/preliquidation";
import { PreliquidationFiltersType } from "../filter/types";

export type TablePreliquidationProps = {
  items: PreliquidationItem[];
  preliquidationsSelected?: PreliquidationItem[];
  toggleItem?: (item: PreliquidationItem) => void;
  toggleAll?: () => void;
  isAllSelected?: boolean;
  approved:boolean;
  resetAllSelected:()=>void;
  setPreliquidationFilters:(filters: PreliquidationFiltersType)=>void;
};
