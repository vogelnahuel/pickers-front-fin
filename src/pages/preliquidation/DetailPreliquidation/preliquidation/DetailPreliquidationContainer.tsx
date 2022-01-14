import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import { DetailPreliquidationContainerPropsType } from "./types";
import { preliquidationSelector, actions } from "reducers/preliquidation";
import { useHistory, useParams } from "react-router-dom";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";
import { PagesPreliquidationTypes } from "../types";
import { getDetailPreliquidations } from "middleware/preliquidations";

export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
): JSX.Element => {
  const history = useHistory();
  const params: { id?: string } = useParams();

  console.log(props.detailPreliquidation)
  const changePage = (page: PagesPreliquidationTypes) => {
    if (props.actualPage !== page) props.setActualPage(page);
  };

  const handleClickBack = () => {
    history.goBack();
  };

  useEffect(() => {
    props.getDetailPreliquidation(1);
  }, [])

  return (
    <DetailPreliquidation
      initialValues={undefined}
      handleClickBack={handleClickBack}
      changePage={changePage}
      presettementId={params.id}
      {...props}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  actualPage: preliquidationSelector(state).actualPage,
  detailPreliquidation: preliquidationSelector(state).detailPreliquidations,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
  setActualPage: (page: PagesPreliquidationTypes) => {
    dispatch(actions.setActualPage(page));
  },
  getDetailPreliquidation: (id: number) => {
    dispatch(actions.getDetailPreliquidationsRequest(id))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPreliquidationContainer);
