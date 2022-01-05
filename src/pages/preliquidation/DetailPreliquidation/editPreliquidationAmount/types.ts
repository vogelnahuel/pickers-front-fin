import { DetailPreliquidationsType } from "reducers/types/preliquidation";

export type EditPreliquidationAmountContainerProps = {
  preliquidation: DetailPreliquidationsType;
};

export type EditPreliquidationAmountProps = {
  preliquidation: DetailPreliquidationsType;
  onClose: () => void;
};
