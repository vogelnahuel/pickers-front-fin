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
      .number()
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
      actualAmount: `$${10}`,
      newAmount: "",
      reason: "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.preliquidation]);

  if (!props.showModal) return <></>;

  return (
    <EditPreliquidationAmount
      {...props}
      increase={increase}
      setIncrease={setIncrease}
      validationSchema={validationSchema}
      initialValues={initialValues}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  showModal: preliquidationSelector(state).showEditPreliquidationModal,
  preliquidation: preliquidationSelector(state).detailPreliquidations,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClose: () => {
    dispatch(preliActions.toggleModalVisibility(false));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(EditPreliquidationAmountContainer);
