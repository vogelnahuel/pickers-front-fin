import React, { useEffect } from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {FilterTransaction} from "pages/transaction/filterTransaction/FilterTransaction";
import moment from "moment";

const FilterTransactionContainer = (props) => {
    useEffect(() => {
        props.reset();
    }, [props.filters]);

    
    
    const formatDate = (date) => {
        let result ={};
        if (date) {
            result.date=date;
            if (moment(date.from, "DD/MM/YYYY").isValid()) {
                result.minMinDeliveryDate = moment(
                    date.from,
                    "DD/MM/YYYY"
                ).format("YYYY-MM-DD");
                result.maxMinDeliveryDate = moment(
                    date.until,
                    "DD/MM/YYYY"
                ).format("YYYY-MM-DD");
            }
        }
        return result;
    };

    const takeFilters = (values) => {
        let formatedDate = formatDate(values.date);
        return {
            ...formatedDate,
            state: values.state === "" ? undefined : values.state,
            pickerId: values.pickerId,
            inAlert: values.inAlert,
            transactionCode: values.transactionCode
        };
    };

    const onSubmit = (values) => {
        let filtersApplied = takeFilters(values);

        props.getTransactions({...filtersApplied, ...props.filtersExtra});
        props.setFilters(filtersApplied);
    };

    return (
        <FilterTransaction {...props} onSubmit={onSubmit} />
    );
}


const mapStateToProps = (state) => ({
    filters: transactionSelectors.getFilters(state),
    filtersExtra: transactionSelectors.getFiltersExtra(state),
});


const mapDispatchToProps = (dispatch) => ({
    reset: () => {
        dispatch(transactionActions.reset());
    },
    getTransactions: (params) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    setFilters: (filters) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTransactionContainer);
