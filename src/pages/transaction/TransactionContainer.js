import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import { Transaction } from "pages/transaction/Transaction"
// import { ThemeContext } from "styled-components";
// import PropTypes, { bool, func, number } from "prop-types";
// import { Form, Formik } from "formik";
// import { goBack } from "react-router-redux";

const mapStateToProps = (state) => ({
    transactions: transactionSelectors.getTransactions(state),
    isFetching: transactionSelectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
