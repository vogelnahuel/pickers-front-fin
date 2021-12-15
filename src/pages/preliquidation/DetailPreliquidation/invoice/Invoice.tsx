import { Input } from "component/inputs/Input";
import React, { useRef } from "react";
import "pages/preliquidation/DetailPreliquidation/invoice/detailPreliquidationInvoice.scss";
import { Field, Form, FormSpy } from "react-final-form";

import { PdfViewer } from "component/pdf-viewer/PdfViewer";
import deletePDF from "../../../../assets/preli/deletePDF.svg";
import download from "../../../../assets/preli/download.svg";
import replace from "../../../../assets/preli/replace.svg";
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

export const Invoice: React.FC<detailPreliquidationInvoicePropsType> = ({
  isFetching,
  detailPreliquidations,
  validationSchema,
  setDirty,
  castDatePicker,
  getInvoiceDetailSave,
  getInvoiceDetailApprove,
  getInvoiceDetailDelete,
  fileHandler,
  deleteFile,
  downloadFile,
  fileError,
  fileUrl,
  invoiceTypes
}) => {
  const pdfControllerRef = useRef<any>();
  return (
    <div>
      <h3 className="subTitle-pending-data detail-preliquidation-margin-top">
        {i18next.t("invoice:label.invoice.subTitleInvoice")}
      </h3>
      <Form
        onSubmit={(value) => value}
        initialValues={castDatePicker(detailPreliquidations)}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            delete value.label
            changeValue(state, field, () => value);
          },
        }}
        validate={useValidationSchema(validationSchema)}
      >
        {({ invalid, handleSubmit, form, values }) => (
          <form className="form-filter-transaction" onSubmit={handleSubmit}>
            <FormSpy
              subscription={{
                dirty: true,
              }}
              onChange={(pro) => {
                setDirty(pro.dirty);
              }}
            />
            <div className="container-detail-preliquidation form-detail-preliquidation">
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
                  >
                    {(props: any) => {
                      return (
                        <div>
                          <label
                            className={
                              props.meta.error
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
                    <label className="label-Admin-Pickers">
                      {i18next.t("invoice:label.form.voucherType")}
                    </label>
                    <Field
                      type="text"
                      placeholder={i18next.t(
                        "invoice:placeholder.form.voucherType"
                      )}
                      name="invoiceType"
                      onChange={form.mutators.setValue}
                      options={invoiceTypes.map(
                        (o:InvoiceTypes) => ({
                          ...o,
                          label: o.name,
                        })
                      )}
                    >
                      {(props: any) => <Select {...props} />}
                    </Field>
                  </div>
                  <Field
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
                    title="Factura"
                    buttonText="Cargar factura"
                    fileHandler={fileHandler}
                    fileLoaded={!!fileUrl}
                    showError={!!fileError}
                    errorMessage={fileError}
                    ref={pdfControllerRef}
                  >
                    <PdfViewer src={fileUrl}>
                      <img
                        src={deletePDF}
                        alt=""
                        onClick={deleteFile}
                        className="download-PDF"
                      />
                      <img
                        src={replace}
                        alt=""
                        onClick={() => pdfControllerRef?.current?.triggerOnChange()}
                        className="download-PDF"
                      />
                      <img
                        src={download}
                        alt=""
                        onClick={downloadFile}
                        className="download-PDF"
                      />
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
                  getInvoiceDetailSave(values as detailPreliquidationDatePicker)
                }
              >
                {i18next.t("invoice:label.buttons.save")}
              </button>
              <div className="detail-preliquidation-fondo">
                <button
                  disabled={invalid}
                  className="detail-preliquidation-invoice-p"
                  onClick={() =>
                    getInvoiceDetailDelete(
                      values as detailPreliquidationDatePicker
                    )
                  }
                >
                  <p>{i18next.t("invoice:label.buttons.refuse")}</p>
                </button>

                <button
                  type="submit"
                  disabled={invalid}
                  className="button-submit-active"
                  onClick={() =>
                    getInvoiceDetailApprove(
                      values as detailPreliquidationDatePicker
                    )
                  }
                >
                  {i18next.t("invoice:label.buttons.approve")}
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default Invoice;
