import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { useHistory } from "react-router-dom";
import { DetailPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector } from "reducers/preliquidation";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";
import i18next from "i18next";

export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
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
