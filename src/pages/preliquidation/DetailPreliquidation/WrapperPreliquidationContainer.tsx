import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { WrapperPreliquidation } from "./WrapperPreliquidation";
import { PagesPreliquidationTypes, WrapperPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector, actions } from "reducers/preliquidation";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";
import {
  actions as preliActions,
} from "reducers/preliquidation";
import { useEffect } from "react";

export const WrapperPreliquidationContainer = (
  props: WrapperPreliquidationContainerPropsType
): JSX.Element => {
  useEffect(() => {
    props.getDetailPreliquidation(1)

}, [])
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
  setActualPage: (page: PagesPreliquidationTypes) => {
    dispatch(actions.setActualPage(page));
  },
  getDetailPreliquidation: (id:number)=>{
    dispatch(preliActions.getDetailPreliquidationsRequest(id))
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperPreliquidationContainer);
