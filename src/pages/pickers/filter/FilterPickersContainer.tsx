import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as pendingUserActions,
  selectors as pendingUserSelectors,
} from "reducers/pickers";
import { FilterPickers } from "pages/pickers/filter/FilterPickers";
import { VALIDATION_REGEX } from "utils/constants";
import * as yup from "yup";
import { ParamsTypeMiddleware, PickersParamsType } from "../types";
import { StateType } from "reducers/types/pickers";
import { FilterContainerTypes } from "./types";

const FilterPickersContainer = (props: FilterContainerTypes) => {
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

  const validationSchema = yup.lazy(() => {
    return yup.object({
      name: yup
        .string()
        .matches(
          VALIDATION_REGEX.expName,
          "No se admiten números o caracteres especiales"
        ),
      identificationNumber: yup
        .string()
        .matches(
          VALIDATION_REGEX.expIdentificationNumber,
          "No se admiten letras o caracteres especiales"
        ),
      email: yup
        .string()
        .matches(VALIDATION_REGEX.regEmail, "El formato del pepe es inválido"),
    });
  });
  return (
    <FilterPickers
      {...props}
      onSubmit={search}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: StateType) => ({
  filters: pendingUserSelectors.getFilters(state),
  filtersExtra: pendingUserSelectors.getFiltersExtra(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  reset: () => {
    dispatch(pendingUserActions.reset());
  },
  setPendingUserFilters: (filters: PickersParamsType) => {
    dispatch(pendingUserActions.setPendingUserFilters(filters));
  },
  getPendingUser: (params: ParamsTypeMiddleware) => {
    dispatch(pendingUserActions.getPendingUserRequest(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPickersContainer);
