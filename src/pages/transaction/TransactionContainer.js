import React, {useEffect} from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {Transaction} from "pages/transaction/Transaction"
import {useLocation} from "react-router-dom";
import parseQueryParams from "utils/parseQueryParams"

const TransactionContainer = (props) => {
    const params = useLocation()
    useEffect(() => {
        props.reset();
        const filters = parseQueryParams(params.search);
        filters.maxMinDeliveryDate && (filters.date = { from: filters.minMinDeliveryDate, until: filters.maxMinDeliveryDate });
        const filtersExtra={limit:window.screen.height<770 ? 3 : 4};
        props.setExtraFilters(filtersExtra);
        props.getTransactions({...filtersExtra, ...filters});
        props.setFilters(filters || {});
        // eslint-disable-next-line
    }, [])

    return (
        <Transaction {...props}/>
    );
}


const mapStateToProps = (state) => ({
    transactions: transactionSelectors.getTransactions(state),
    isFetching: transactionSelectors.isFetching(state),
    isExportDisabled: transactionSelectors.isExportDisabled(state),
    filters: transactionSelectors.getFilters(state),
    filtersExtra: transactionSelectors.getFiltersExtra(state),
    seeMore: transactionSelectors.getSeeMore(state),
    filtersExtraSeeMore: transactionSelectors.getFiltersExtraSeeMore(state),
    openErrorDatePicker:transactionSelectors.getOpenErrorDatePicker(state)
});


const mapDispatchToProps = (dispatch) => ({
    getTransactionsExportRequest: (params,element) => {
        dispatch(transactionActions.getTransactionsExportRequest(params,element));
    },
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    reset: () => {
        dispatch(transactionActions.reset());
    },
    setFilters: (filters) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
    setExtraFilters: (extraFilters) => {
        dispatch(transactionActions.setTransactionExtraFilters(extraFilters));
    },
    getMoreTransactions: (params) => {
        dispatch(transactionActions.getMoreTransactionsRequest(params));
    },
    setOpenErrorDatePicker: (param) => {
        dispatch(transactionActions.setOpenErrorDatePicker(param));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
