import { useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "store";
import * as yup from "yup";
import { EditPreliquidationAmount } from "./EditPreliquidationAmount";
import {
  EditPreliquidationAmountContainerProps,
  PreliquidationAmountForm,
} from "./types";
import {
  actions as preliActions,
  preliquidationSelector,
} from "reducers/preliquidation";
import i18next from "i18next";
import { AdjustAmountMiddlewareType } from "sagas/types/preliquidation";

const EditPreliquidationAmountContainer = (
  props: EditPreliquidationAmountContainerProps & ConnectorProps
): JSX.Element => {
  const [increase, setIncrease] = useState(true);

  const validateAmount = (value: number | undefined) => {
    if (!value) return true;

    const {
      preliquidation: { manualCorrection },
    } = props;

    if (value < 0) return false;
    if (value > manualCorrection.maxAllowedPlus && increase) return false;
    if (value > manualCorrection.maxAllowedSubtract && !increase) return false;

    return true;
  };

  const validationSchema: yup.SchemaOf<PreliquidationAmountForm> = yup.object({
    actualAmount: yup.string(),
    newAmount: yup
      .mixed()
      .required(i18next.t("global:error.input.required"))
      .test(
        "rangeError",
        i18next.t("detailPreliquidation:error.input.amountExceeded"),
        validateAmount
      ),
    reason: yup.string().required(i18next.t("global:error.input.required")),
  });

  const initialValues: PreliquidationAmountForm = useMemo(() => {
    return {
      actualAmount: `$${props.preliquidation.total}`,
      newAmount: "",
      reason: "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.preliquidation]);

  const onClose = (reload?: boolean) => {
    props.onCloseModal();
    setIncrease(true);
    if (reload && props.preliquidation.id)
      props.getDetailPreliquidation(props.preliquidation.id);
  };

  const onSubmit = (values: PreliquidationAmountForm) => {
    const params: AdjustAmountMiddlewareType = {
      id: props.preliquidation.id,
      currentAmount: props.preliquidation.total,
      callback: props.getDetailPreliquidation,
      adjustment: {
        amount: Number(values.newAmount),
        reason: values.reason,
        type: increase ? "plus" : "subtract",
      },
    };
    props.adjustAmount(params);
  };
  
  if (!props.showModal) return <></>;

  return (
    <EditPreliquidationAmount
      {...props}
      onClose={onClose}
      increase={increase}
      setIncrease={setIncrease}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  showModal: preliquidationSelector(state).showEditPreliquidationModal,
  adjustingAmount: preliquidationSelector(state).adjustingAmount,
  preliquidation: preliquidationSelector(state).detailPreliquidations,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCloseModal: () => {
    dispatch(preliActions.toggleModalVisibility(false));
  },
  getDetailPreliquidation: (id: number) => {
    dispatch(preliActions.getDetailPreliquidationsRequest(id));
  },
  adjustAmount: (params: AdjustAmountMiddlewareType) => {
    dispatch(preliActions.adjustAmount(params));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(EditPreliquidationAmountContainer);
