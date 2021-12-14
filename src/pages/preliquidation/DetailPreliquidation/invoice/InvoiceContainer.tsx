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
    props.getInvoiceDetailTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validarFechas = (value: TypeOfShape<ObjectShape>) => {
    if (!value) return true;


    const valueProps = moment(value.from,"DD/MM/YYYY");
    const today     = moment();
    const startDate = moment().subtract(7, "d")
  
    const range = valueProps.isBetween(startDate, today);

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
    invoiceType: yup.string().required("global:error.input.required"),
    salePoint: yup
      .string()
      .min(4, i18next.t("global:error.input.salePoint"))
      .required("")
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.salePoint")
      ),
     
    invoiceNumber: yup
      .string()
      .min(8, i18next.t("global:error.input.invoiceNumber"))
      .required("")
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.invoiceNumber")
      ),
    
    caeNumber: yup
      .string()
      .min(14, i18next.t("global:error.input.caeNumber"))
      .required("")
      .matches(
        VALIDATION_REGEX.regNumber,
        i18next.t("global:error.input.caeNumber")
      )
     
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
  invoiceTypes: preliquidationSelector(state).invoiceTypes,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setActualPage: (page: string) => {
    dispatch(preliActions.setActualPage(page));
  },
  getInvoiceDetail: (params: string | undefined) => {
    dispatch(preliActions.getInvoiceDetailRequest(params));
  },
  getInvoiceDetailSave: (params: detailPreliquidationDatePicker) => {
    dispatch(preliActions.getInvoiceDetailSaveRequest(params));
  },
  getInvoiceDetailApprove: (params: detailPreliquidationDatePicker) => {
    dispatch(preliActions.getInvoiceDetailApproveRequest(params));
  },
  getInvoiceDetailDelete: (params: detailPreliquidationDatePicker) => {
    dispatch(preliActions.getInvoiceDetailDeleteRequest(params));
  },
  getInvoiceDetailTypes: () => {
    dispatch(preliActions.getInvoiceDetailTypesRequest());
  },
  setDirty: (dirty: boolean) => {
    dispatch(preliActions.setDirty(dirty));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
