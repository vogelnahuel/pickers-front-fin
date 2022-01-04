import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./WrapperPreliquidation";
import { WrapperPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector } from "reducers/preliquidation";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";

export const DetailPreliquidationContainer = (
  props: WrapperPreliquidationContainerPropsType
): JSX.Element => {


  return (
    <DetailPreliquidation
      {...props}

      actualPage={props.actualPage}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  actualPage: preliquidationSelector(state).actualPage,

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPreliquidation);
