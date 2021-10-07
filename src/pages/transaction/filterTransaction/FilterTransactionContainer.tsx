import React from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {FilterTransaction} from "pages/transaction/filterTransaction/FilterTransaction";
import moment from "moment";
import * as yup from "yup";
import {VALIDATION_REGEX} from "utils/constants";
import { AppDispatch, RootState } from "store";
import { FilterTransactionsType } from "sagas/types/transactions";
import { DateType, FilterContainerPropsType, FilterDateType, FilterValuesType } from "./types";
import { SetFilterType } from "reducers/types/transaction";

const FilterTransactionContainer = (props:FilterContainerPropsType):JSX.Element => {

    const formatDate = (date:DateType):FilterDateType => {
        let result:FilterDateType={};
        if (date) {
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

    const takeFilters = (values:FilterValuesType) => {
        let formatedDate = formatDate(values.date);
        return {
            ...formatedDate,
            state: values.state === "" ? undefined : values.state,
            pickerId: values.pickerId,
            inAlert: values.inAlert,
            transactionCode: values.transactionCode
        };
    };
  

    const onSubmit = (values:FilterValuesType) => {
        let filtersApplied = takeFilters(values);
        props.getTransactions({...filtersApplied, ...props.filtersExtra});
        props.setFilters(filtersApplied);
    };

    const validationSchema =
        yup.lazy(() => {
            return yup.object({
                transactionCode: yup.string().matches(VALIDATION_REGEX.regTransactionCode,"El código ingresado es erróneo"),
                pickerId:yup.string().matches(VALIDATION_REGEX.regPickerId,"No se admiten letras o caracteres especiales"),
            })
        });

    return (
        <FilterTransaction
            {...props}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    );
}


const mapStateToProps = (state:RootState) => ({
    filters: transactionSelectors.getFilters(state),
    filtersExtra: transactionSelectors.getFiltersExtra(state),
});


const mapDispatchToProps = (dispatch:AppDispatch) => ({
    reset: () => {
        dispatch(transactionActions.reset());
    },
    getTransactions: (params:FilterTransactionsType) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    setFilters: (filters:SetFilterType) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTransactionContainer);
