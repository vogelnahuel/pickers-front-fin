import * as yup from "yup";
import { DetailPreliquidationsType } from "reducers/types/preliquidation";

export type EditPreliquidationAmountContainerProps = {
  preliquidation: DetailPreliquidationsType;
};

export type EditPreliquidationAmountProps = {
  validationSchema: yup.SchemaOf<PreliquidationAmountForm>;
  initialValues: PreliquidationAmountForm;
  preliquidation: DetailPreliquidationsType;
  onClose: () => void;
};

export type PreliquidationAmountForm = {
  actualAmount: string | undefined;
  newAmount: number | string;
  reason: string;
}