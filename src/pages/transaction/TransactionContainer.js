import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import { Transaction } from "pages/transaction/Transaction"
import { useLocation } from "react-router-dom";
import parseQueryParams from "utils/queryParams/parseQueryParams" 

const TransactionContainer = (props) => {
    const params = useLocation()
    useEffect(() => {
        const filters = parseQueryParams(params.search)
        props.getTransactions({...props.filtersExtra, ...filters});
        props.setFilters(filters);
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
});


const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    reset: () => {
        dispatch(transactionActions.reset());
    },
    setFilters: (filters) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
