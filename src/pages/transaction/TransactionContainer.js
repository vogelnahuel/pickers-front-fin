import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import { Transaction } from "pages/transaction/Transaction"
import { useLocation } from "react-router-dom";
import parseQueryParams from "utils/queryParams/parseQueryParams" 
// import { ThemeContext } from "styled-components";
// import PropTypes, { bool, func, number } from "prop-types";
// import { Form, Formik } from "formik";
// import { goBack } from "react-router-redux";

const TransactionContainer = (props) => {
    const params = useLocation()
    useEffect(() => {
       
        const filters = parseQueryParams(params.search)
        console.log(filters)
        props.getTransactions(filters);
    }, [])
    
    return (
        <Transaction {...props}/>

    );
}


const mapStateToProps = (state) => ({
    transactions: transactionSelectors.getTransactions(state),
    isFetching: transactionSelectors.isFetching(state),
    filters: transactionSelectors.getFilters(state),
});


const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
