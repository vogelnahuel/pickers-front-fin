import React from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { DetailPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector,actions } from "reducers/preliquidation";
import { useHistory } from "react-router-dom";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";


export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
): JSX.Element => {
  const history = useHistory();

  const changePage = (page: string) => {

     if (props.actualPage !== page) 
      props.setActualPage(page);
  };
  
  const handleClickBack = () => {
     history.goBack();
   };

  return <DetailPreliquidation  handleClickBack ={handleClickBack} changePage={changePage} {...props} />;


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
)(DetailPreliquidationContainer);

