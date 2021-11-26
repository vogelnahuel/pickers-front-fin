import React from "react";
import { connect } from "react-redux";
import { VALIDATION_REGEX } from "utils/constants";
import * as yup from "yup";
import { AppDispatch, RootState } from "store";
import i18next from "i18next";
import { PreliquidationFilter } from "./PreliquidationFilter";
import {
    actions as preliquidationActions,
  } from "reducers/preliquidation";

const PreliquidationFilterContainer: React.FC<any> = (props) => {
//   useEffect(() => {
//     if (props.filters && Object.keys(props.filters).length === 0) {
//       props.reset();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.filters]);

//   const search = (values: PickersParamsType) => {
//     props.getPendingUser({
//       ...values,
//       ...props.filtersExtra,
//       vehicleType:
//         values.vehicleType &&
//         (values.vehicleType.value === ""
//           ? undefined
//           : values.vehicleType.value),
//     });
//     props.setPendingUserFilters(values);
//   };

const search = (values: any) => {
   
    props.setPreliquidationFilters(values);
  };

  const validationSchema: yup.SchemaOf<any> =
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
          VALIDATION_REGEX.expIdentificationNumber,
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
    <PreliquidationFilter
      {...props}
      onSubmit={search}
      validationSchema={validationSchema}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
//   filters: pendingUserSelectors(state).filters,
//   filtersExtra: pendingUserSelectors(state).filtersExtra,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
//   reset: () => {
//     dispatch(pendingUserActions.reset());
//   },
//   setPendingUserFilters: (filters: PickersParamsType) => {
//     dispatch(pendingUserActions.setPendingUserFilters(filters));
//   },
//   getPendingUser: (params: ParamsMiddlewareType) => {
//     dispatch(pendingUserActions.getPendingUserRequest(params));
//   },
setPreliquidationFilters: (filters: any) => {
    dispatch(preliquidationActions.setPreliquidationFilters(filters))
}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreliquidationFilterContainer);