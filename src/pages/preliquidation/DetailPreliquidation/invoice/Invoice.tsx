import { Input } from "component/inputs/Input";
import React, { useRef } from "react";
import "pages/preliquidation/DetailPreliquidation/invoice/detailPreliquidationInvoice.scss";
import { Field, Form, FormSpy } from "react-final-form";
import { Tooltip, ToolTipPosition } from "@pickit/pickit-components";
import { PdfViewer } from "component/pdf-viewer/PdfViewer";
import { ReactComponent as DeleteIcon } from "../../../../assets/admin/file-delete.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/admin/file-download.svg";
import { ReactComponent as ReplaceIcon } from "../../../../assets/admin/file-replace.svg";
import { DatePicker } from "@pickit/pickit-components";

import Select from "component/inputs/Select";
import {
  detailPreliquidationDatePicker,
  detailPreliquidationInvoicePropsType,
} from "./types";
import i18next from "i18next";
import useValidationSchema from "hooks/useValidationSchema";
import { InvoiceTypes } from "sagas/types/preliquidation";
import PdfController from "component/pdfController/PdfController";
import { statusList } from "utils/constants";
import TabControler from "component/admin/TabControler/TabControler";
import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import Back from "component/back/Back";
export const Invoice: React.FC<detailPreliquidationInvoicePropsType> = ({
  isFetching,
  invoiceFileStatus,
  presettementId,
  invoiceDetail,
  detailPreliquidations,
  validationSchema,
  invoiceTypes,
  setDirty,
  castDatePicker,
  getInvoiceDetailSave,
  getInvoiceDetailApprove,
  getInvoiceDetailDelete,
  fileHandler,
  deleteFile,
  downloadFile,
  goToPreviousFile,
  handleClickBack,
  changePage,
}): JSX.Element => {
  const verifyStateType = () =>
    statusList.includes(detailPreliquidations.status.tag);
  const tabs = [
    {
      title: "Preliquidacion",
      id: "PRELI",
      icons: { active: calckBlue, disable: calckBlack },
    },
    {
      title: "Factura",
      id: "INVOICE",
      icons: { active: invoiceBlue, disable: invoiceBlack },
    },
  ];

  const pdfControllerRef = useRef<any>();
  return (
    <div>
      <Form
        onSubmit={(value) => value}
        initialValues={castDatePicker(invoiceDetail)}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            delete value.label;
            changeValue(state, field, () => value);
          },
        }}
        validate={useValidationSchema(validationSchema)}
      >
        {({ invalid, handleSubmit, form, values, dirty }) => (
          <form className="form-filter-transaction" onSubmit={handleSubmit}>
            <div className="header-container">
              <TabControler
                tabs={tabs}
                changePage={() => {
                  changePage("PRELI", dirty);
                }}
                actualPage={"INVOICE"}
              />
              <Back onClick={() => handleClickBack(dirty)} />
            </div>
            <div className="mainContainerFlex">
              <h2 className="detail-preliquidation-h2">
                {i18next.t(
                  "detailPreliquidation:label.subtitle.preliquidationNumber"
                )}
              </h2>
              <p className="detail-preliquidation-number">{2201100002}</p>
            </div>

            <FormSpy
              subscription={{
                dirty: true,
              }}
              onChange={(pro) => {
                setDirty(pro.dirty);
              }}
            />
            <div className="container-detail-preliquidation form-detail-preliquidation">
            <h3 className="subTitle-pending-data detail-preliquidation-margin-top">
                    {i18next.t("invoice:label.invoice.subTitleInvoice")}
                  </h3>
              <div className="container-detail-preliquidation-row">
                <div className="container-detail-preliquidation-col-sm-1 form-part-1-admin-pickers">
                  <Field
                    type="text"
                    name="emisionDate"
                    className="Admin-Pickers-input"
                    placeholder={i18next.t(
                      "invoice:placeholder.form.broadcastDate"
                    )}
                    language="es"
                    disabled={verifyStateType()}
                  >
                    {(props: any) => {
                      return (
                        <div>
                          <label
                            className={
                              props.disabled
                                ? "label-Admin-Pickers readonly"
                                : props.meta.error && props.meta.touched
                                ? "label-Admin-Pickers color-red"
                                : "label-Admin-Pickers"
                            }
                          >
                            {i18next.t("invoice:label.label.dateOfIssue")}
                          </label>
                          <DatePicker
                            singleSelection
                            {...props}
                            t={i18next.t}
                          />
                        </div>
                      );
                    }}
                  </Field>

                  <div>
                    <Field
                      label={i18next.t("invoice:label.form.voucherType")}
                      disabled={verifyStateType()}
                      type="text"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.voucherType"
                      )}
                      name="invoiceType"
                      onChange={form.mutators.setValue}
                      options={invoiceTypes.map((o: InvoiceTypes) => ({
                        ...o,
                        label: o.name,
                      }))}
                    >
                      {(props: any) => <Select {...props} />}
                    </Field>
                  </div>
                  <Field
                    disabled={verifyStateType()}
                    type="text"
                    name="salePoint"
                    label={i18next.t("invoice:label.form.pointOfSale")}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder={i18next.t(
                      "invoice:placeholder.form.enterNumber"
                    )}
                    maxLength={5}
                  />
                  <Field
                    disabled={verifyStateType()}
                    type="text"
                    name="invoiceNumber"
                    label={i18next.t("invoice:label.form.voucherNumber")}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder={i18next.t(
                      "invoice:placeholder.form.enterNumber"
                    )}
                    maxLength={8}
                  />
                  <Field
                    disabled={verifyStateType()}
                    type="text"
                    name="caeNumber"
                    label={i18next.t("invoice:label.form.numberCAE")}
                    component={Input}
                    className="Admin-Pickers-input"
                    placeholder={i18next.t(
                      "invoice:placeholder.form.enterNumber"
                    )}
                    maxLength={14}
                  />
                </div>

                <div className="container-detail-preliquidation-col-sm-2 detail-preliquidation-adjust">
                  <PdfController
                    ref={pdfControllerRef}
                    title={i18next.t("invoice:label.title.invoice")}
                    buttonText={
                      invoiceDetail.invoiceFile?.upload &&
                      invoiceFileStatus.error
                        ? i18next.t("global:label.button.retry")
                        : i18next.t("invoice:label.button.uploadInvoice")
                    }
                    fileUploaded={invoiceDetail.invoiceFile?.upload}
                    showError={invoiceFileStatus.error}
                    errorMessage={i18next.t(invoiceFileStatus.message || "")}
                    loading={invoiceFileStatus.loading}
                    fileHandler={fileHandler}
                    goToPreviousFile={goToPreviousFile}
                  >
                    <PdfViewer src={invoiceDetail.invoiceFile?.url || ""}>
                      <Tooltip
                        disabled={verifyStateType()}
                        message={i18next.t("component:label.tooltip.delete")}
                        position={ToolTipPosition.top}
                      >
                        <button
                          className="icon-container-primary"
                          type="button"
                          disabled={verifyStateType()}
                          onClick={deleteFile}
                        >
                          <DeleteIcon />
                        </button>
                      </Tooltip>
                      <Tooltip
                        disabled={verifyStateType()}
                        message={i18next.t("component:label.tooltip.replace")}
                        position={ToolTipPosition.top}
                      >
                        <button
                          className="icon-container-primary"
                          type="button"
                          disabled={verifyStateType()}
                          onClick={() =>
                            pdfControllerRef?.current?.triggerOnChange()
                          }
                        >
                          <ReplaceIcon />
                        </button>
                      </Tooltip>
                      <Tooltip
                        disabled={verifyStateType()}
                        message={i18next.t("component:label.tooltip.download")}
                        position={ToolTipPosition.top}
                      >
                        <button
                          disabled={verifyStateType()}
                          type="button"
                          className="icon-container-secondary"
                          onClick={downloadFile}
                        >
                          <DownloadIcon />
                        </button>
                      </Tooltip>
                    </PdfViewer>
                  </PdfController>
                </div>
              </div>

              <h3 className="subTitle-pending-data detail-preliquidation-margin-top">
                {i18next.t("invoice:label.form.subTitleGeneralInformation")}
              </h3>
              <div className="form-part-1-admin-pickers detail-preliquidation-margin-top">
                <div className="container-detail-preliquidation-row">
                  <div className="container-detail-preliquidation-col-sm-1">
                    <Field
                      type="text"
                      name="fiscalData.fiscalNumber"
                      label={i18next.t("invoice:label.form.fiscalNumber")}
                      disabled={true}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.fiscalNumber"
                      )}
                      maxLength={8}
                    />
                  </div>
                  <div className="container-detail-preliquidation-col-sm-1">
                    <Field
                      type="text"
                      name="fiscalData.companyName"
                      label={i18next.t("invoice:label.form.businessName")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.businessName"
                      )}
                      maxLength={8}
                      disabled={true}
                    />
                  </div>
                  <div className="container-detail-preliquidation-col-sm-1">
                    <Field
                      type="text"
                      name="fiscalData.taxPayerType"
                      label={i18next.t("invoice:label.form.typeOfTaxpayer")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.typeOfTaxpayer"
                      )}
                      maxLength={8}
                      disabled={true}
                    />
                  </div>
                  <div className="container-detail-preliquidation-col-sm-1 ">
                    <Field
                      type="text"
                      name="fiscalData.total"
                      label={i18next.t("invoice:label.form.totalToPay")}
                      component={Input}
                      className="Admin-Pickers-input"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.totalToPay"
                      )}
                      maxLength={8}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-preliquidation-buttons">
              <button
                type="button"
                className="button-submit-subtype"
                onClick={() =>
                  getInvoiceDetailSave({
                    ...(values as detailPreliquidationDatePicker),
                    presettementId,
                  })
                }
              >
                {i18next.t("invoice:label.buttons.save")}
              </button>
              <div className="detail-preliquidation-fondo">
                <button
                  disabled={invalid}
                  className="detail-preliquidation-invoice-p"
                  onClick={() =>
                    getInvoiceDetailDelete({
                      ...(values as detailPreliquidationDatePicker),
                      presettementId,
                    })
                  }
                >
                  <p>{i18next.t("invoice:label.buttons.refuse")}</p>
                </button>

                <button
                  type="submit"
                  disabled={invalid}
                  className="button-submit-active"
                  onClick={() =>
                    getInvoiceDetailApprove({
                      ...(values as detailPreliquidationDatePicker),
                      presettementId,
                    })
                  }
                >
                  {i18next.t("invoice:label.buttons.approve")}
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
      {isFetching && <div className="modalLoading"></div>}
    </div>
  );
};

export default Invoice;
