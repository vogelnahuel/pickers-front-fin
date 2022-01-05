import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "store";
import { EditPreliquidationAmount } from "./EditPreliquidationAmount";
import { EditPreliquidationAmountContainerProps } from "./types";
import {
  actions as preliActions,
  preliquidationSelector,
} from "reducers/preliquidation";

const EditPreliquidationAmountContainer = (
  props: EditPreliquidationAmountContainerProps & ConnectorProps
): JSX.Element => {
  return <EditPreliquidationAmount {...props} />;
};

const mapStateToProps = (state: RootState) => ({
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
