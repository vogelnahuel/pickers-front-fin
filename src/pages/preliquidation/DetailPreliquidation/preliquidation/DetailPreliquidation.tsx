import React from "react";
import { TabControler } from "component/admin/TabControler/TabControler";
import { TabType } from "component/admin/TabControler/types";
import Back from "component/back/Back";
import { Input } from "component/inputs/Input";
import i18next from "i18next";
import { Field, Form } from "react-final-form";
import { ReactComponent as Edit } from "../../../../assets/preli/edit.svg";
import { PagesPreliquidationTypes } from "../types";
import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import "./detailPreliquidation.scss";
import { DetailPreliquidationPropsType } from "./types";
import {StateHistory} from "component/StatesHistory/StateHistory";


import { Transactions } from "./transactions/Transactions";

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
  preliquidation,
  actualPage,
  presettementId,
  detailPreliquidation,
  initialValues,
  changePage,
  handleClickBack,
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
      <Form onSubmit={(value) => value} initialValues={initialValues}>
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
              <StateHistory
              history={detailPreliquidation.histories}
              showCreatedDate={true}
              subtitleMetadata={true}
              />
            </div>
          </div>
          <div className="container-detail-preliquidation-card-col-sm-6 container-detail-preliquidation-card-col-xl-4">
            <div className="preliquidation-transactions-header">
              <h2>
                {i18next.t("detailPreliquidation:label.title.transactions")}
              </h2>
              <button
                disabled={preliquidation.status.tag !== "initial"}
                className="button-change-amount"
              >
                <Edit />
                <p>
                  {i18next.t("detailPreliquidation:label.button.changeAmount")}
                </p>
              </button>
            </div>
            <div className="display-filter-preliquidation">
              <Transactions
                total={preliquidation.total}
                items={preliquidation.transactions.items}
                quantity={preliquidation.transactions.quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
