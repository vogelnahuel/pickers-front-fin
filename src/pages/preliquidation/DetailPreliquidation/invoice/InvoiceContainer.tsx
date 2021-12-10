import React, { useEffect } from "react";
import { connect } from "react-redux";

import { AppDispatch, RootState } from "store";
import Invoice from "./Invoice";
import {
  actions as preliActions,
  preliquidationSelector,
} from "reducers/preliquidation";
import {
  detailPreliquidationDatePicker,
  detailPreliquidationInvoiceContainerPropsType,
  invoiceValidationSchema,
} from "./types";
import { useParams } from "react-router-dom";
import { DetailPreliquidationsContentResponseType } from "sagas/types/preliquidation";
import * as yup from "yup";
import i18next from "i18next";
import moment from "moment";
import { VALIDATION_REGEX } from "utils/constants";
import { ObjectShape, TypeOfShape } from "yup/lib/object";

const InvoiceContainer = (
  props: detailPreliquidationInvoiceContainerPropsType
): JSX.Element => {
  const params: { id?: string } = useParams();

  useEffect(() => {
    props.getInvoiceDetail(params.id);
    props.setActualPage("INVOICE");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validarFechas = (value: TypeOfShape<ObjectShape>) => {
    if (!value) return true;
    const startDate = moment().subtract(7, "d").format("DD/MM/YYYY");
    const today = moment().format("DD/MM/YYYY");
    const range = moment(value.from).isBetween(startDate, today);
    return range;
  };

  const castDatePicker = (
    detailPreliquidations: DetailPreliquidationsContentResponseType
  ) => {
    let castear:
      | detailPreliquidationDatePicker
      | DetailPreliquidationsContentResponseType = detailPreliquidations;
    castear = {
      ...castear,
      emisionDate: { from: detailPreliquidations.emisionDate },
    };
    return castear;
  };

  const validationSchema: yup.SchemaOf<invoiceValidationSchema> = yup.object({
    emisionDate: yup
      .object()
      .required("")
      .test(
        "errorDatePicker",
        i18next.t("global:error.input.emisionDate"),
        (value) => validarFechas(value)
      ),
    invoiceType: yup.object().required("Este campo es requerido"),
    salePoint: yup
      .string()
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.salePoint")
      )
      .min(4, i18next.t("global:error.input.salePoint")),
    invoiceNumber: yup
      .string()
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.invoiceNumber")
      )
      .min(8, i18next.t("global:error.input.invoiceNumber")),
    caeNumber: yup
      .string()
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.caeNumber")
      )
      .min(14, i18next.t("global:error.input.caeNumber")),
  });

  return (
    <Invoice
      {...props}
      validationSchema={validationSchema}
      castDatePicker={castDatePicker}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  detailPreliquidations: preliquidationSelector(state).detailPreliquidations,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setActualPage: (page: string) => {
    dispatch(preliActions.setActualPage(page));
  },
  getInvoiceDetail: (params: string | undefined) => {
    dispatch(preliActions.getInvoiceDetailRequest(params));
  },
  setDirty: (dirty: boolean) => {
    dispatch(preliActions.setDirty(dirty));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
