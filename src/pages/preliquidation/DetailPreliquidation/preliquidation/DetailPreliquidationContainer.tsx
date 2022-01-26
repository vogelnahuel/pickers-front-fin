import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "store";
import { DetailPreliquidation } from "./DetailPreliquidation";
import {
  DetailPreliquidationContainerPropsType,
  DetailPreliquidationForm,
} from "./types";
import { preliquidationSelector, actions } from "reducers/preliquidation";
import { useHistory, useParams } from "react-router-dom";
import { NotificationStateType } from "reducers/types/notification";
import { actions as notificationActions } from "reducers/notification";
import { PagesPreliquidationTypes } from "../types";
import moment from "moment";
import { DATE_FORMATS } from "utils/constants";

export const DetailPreliquidationContainer = (
  props: DetailPreliquidationContainerPropsType
): JSX.Element => {
  const history = useHistory();
  const params: { id?: string } = useParams();

  const changePage = (page: PagesPreliquidationTypes) => {
    if (props.actualPage !== page) props.setActualPage(page);
  };

  const handleClickBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (params.id) props.getDetailPreliquidation(Number(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: DetailPreliquidationForm = useMemo(() => {
    const { preliquidation } = props;
    const { fiscalNumber: fn } = preliquidation;
    return {
      status: preliquidation.status?.description || "-",
      emisionDate: preliquidation.generatedAt
        ? moment(preliquidation.generatedAt).format(DATE_FORMATS.shortDate)
        : "-",
      companyName: preliquidation.companyName || "-",
      fiscalNumber: fn
        ? `${fn.slice(0, 2)}-${fn.slice(2, 10)}-${fn.slice(10, 11)}`
        : "-",
      sapCode: preliquidation.sapCode || "-",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.preliquidation]);

  return (
    <DetailPreliquidation
      initialValues={initialValues}
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
  preliquidation: preliquidationSelector(state).detailPreliquidations,
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
  },
  toggleModalVisibility: (isOpen: boolean) => {
    dispatch(actions.toggleModalVisibility(isOpen));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPreliquidationContainer);
