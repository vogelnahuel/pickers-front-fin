import React, { useEffect, useState } from "react";
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
import * as yup from "yup";
import i18next from "i18next";
import moment from "moment";
import { DATE_FORMATS, MAX_FILE_SIZE, VALIDATION_REGEX } from "utils/constants";
import { ObjectShape, TypeOfShape } from "yup/lib/object";
import { toBase64 } from "utils/toBase64";
import { DetailInvoiceType } from "reducers/types/preliquidation";

const InvoiceContainer = (
  props: detailPreliquidationInvoiceContainerPropsType
): JSX.Element => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const params: { id?: string } = useParams();
 

  useEffect(() => {
    props.getInvoiceDetail(params.id);
    props.setActualPage("INVOICE");
    props.getInvoiceDetailTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileHandler = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (file.size > MAX_FILE_SIZE || file.type !== "application/pdf") {
      setFileError(
        "El formato del archivo debe ser PDF y no puede superar los 5MB"
      );
      return;
    } else {
      setFileError("");
      try {
        const base64 = await toBase64(file);
        setFileUrl(base64 as  string);
      } catch(err){
        console.log("Base64 error: ", err);
      }
    }
  };

  const deleteFile = () => setFileUrl("");

  const downloadFile = () => {
    if(!fileUrl) return;

    //const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "factura.pdf";
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  const validarFechas = (value: TypeOfShape<ObjectShape>) => {
  
    if (!value ) return true;

    const valueProps = moment(value.from, "DD/MM/YYYY");
    const today = moment();
    const startDate = moment(props.detailPreliquidations?.generatedAt);

    const range = valueProps.isBetween(startDate, today);

    return range;
  };

  const castDatePicker = (
    detailPreliquidations: DetailInvoiceType
  ) => {
    let castear:
      | detailPreliquidationDatePicker
      | DetailInvoiceType = detailPreliquidations;
      
    castear = {
      ...castear,
      emisionDate: { from: detailPreliquidations.emisionDate  ? moment(detailPreliquidations.emisionDate).format(DATE_FORMATS.shortDate) : ""},
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
    invoiceType: yup.object({
      name:yup.string().required("global:error.input.required"),
    }),
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
      ),
  });

  return (
    <Invoice
      {...props}
      fileUrl={fileUrl}
      fileError={fileError}
      fileHandler={fileHandler}
      deleteFile={deleteFile}
      downloadFile={downloadFile}
      validationSchema={validationSchema}
      castDatePicker={castDatePicker}
      presettementId={params.id}

    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  invoiceDetail: preliquidationSelector(state).invoiceDetail,
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
