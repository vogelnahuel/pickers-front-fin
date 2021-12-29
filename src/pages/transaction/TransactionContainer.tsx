import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  actions as transactionActions,
  transactionsSelector,
} from "reducers/transactions";
import { Transaction } from "pages/transaction/Transaction";
import { useLocation } from "react-router-dom";
import parseQueryParams from "utils/parseQueryParams";
import moment from "moment";
import { AppDispatch, RootState } from "store";
import {
  TransactionContainerPropsType,
  URLTransactionContainerType,
} from "./types";
import { FilterTransactionsType } from "sagas/types/transactions";
import { SetFilterExtraType, SetFilterType } from "reducers/types/transaction";
import { DATE_FORMATS } from "utils/constants";

const TransactionContainer: React.FC<TransactionContainerPropsType> = (
  props
): JSX.Element => {
  const params = useLocation();
  const [resolutionHeightModal, setresolutionHeightModal] = useState(550);

  useEffect(() => {
    if (window.innerWidth < 1300) {
      setresolutionHeightModal(496);
    }
    if (window.innerWidth > 1900) {
      setresolutionHeightModal(675);
    }
    props.reset();

    const filters: URLTransactionContainerType = parseQueryParams(
      params.search
    );
    filters.inAlert = Boolean(filters.inAlert);

    filters.maxMinDeliveryDate &&
      (filters.date = {
        from: moment(
          filters.minMinDeliveryDate,
          DATE_FORMATS.shortISODate
        ).format(DATE_FORMATS.shortDate),
        until: moment(
          filters.maxMinDeliveryDate,
          DATE_FORMATS.shortISODate
        ).format(DATE_FORMATS.shortDate),
      });
    const filtersExtra = { limit: window.innerHeight < 770 ? 3 : 4 };
    props.setExtraFilters(filtersExtra);
    props.getTransactions({ ...filtersExtra, ...filters });
    props.setFilters(filters || {});
    // eslint-disable-next-line
  }, []);

  return (
    <Transaction resolutionHeightModal={resolutionHeightModal} {...props} />
  );
};

const mapStateToProps = (state: RootState) => ({
  transactions: transactionsSelector(state).transactions,
  isFetching: transactionsSelector(state).fetching,
  isExportDisabled: transactionsSelector(state).exportDisabled,
  filters: transactionsSelector(state).filters,
  filtersExtra: transactionsSelector(state).filtersExtra,
  seeMore: transactionsSelector(state).seeMore,
  filtersExtraSeeMore: transactionsSelector(state).filtersExtraSeeMore,
  detailTransactionModalOpen:
    transactionsSelector(state).detailTransactionModalOpen,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getTransactionsExportRequest: (
    params: FilterTransactionsType,
    element: HTMLElement
  ) => {
    element.blur();
    dispatch(transactionActions.getTransactionsExportRequest(params));
  },
  getTransactions: (params: FilterTransactionsType) => {
    dispatch(transactionActions.getTransactionsRequest(params));
  },
  reset: () => {
    dispatch(transactionActions.reset());
  },
  setFilters: (filters: SetFilterType) => {
    dispatch(transactionActions.setTransactionFilters(filters));
  },
  setExtraFilters: (extraFilters: SetFilterExtraType) => {
    dispatch(transactionActions.setTransactionExtraFilters(extraFilters));
  },
  getMoreTransactions: (params: FilterTransactionsType) => {
    dispatch(transactionActions.getMoreTransactionsRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionContainer);
