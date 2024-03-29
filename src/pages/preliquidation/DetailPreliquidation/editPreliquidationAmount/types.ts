import { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { DetailPreliquidationsType } from "reducers/types/preliquidation";
import { LoadingButtonState } from "component/loadingButton/types";

export type EditPreliquidationAmountContainerProps = {
  preliquidation: DetailPreliquidationsType;
};

export type EditPreliquidationAmountProps = {
  validationSchema: yup.SchemaOf<PreliquidationAmountForm>;
  initialValues: PreliquidationAmountForm;
  preliquidation: DetailPreliquidationsType;
  increase: boolean;
  adjustingAmount: LoadingButtonState;
  onSubmit: (values: PreliquidationAmountForm) => void;
  setIncrease: Dispatch<SetStateAction<boolean>>
  onClose: (reload?: boolean) => void;
};

export type PreliquidationAmountForm = {
  actualAmount: string | undefined;
  newAmount: number | string;
  reason: string;
}