import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as pendingUserActions,
  pickersSelector as pendingUserSelectors,
} from "reducers/pickers";
import { FilterPickers } from "pages/pickers/filter/FilterPickers";
import { VALIDATION_REGEX } from "utils/constants";
import * as yup from "yup";
import { ParamsMiddlewareType, PickersParamsType } from "../types";
import {
  FilterContainerTypes,
  FilterContainerValidationSchemaTypes,
} from "./types";
import { AppDispatch, RootState } from "store";
import i18next from "i18next";

const FilterPickersContainer: React.FC<FilterContainerTypes> = (props) => {
  useEffect(() => {
    if (props.filters && Object.keys(props.filters).length === 0) {
      props.reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filters]);

  const search = (values: PickersParamsType) => {
    props.getPendingUser({
      ...values,
      ...props.filtersExtra,
      vehicleType:
        values.vehicleType &&
        (values.vehicleType.value === ""
          ? undefined
          : values.vehicleType.value),
    });
    props.setPendingUserFilters(values);
  };

  const validationSchema: yup.SchemaOf<FilterContainerValidationSchemaTypes> =
    yup.object({
      name: yup
        .string()
        .matches(
          VALIDATION_REGEX.expName,
          i18next.t("global:error.input.numbersOrSpecialCharacters")
        ),
      identificationNumber: yup
        .string()
        .min(7,i18next.t("global:error.input.dniLength"))
        .matches(
          VALIDATION_REGEX.regDNI,
          i18next.t("global:error.input.lettersOrSpecialCharacters")
          ),
      email: yup
        .string()
        .matches(
          VALIDATION_REGEX.regEmail,
          i18next.t("login:error.login.invalidMail")
        ),
    });

  return (
    <FilterPickers
      {...props}
      onSubmit={search}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  filters: pendingUserSelectors(state).filters,
  filtersExtra: pendingUserSelectors(state).filtersExtra,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  reset: () => {
    dispatch(pendingUserActions.reset());
  },
  setPendingUserFilters: (filters: PickersParamsType) => {
    dispatch(pendingUserActions.setPendingUserFilters(filters));
  },
  getPendingUser: (params: ParamsMiddlewareType) => {
    dispatch(pendingUserActions.getPendingUserRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPickersContainer);
