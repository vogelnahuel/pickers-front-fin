import React, {useEffect} from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {Transaction} from "pages/transaction/Transaction"
import {useLocation} from "react-router-dom";
import parseQueryParams from "utils/parseQueryParams"
import moment from "moment";
import { AppDispatch, RootState } from "store";
import { TransactionContainerType, URLTransactionContainerType } from "./types";
import { paramsTypeGetTransaction } from "sagas/types/transactions";

const TransactionContainer = (props:TransactionContainerType) => {
    const params = useLocation()
    useEffect(() => {
        props.reset();

        const filters:URLTransactionContainerType = parseQueryParams(params.search);

        filters.maxMinDeliveryDate && (filters.date = { from: moment(filters.minMinDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY"), until: moment(filters.maxMinDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY") });
        const filtersExtra={limit:window.screen.height<770 ? 3 : 4};
        props.setExtraFilters(filtersExtra);
        props.getTransactions({...filtersExtra, ...filters});
        props.setFilters(filters || {});
        // eslint-disable-next-line
    }, [])

    return (
        <Transaction isExportDisabled={false} isFetching={false} transactions={[]} getMoreTransactions={Function} getTransactionsExportRequest={Function} filters={Function} seeMore={Function} filtersExtraSeeMore={Function} {...props}/>
    );
}


const mapStateToProps = (state:RootState) => ({
    transactions: transactionSelectors.getTransactions(state),
    isFetching: transactionSelectors.isFetching(state),
    isExportDisabled: transactionSelectors.isExportDisabled(state),
    filters: transactionSelectors.getFilters(state),
    filtersExtra: transactionSelectors.getFiltersExtra(state),
    seeMore: transactionSelectors.getSeeMore(state),
    filtersExtraSeeMore: transactionSelectors.getFiltersExtraSeeMore(state),
});


const mapDispatchToProps = (dispatch:AppDispatch) => ({
    getTransactionsExportRequest: (params:URLTransactionContainerType,element:HTMLElement) => {
        dispatch(transactionActions.getTransactionsExportRequest(params,element));
    },
    getTransactions: (params:paramsTypeGetTransaction) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    reset: () => {
        dispatch(transactionActions.reset());
    },
    setFilters: (filters:Function) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
    setExtraFilters: (extraFilters:Function) => {
        dispatch(transactionActions.setTransactionExtraFilters(extraFilters));
    },
    getMoreTransactions: (params:paramsTypeGetTransaction) => {
        dispatch(transactionActions.getMoreTransactionsRequest(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
