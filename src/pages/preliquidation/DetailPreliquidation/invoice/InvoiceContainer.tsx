import React, { useEffect } from "react";
import { connect } from "react-redux";

import { AppDispatch, RootState } from "store";
import Invoice from "./Invoice";
import { actions } from "reducers/pickers";
import {
  actions as preliActions,
  preliquidationSelector,
} from "reducers/preliquidation";
import { detailPreliquidationInvoiceContainerPropsType } from "./invoice";
import { useParams } from "react-router-dom";
import { PreliquidationParamsMiddlewareType } from "sagas/types/preliquidation";
import * as yup from "yup";
import i18next from "i18next";
import moment from "moment";

const InvoiceContainer = (
  props: detailPreliquidationInvoiceContainerPropsType
): JSX.Element => {
  const params: { id?: string } = useParams();

  useEffect(() => {
    props.getDetailpreliquidations(params.id);
    props.setActualPage("INVOICE");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validarFechas = (value: any) => {

    const fechaCreacionPreli = "12/8/2021";
    const hoy = moment().format("DD/MM/YYYY");
   
    const range = moment(value.from).isBetween(fechaCreacionPreli, hoy);
    console.log("ingresado:",value);
    console.log("range:",range)
    console.log("hoy:",hoy)
    console.log("fechaCreacionPreli:",fechaCreacionPreli)
    return   false//new yup.ValidationError("error");
  };

  const validationSchema:any = yup.object({
    emisionDate: yup
      .object()
      .test("asdasdasd", "asdasdasdasd", (value) => validarFechas(value) )

      ,
    salePoint: yup
      .string()
      .min(4, i18next.t("Ingresá un número de 4 o 5 dígitos")),
    invoiceNumber: yup
      .string()
      .min(8, i18next.t("Ingresá un número de 8 dígitos")),
    caeNumber: yup
      .string()
      .min(14, i18next.t("Ingresá un número de 14 dígitos")),
  });

  return <Invoice {...props} validationSchema={validationSchema} />;
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  detailPreliquidations: preliquidationSelector(state).detailPreliquidations,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setActualPage: (page: string) => {
    dispatch(actions.setActualPage(page));
  },
  getDetailpreliquidations: (params: PreliquidationParamsMiddlewareType) => {
    dispatch(preliActions.getDetailPreliquidationsRequest(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
