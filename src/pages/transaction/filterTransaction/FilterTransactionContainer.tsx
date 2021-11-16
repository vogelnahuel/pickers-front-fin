import React from "react";
import { connect } from "react-redux";
import {
  actions as transactionActions,
  transactionsSelector,
} from "reducers/transactions";
import { FilterTransaction } from "pages/transaction/filterTransaction/FilterTransaction";
import moment from "moment";
import * as yup from "yup";
import { DATE_FORMATS } from "utils/constants";
import { VALIDATION_REGEX } from "utils/constants";
import { AppDispatch, RootState } from "store";
import {
  FilterTransactionsType,
  FilterTransactionsValidationSchemaType,
} from "sagas/types/transactions";
import {
  DateType,
  FilterContainerPropsType,
  FilterDateType,
  FilterValuesType,
} from "./types";
import { SetFilterType } from "reducers/types/transaction";
import i18next from "i18next";

const FilterTransactionContainer: React.FC<FilterContainerPropsType> = (
  props
): JSX.Element => {
  const formatDate = (date: DateType): FilterDateType => {
    let result: FilterDateType = {};
    if (date) {
      result.date = date;
      if (moment(date.from, DATE_FORMATS.shortDate).isValid()) {
        result.minMinDeliveryDate = moment(
          date.from,
          DATE_FORMATS.shortDate
        ).format(DATE_FORMATS.shortISODate);
        result.maxMinDeliveryDate = moment(
          date.until,
          DATE_FORMATS.shortDate
        ).format(DATE_FORMATS.shortISODate);
      }
    }
    return result;
  };

  const takeFilters = (values: FilterValuesType) => {
    let formatedDate = formatDate(values.date);
    return {
      ...formatedDate,
      state: values.state === "" ? undefined : values.state,
      pickerId: values.pickerId,
      inAlert: values.inAlert,
      transactionCode: values.transactionCode,
    };
  };

  const onSubmit = (values: FilterValuesType) => {
    let filtersApplied = takeFilters(values);
    props.getTransactions({ ...filtersApplied, ...props.filtersExtra });
    props.setFilters(filtersApplied);
  };

  const validationSchema: yup.SchemaOf<FilterTransactionsValidationSchemaType> =
    yup.object({
      transactionCode: yup
        .string()
        .matches(
          VALIDATION_REGEX.regTransactionCode,
          i18next.t("filterTransaction:error.input.codeTransaction")
        ),
      pickerId: yup
        .string()
        .matches(
          VALIDATION_REGEX.regPickerId,
          i18next.t("global:error.input.lettersOrSpecialCharacters")
        ),
    });

  return (
    <FilterTransaction
      {...props}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  filters: transactionsSelector(state).filters,
  filtersExtra: transactionsSelector(state).filtersExtra,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  reset: () => {
    dispatch(transactionActions.reset());
  },
  getTransactions: (params: FilterTransactionsType) => {
    dispatch(transactionActions.getTransactionsRequest(params));
  },
  setFilters: (filters: SetFilterType) => {
    dispatch(transactionActions.setTransactionFilters(filters));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTransactionContainer);
