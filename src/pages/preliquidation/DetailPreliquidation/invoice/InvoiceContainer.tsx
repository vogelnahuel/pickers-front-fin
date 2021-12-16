import { useEffect } from "react";
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
import { UploadInvoiceFileMiddlewareType } from "sagas/types/preliquidation";
import * as yup from "yup";
import i18next from "i18next";
import moment from "moment";
import { MAX_FILE_SIZE, VALIDATION_REGEX } from "utils/constants";
import { ObjectShape, TypeOfShape } from "yup/lib/object";
import { toBase64 } from "utils/toBase64";
import { InvoiceFileStatus, DetailInvoiceType } from "reducers/types/preliquidation";

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

  const fileHandler = async (file: File) => {
    props.setInvoiceFileStatus({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (file.size > MAX_FILE_SIZE || file.type !== "application/pdf") {
      props.setInvoiceFileStatus({
        error: true,
        loading: false,
        message: 'component:label.pdfController.invalidFile'
      });
      return;
    } else {
      try {
        const base64 = await toBase64(file) as string;
        props.uploadInvoiceFile({ id: props.detailPreliquidations.id, content: base64 });
      } catch(err){
        console.log("Base64 error: ", err);
      }
    }
  };

  const deleteFile = () =>  props.deleteInvoiceFile(props.detailPreliquidations.id);

  const downloadFile = () => {
    if(!props.invoiceDetail?.invoiceFile?.url) return;

    //const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "factura.pdf";
    downloadLink.href = props.invoiceDetail?.invoiceFile?.url;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const validarFechas = (value: TypeOfShape<ObjectShape>) => {
  
    if (!value) return true;

    const valueProps = moment(value.from, "DD/MM/YYYY");
    const today = moment();
    const startDate = moment(props.detailPreliquidations?.genereted_at,"DD/MM/YYYY");

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
      fileHandler={fileHandler}
      deleteFile={deleteFile}
      downloadFile={downloadFile}
      validationSchema={validationSchema}
      castDatePicker={castDatePicker}

    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isFetching: preliquidationSelector(state).fetching,
  invoiceDetail: preliquidationSelector(state).invoiceDetail,
  detailPreliquidations: preliquidationSelector(state).detailPreliquidations,
  invoiceFileStatus: preliquidationSelector(state).invoiceFileStatus,
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
  uploadInvoiceFile: (params: UploadInvoiceFileMiddlewareType) => {
    dispatch(preliActions.uploadInvoiceFile(params));
  },
  deleteInvoiceFile: (id: number) => {
    dispatch(preliActions.deleteInvoiceFileRequest({ id }));
  },
  getInvoiceDetailTypes: () => {
    dispatch(preliActions.getInvoiceDetailTypesRequest());
  },
  setDirty: (dirty: boolean) => {
    dispatch(preliActions.setDirty(dirty));
  },
  setInvoiceFileStatus: (params: InvoiceFileStatus) => {
    dispatch(preliActions.setInvoiceFileStatus(params));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
