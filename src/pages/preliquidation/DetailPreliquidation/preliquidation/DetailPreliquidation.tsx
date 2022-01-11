import React from "react";
import { TabControler } from "component/admin/TabControler/TabControler";
import { TabType } from "component/admin/TabControler/types";
import Back from "component/back/Back";
import { Input } from "component/inputs/Input";
import i18next from "i18next";
import { Field, Form } from "react-final-form";
import edit from "../../../../assets/preli/edit.svg";
import { PagesPreliquidationTypes } from "../types";
import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import "./detailPreliquidation.scss";
import { DetailPreliquidationPropsType } from "./types";
import { DetailTablePreliquidation } from "./detailtable/DetailTablePreliquidation";

const tabs: TabType<PagesPreliquidationTypes>[] = [
  {
    title: "Preliquidacion",
    id: "preliquidation",
    icons: { active: calckBlue, disable: calckBlack },
  },
  {
    title: "Factura",
    id: "invoice",
    icons: { active: invoiceBlue, disable: invoiceBlack },
  },
];

export const DetailPreliquidation = ({
  changePage,
  handleClickBack,
  actualPage,
  presettementId,
}: DetailPreliquidationPropsType) => {
  return (
    <div>
      <div className="header-container">
        <TabControler<PagesPreliquidationTypes>
          tabs={tabs}
          changePage={changePage}
          actualPage={actualPage}
        />
        <Back onClick={handleClickBack} />
      </div>
      <div className="mainContainerFlex">
        <h2 className="detail-preliquidation-h2">
          {i18next.t(
            "detailPreliquidation:label.subtitle.preliquidationNumber"
          )}
        </h2>
        <p className="detail-preliquidation-number">{presettementId}</p>
      </div>
      <Form onSubmit={(value) => value}>
        {({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="display-filter-transaction">
              <div className="container-detail-preliquidation-form-row">
                <div className="container-detail-preliquidation-form-col-sm-5 container-detail-preliquidation-form-col-lg-3">
                  <Field
                    type="text"
                    name="status"
                    label="Estado"
                    component={Input}
                    className="Admin-Pickers-input"
                    language="es"
                    disabled={true}
                  />
                </div>
                <div className="container-detail-preliquidation-form-col-sm-5 container-detail-preliquidation-form-col-lg-3">
                  <Field
                    type="text"
                    label="Fecha de emisión"
                    name="emisionDate"
                    component={Input}
                    className="Admin-Pickers-input"
                    language="es"
                    disabled={true}
                  />
                </div>
                <div className="container-detail-preliquidation-form-col-sm-5 container-detail-preliquidation-form-col-lg-3">
                  <Field
                    type="text"
                    name="fiscalNumber"
                    label="Identificador fiscal"
                    component={Input}
                    className="Admin-Pickers-input"
                    language="es"
                    disabled={true}
                  />
                </div>
                <div className="container-detail-preliquidation-form-col-sm-5 container-detail-preliquidation-form-col-lg-3">
                  <Field
                    type="text"
                    label="Razón social"
                    name="companyName"
                    component={Input}
                    className="Admin-Pickers-input"
                    language="es"
                    disabled={true}
                  />
                </div>
                <div className="container-detail-preliquidation-form-col-sm-5 container-detail-preliquidation-form-col-lg-3">
                  <Field
                    type="text"
                    name="sapCode"
                    label="Codigo SAP"
                    component={Input}
                    className="Admin-Pickers-input"
                    language="es"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
      <div className="detail-preliquidation-container-card">
        <div className="container-detail-preliquidation-card-row">
          <div className="container-detail-preliquidation-card-col-sm-6 container-detail-preliquidation-card-col-xl-4">
            <h2>Historial</h2>
            <div className="display-filter-transaction">
              componente historial
            </div>
          </div>
          <div className="container-detail-preliquidation-card-col-sm-6 container-detail-preliquidation-card-col-xl-4">
            <div className="display-flex">
              <h2>Transacciones</h2>
              <div className="container-detail-preliquidation-subtitle-amount">
                <img src={edit} alt="" />
                <p className="detail-preliquidation-subtitle-amount">
                  Modificar Monto
                </p>
              </div>
             
            </div>
            <div className="display-filter-preliquidation">
                <DetailTablePreliquidation />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
