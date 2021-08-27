import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import { FilterTransaction } from "pages/transaction/filterTransaction/FilterTransaction"
import { useLocation } from "react-router-dom";
import parseQueryParams from "utils/queryParams/parseQueryParams" 
// import { ThemeContext } from "styled-components";
// import PropTypes, { bool, func, number } from "prop-types";
// import { Form, Formik } from "formik";
// import { goBack } from "react-router-redux";

const FilterTransactionContainer = (props) => {
    // useEffect(() => {
    //     const filters = parseQueryParams(params.search)
    //     props.setFilters({...props.filters, ...filters});
    //     props.getTransactions({...props.filters, ...filters});
    // }, [])

    return (
        <FilterTransaction {...props}/>
    );
}


const mapStateToProps = (state) => ({
    // transactions: transactionSelectors.getTransactions(state),
    // isFetching: transactionSelectors.isFetching(state),
    // isExportDisabled: transactionSelectors.isExportDisabled(state),
    filters: transactionSelectors.getFilters(state),
});


const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    setFilters: (filters) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
    setExportEnabled: () => {
        dispatch(transactionActions.setExportEnabled());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTransactionContainer);
