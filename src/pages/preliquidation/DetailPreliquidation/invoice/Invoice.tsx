import { Input } from 'component/inputs/Input'
import React from 'react'
import "pages/preliquidation/DetailPreliquidation/invoice/detailPreliquidationInvoice.scss";
import { Field, Form } from 'react-final-form'
import { DatePicker } from '@pickit/pickit-components';
import { FILTER_PRELIQUIDATION_SELECT_OPTIONS } from 'utils/constants';
import Select from 'component/inputs/Select';
import { detailPreliquidationInvoicePropsType } from './types';
import i18next from "i18next";
import useValidationSchema from 'hooks/useValidationSchema';



export const Invoice: React.FC<detailPreliquidationInvoicePropsType> = ({isFetching,detailPreliquidations,validationSchema}) =>{
let castear : any = detailPreliquidations;
castear = { ...castear, emisionDate: {from: "03/12/2021"} }

  return (
        <div>
              <h3 className="subTitle-pending-data detail-preliquidation-margin-top">{i18next.t('invoice:label.invoice.subTitleInvoice')}</h3>
          <Form
            onSubmit={(value) => value}
            initialValues={castear}
            mutators={{
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
            validate={useValidationSchema(validationSchema)}
          >
            {({ handleSubmit, form }) => (
              <form className="form-filter-transaction" onSubmit={handleSubmit}>
                <div className="container-detail-preliquidation form-detail-preliquidation">
                  <div className="container-detail-preliquidation-row">
                    <div className="container-detail-preliquidation-col-sm-1 form-part-1-admin-pickers">
                     
                     <div>
                          <label className="label-Admin-Pickers">
                            {i18next.t('invoice:label.label.dateOfIssue')}
                         </label>
                      <Field
                        type="text"
                        name="emisionDate"
                        className="Admin-Pickers-input"
                        placeholder= {i18next.t('invoice:placeholder.form.broadcastDate')}
                        language="es"
                      >
                             {(props: any) =>{console.log("DATEPICKER PROPS: ", props) ;return <DatePicker  singleSelection {...props} t={i18next.t} />}}
                      </Field>
                    </div>
                     <div>
                          <label className="label-Admin-Pickers">
                            Tipo de comprobante *
                         </label>
                        <Field
                          type="text"
                          placeholder={i18next.t('invoice:placeholder.form.voucherType')}
                          name="invoiceType"
                          onChange={form.mutators.setValue}
                          options={FILTER_PRELIQUIDATION_SELECT_OPTIONS.map((o) => ({
                            ...o,
                            label:o.label,
                          }))}
                        >
                          {(props: any) => <Select {...props} />}
                      </Field> 
                    </div> 
                      <Field
                        type="text"
                        name="salePoint"
                        label={i18next.t('invoice:label.form.pointOfSale')}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t('invoice:placeholder.form.enterNumber')}
                        maxLength={5}
                      />
                      <Field
                        type="text"
                        name="invoiceNumber"
                        label={i18next.t('invoice:label.form.voucherNumber')}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t('invoice:placeholder.form.enterNumber')}
                        maxLength={8}
                      />
                      <Field
                        type="text"
                        name="caeNumber"
                        label={i18next.t('invoice:label.form.numberCAE')}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t('invoice:placeholder.form.enterNumber')}
                        maxLength={14}
                      />
                    </div>

                    <div className="container-detail-preliquidation-col-sm-2  form-part-1-admin-pickers detail-preliquidation-adjust">
                      Factura
                    </div>
                  </div>

                  <h3 className="subTitle-pending-data detail-preliquidation-margin-top">{i18next.t('invoice:label.form.subTitleGeneralInformation')}</h3>
                  <div className="form-part-1-admin-pickers detail-preliquidation-margin-top">
                    <div className="container-detail-preliquidation-row">
                      <div className="container-detail-preliquidation-col-sm-1">
                        <Field
                          type="text"
                          name="fiscalData.fiscalNumber"
                          label={i18next.t('invoice:label.form.fiscalNumber')}
                          disabled={true}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t('invoice:placeholder.form.fiscalNumber')}
                          maxLength={8}
                        />
                      </div>
                      <div className="container-detail-preliquidation-col-sm-1">
                        <Field
                          type="text"
                          name="fiscalData.companyName"
                          label={i18next.t('invoice:label.form.businessName')}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t('invoice:placeholder.form.businessName')}
                          maxLength={8}
                          disabled={true}
                        />
                      </div>
                      <div className="container-detail-preliquidation-col-sm-1">
                        <Field
                          type="text"
                          name="fiscalData.taxPayerType"
                          label={i18next.t('invoice:label.form.typeOfTaxpayer')}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t('invoice:placeholder.form.typeOfTaxpayer')}
                          maxLength={8}
                          disabled={true}
                        />
                      </div>
                      <div className="container-detail-preliquidation-col-sm-1 ">
                        <Field
                          type="text"
                          name="fiscalData.total"
                          label={i18next.t('invoice:label.form.totalToPay')}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t('invoice:placeholder.form.totalToPay')}
                          maxLength={8}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-preliquidation-buttons">
                  <button type="button" className="button-submit-subtype">
                  {i18next.t('invoice:label.buttons.save')}
                  </button>
                  <div className="detail-preliquidation-fondo">
                    <p className="detail-preliquidation-invoice-p">{i18next.t('invoice:label.buttons.refuse')}</p>
                    <button
                      type="submit"
                      disabled={true}
                      className="button-submit-active"
                    >
                      {i18next.t('invoice:label.buttons.approve')}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        
        </div>
    )
}

export default Invoice;
