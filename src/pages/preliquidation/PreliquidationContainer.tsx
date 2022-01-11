import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";
import { AppDispatch, RootState } from "store";
import { Preliquidation } from "./Preliquidation";
import {
  actions as preliActions,
  preliquidationSelector,
} from "../../reducers/preliquidation";
import { actions as notificationActions } from "../../reducers/notification";
import { PreliquidationContainerProps } from "./types";
import { NotificationStateType } from "reducers/types/notification";
import i18next from "i18next";
import { PreliquidationFilterExtraType } from "./filter/types";

const PreliquidationContainer = (
  props: PreliquidationContainerProps
): JSX.Element => {
  useEffect(() => {
    const filtersExtra = { limit: window.innerHeight < 770 ? 3 : 4, offset: 0 };
    props.setPreliquidationExtraFilters(filtersExtra);
    props.getPreliquidations({ ...filtersExtra });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToAccounting = () => {
    const namespace = "preli:label.modal";
    const { numberOfPreliSelected: n } = props;
    const word = i18next.t(`${namespace}.preliquidation${n > 1 ? "s" : ""}`);
    props.showNotification({
      level: "warning",
      title: i18next.t("preli:title.modal.sendToAccounting"),
      body: i18next.t(`${namespace}.sendToAccounting`, {
        quantity: `<span class="preliquidation-quantity">${n} ${word}</span>`,
      }),
      onCloseLabel: i18next.t("global:label.button.cancel"),
      onClickLabel: i18next.t("preli:label.button.send"),
      onClose: undefined,
      onClick: () => console.log("Send"),
    });
  };

  return <Preliquidation {...props} sendToAccounting={sendToAccounting} />;
};

const mapStateToProps = (state: RootState) => ({
  preliquidations: preliquidationSelector(state).preliquidations,
  isFetching: preliquidationSelector(state).fetching,
  filters: preliquidationSelector(state).filters,
  filtersExtra: preliquidationSelector(state).filtersExtra,
  filtersExtraSeeMore: preliquidationSelector(state).filtersExtraSeeMore,
  seeMore: preliquidationSelector(state).seeMore,
  numberOfPreliSelected:
    preliquidationSelector(state).preliquidationsSelected.length,
  anyPreliquidationSelected:
    preliquidationSelector(state).preliquidationsSelected.length > 0,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    dispatch(preliActions.getPreliquidationsRequest(params));
  },
  setPreliquidationExtraFilters: (params: PreliquidationFilterExtraType) => {
    dispatch(preliActions.setPreliquidationExtraFilters(params));
  },
  getMorePreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    dispatch(preliActions.getMorePreliquidationsRequest(params));
  },
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationContainer);
