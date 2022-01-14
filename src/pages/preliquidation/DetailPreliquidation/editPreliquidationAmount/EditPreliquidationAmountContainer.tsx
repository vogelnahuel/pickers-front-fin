import { useMemo } from "react";
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

const EditPreliquidationAmountContainer = (
  props: EditPreliquidationAmountContainerProps & ConnectorProps
): JSX.Element => {
  const validateAmount = (value: number | undefined) => {
    console.log("Value: ", value);
    return true;
  };

  const validationSchema: yup.SchemaOf<PreliquidationAmountForm> = yup.object({
    actualAmount: yup.string(),
    newAmount: yup
      .number()
      .required("global:error.input.required")
      .test("errorDatePicker", "error.input.emisionDate", (value) =>
        validateAmount(value)
      ),
    reason: yup.string().required("global:error.input.required"),
  });

  const initialValues: PreliquidationAmountForm = useMemo(() => {
    return {
      actualAmount: `$${10}`,
      newAmount: "",
      reason: "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.preliquidation]);


  if(!props.showModal) return <></>;

  return (
    <EditPreliquidationAmount
      {...props}
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
