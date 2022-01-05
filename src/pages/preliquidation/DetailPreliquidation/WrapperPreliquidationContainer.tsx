import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { WrapperPreliquidation } from "./WrapperPreliquidation";
import { WrapperPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector, actions } from "reducers/preliquidation";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";

export const WrapperPreliquidationContainer = (
  props: WrapperPreliquidationContainerPropsType
): JSX.Element => {
  return <WrapperPreliquidation {...props} actualPage={props.actualPage} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  actualPage: preliquidationSelector(state).actualPage,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
  setActualPage: (page: string) => {
    dispatch(actions.setActualPage(page));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperPreliquidationContainer);
