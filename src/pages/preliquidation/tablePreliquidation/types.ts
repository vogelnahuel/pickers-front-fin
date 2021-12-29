import { PreliquidationItem } from "sagas/types/preliquidation";

export type TablePreliquidationProps = {
  items: PreliquidationItem[];
  preliquidationsSelected?: PreliquidationItem[];
  toggleItem?: (item: PreliquidationItem) => void;
  toggleAll?: () => void;
  isAllSelected?: boolean;
  approved:boolean;
};
