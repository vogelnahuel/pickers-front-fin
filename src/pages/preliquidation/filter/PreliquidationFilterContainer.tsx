import React from "react";
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
import { filterPreliquidationValidationSchema, PreliquidationFilterContainerPropsType, PreliquidationFiltersType } from "./types";

const PreliquidationFilterContainer: React.FC<PreliquidationFilterContainerPropsType> = (props) => {



const search = (values: PreliquidationFiltersType) => {
 
  props.getPreliquidations({
    ...values,
    ...props.filtersExtra,
  });
    props.setPreliquidationFilters(values);
  };

  const validationSchema: yup.SchemaOf<filterPreliquidationValidationSchema> =
    yup.object({
      presettlmentId: yup
        .string()
        .min(5,i18next.t("Ingresá un número de 5 o 9 dígitos"))
        .matches(
          VALIDATION_REGEX.regNumber,
          i18next.t("No se admiten letras o caracteres especiales")
        ),
        fiscalNumber: yup
        .string()
        .min(11,i18next.t("Ingresá un número de  11 dígitos"))
        .matches(
          VALIDATION_REGEX.regNumber,
          i18next.t("No se admiten letras o caracteres especiales")
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
    dispatch(preliquidationActions.setPreliquidationFilters(filters))
}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationFilterContainer);