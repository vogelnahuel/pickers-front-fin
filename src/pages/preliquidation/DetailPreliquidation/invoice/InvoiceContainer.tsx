import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import { AppDispatch, RootState } from "store";
import Invoice from "./Invoice";
import {
  actions as preliActions,
  preliquidationSelector,
} from "reducers/preliquidation";
import { actions as notificationActions } from "reducers/notification";
import {
  DatePickerType,
  detailPreliquidationDatePicker,
  detailPreliquidationInvoiceContainerPropsType,
  invoiceValidationSchema,
} from "./types";
import { useHistory, useParams } from "react-router-dom";
import {
  RejectInvoiceMiddlewareType,
  UploadInvoiceFileMiddlewareType,
} from "sagas/types/preliquidation";
import * as yup from "yup";
import i18next from "i18next";
import moment from "moment";
import {
  DATE_FORMATS,
  MAX_FILE_SIZE,
  preliStatusList,
  VALIDATION_REGEX,
} from "utils/constants";
import { getBase64FromUrl, isBase64, toBase64 } from "utils/toBase64";
import {
  InvoiceFileStatus,
  DetailInvoiceType,
} from "reducers/types/preliquidation";
import { NotificationStateType } from "reducers/types/notification";

const InvoiceContainer = (
  props: detailPreliquidationInvoiceContainerPropsType
): JSX.Element => {
  const params: { id?: string } = useParams();

  useEffect(() => {
    props.setInvoiceFileStatus({ loading: false, error: false });
    props.setActualPage("INVOICE");
    props.getInvoiceDetailTypes();
    props.getInvoiceDetail(params.id);

    return () => props.resetInvoiceDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileHandler = async (file: File) => {
    props.setInvoiceFileStatus({ loading: true });

    if (file.size > MAX_FILE_SIZE || file.type !== "application/pdf") {
      props.setInvoiceFileStatus({
        error: true,
        loading: false,
        message: "component:label.pdfController.invalidFile",
      });
      return;
    } else {
      try {
        const base64 = (await toBase64(file)) as string;

        // Si se esta reemplazando el archivo, fuerza a que
        // se vuelvan a consumir los datos desde el back ya que el
        // formulario con los datos de factura debe estar vacio.
        const refresh = props.invoiceDetail?.invoiceFile?.upload;
        props.uploadInvoiceFile({
          id: parseInt(params.id || "0"),
          content: base64,
          refreshPage: refresh,
        });
      } catch (err) {
        console.log("Base64 error: ", err);
      }
    }
  };
  const history = useHistory();
  const handleClickBack = (dirty: boolean) => {
    const onClose = () => history.goBack();

    if (dirty) showDirtyNotification(onClose);
    else if (props.invoiceFileStatus.error) showWrongFilesNotification(onClose);
    else onClose();
  };

  const showDirtyNotification = (onClose: Function) => {
    const html = document.documentElement;
    const height = Math.max(html.clientHeight, html.scrollHeight);
    props.showNotification({
      level: "warning",
      title: i18next.t("pickers:title.modal.saveChanges"),
      body: i18next.t("pickers:label.modal.saveChanges"),
      onClickLabel: "pickers:button.modal.goToSave",
      onCloseLabel: "pickers:button.modal.notSave",
      onClose: onClose,
      onClick: () =>
        window.scroll({
          top: height,
          left: 0,
          behavior: "smooth",
        }),
    });
  };

  const showWrongFilesNotification = (onClose: Function) =>
    props.showNotification({
      level: "warning",
      title: i18next.t("global:title.modal.withoutSaving"),
      body: i18next.t("global:label.modal.withoutSaving"),
      onClickLabel: i18next.t("global:label.button.checkErrors"),
      onCloseLabel: i18next.t("global:label.button.continue"),
      onClose: onClose,
      onClick: undefined,
    });

  const changePage = (page: string, isDirty: boolean) => {
    const onClose = () => {
      props.setActualPage(page);

      history.replace("/preliquidation");
    };
    if (isDirty) showDirtyNotification(onClose);
    else if (props.invoiceFileStatus.error) showWrongFilesNotification(onClose);
    else onClose();
  };

  const deleteFile = () => {
    props.showNotification({
      level: "warning",
      title: i18next.t("invoice:title.modal.deleteInvoice"),
      body: i18next.t("invoice:label.modal.deleteInvoice"),
      onClickLabel: "invoice:button.modal.delete",
      onCloseLabel: "invoice:button.modal.cancel",
      onClose: undefined,
      onClick: () => props.deleteInvoiceFile(parseInt(params.id || "0")),
    });
  };

  const goToPreviousFile = () => {
    props.setInvoiceFileStatus({
      error: false,
      loading: false,
    });
  };

  const downloadFile = async () => {
    const url = props.invoiceDetail?.invoiceFile?.url;
    if (!url) return;

    const now = new Date();
    const date = `${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}`;
    const time = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
    const downloadLink = document.createElement("a");
    const fileName = `preli-${params.id || ""}-${date}_${time}.pdf`;

    if (isBase64(url)) {
      downloadLink.href = url;
    } else {
      const base64 = (await getBase64FromUrl(url)) as string;
      downloadLink.href = base64;
    }
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const validarFechas = (value: DatePickerType | string | undefined) => {
    if (!value || typeof value === "string" || !value?.from) return true;

    const valueProps = moment(value?.from, "DD/MM/YYYY");
    const today = moment();
    const startDate = moment(props.detailPreliquidations?.generatedAt);

    const range = valueProps.isBetween(startDate, today, "day", "[]");

    return range;
  };

  const castDatePicker = (detailPreliquidations: DetailInvoiceType) => {
    return {
      ...detailPreliquidations,
      caeNumber: detailPreliquidations.caeNumber ?? "",
      invoiceNumber: detailPreliquidations.invoiceNumber ?? "",
      salePoint: detailPreliquidations.salePoint ?? "",
      emisionDate: detailPreliquidations.emisionDate
        ? {
            from: moment(detailPreliquidations.emisionDate).format(
              DATE_FORMATS.shortDate
            ),
          }
        : "",
    };
  };

  const initialValues = useMemo(() => {
    return castDatePicker(props.invoiceDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.invoiceDetail.id,
    props.detailPreliquidations.status.tag,
    props.isFetching,
  ]);

  const isFormDisabled = useMemo(() => {
    return preliStatusList.includes(props.detailPreliquidations.status.tag);
  }, [props.detailPreliquidations.status.tag]);

  const validationSchema: yup.SchemaOf<invoiceValidationSchema> = yup.object({
    emisionDate: yup
      .mixed<DatePickerType | string>()
      .test("requireDatePicker", "", (value) => !!value)
      .test("errorDatePicker", "error.input.emisionDate", (value) =>
        validarFechas(value)
      ),
    invoiceType: yup.object({
      name: yup.string().required("global:error.input.required"),
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
      initialValues={initialValues}
      isFormDisabled={isFormDisabled}
      presettementId={params.id}
      handleClickBack={handleClickBack}
      changePage={changePage}
      goToPreviousFile={goToPreviousFile}
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
  getInvoiceDetailDelete: (params: RejectInvoiceMiddlewareType) => {
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
  resetInvoiceDetail: () => {
    dispatch(preliActions.resetInvoiceDetail());
  },
  setDirty: (dirty: boolean) => {
    dispatch(preliActions.setDirty(dirty));
  },
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
  setInvoiceFileStatus: (params: InvoiceFileStatus) => {
    dispatch(preliActions.setInvoiceFileStatus(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer);
