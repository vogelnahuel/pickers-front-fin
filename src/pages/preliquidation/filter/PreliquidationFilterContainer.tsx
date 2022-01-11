import React, { useEffect } from "react";
import { connect } from "react-redux";
import { VALIDATION_REGEX } from "utils/constants";
import * as yup from "yup";
import { AppDispatch, RootState } from "store";
import i18next from "i18next";
import { PreliquidationFilter } from "./PreliquidationFilter";
import {
  actions as preliquidationActions,
  preliquidationSelector as preliquidationSelectors,
} from "reducers/preliquidation";
import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";
import {
  filterPreliquidationValidationSchema,
  PreliquidationFilterContainerPropsType,
  PreliquidationFiltersType,
} from "./types";

const PreliquidationFilterContainer: React.FC<
  PreliquidationFilterContainerPropsType
> = (props) => {

  useEffect(() => {
    props.reset()
  }, [props.filters])

  const search = (values: PreliquidationFiltersType) => {
    debugger
    props.getPreliquidations({
      ...values,
      ...props.filtersExtra,
    });
    //props.setPreliquidationFilters(values); dejo esto comentado por si las dudas
  };

  const validationSchema: yup.SchemaOf<filterPreliquidationValidationSchema> =
    yup.object({
      presettlementId: yup
        .string()
        .min(
          5,
          i18next.t("filterPreliquidation:error.input.presettlmentIdLength")
        )
        .matches(
          VALIDATION_REGEX.regNumber,
          i18next.t("global:error.input.numbersOnly")
        ),
      fiscalNumber: yup
        .string()
        .min(
          11,
          i18next.t("filterPreliquidation:error.input.fiscalNumberLength")
        )
        .matches(
          VALIDATION_REGEX.regNumber,
          i18next.t("global:error.input.numbersOnly")
        ),
    });

  return (
    <PreliquidationFilter
      {...props}
      onSubmit={search}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  filters: preliquidationSelectors(state).filters,
  filtersExtra: preliquidationSelectors(state).filtersExtra,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    dispatch(preliquidationActions.getPreliquidationsRequest(params));
  },
  setPreliquidationFilters: (filters: PreliquidationFiltersType) => {
    dispatch(preliquidationActions.setPreliquidationFilters(filters));
  },
  reset: () => {
    dispatch(preliquidationActions.reset());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationFilterContainer);
