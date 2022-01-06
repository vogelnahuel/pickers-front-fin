import {TabControler} from "component/admin/TabControler/TabControler";
import { TabType } from "component/admin/TabControler/types";
import Back from "component/back/Back";
import { Input } from "component/inputs/Input";


import i18next from "i18next";
import React from "react";
import { Field, Form } from "react-final-form";

import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import { DetailPreliquidationPropsType } from "./types";
import  edit from '../../../../assets/preli/edit.svg'
import "./detailPreliquidation.scss"
import { PagesPreliquidationTypes } from "../types";

const tabs:TabType<PagesPreliquidationTypes>[] = [
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
  presettementId
}: DetailPreliquidationPropsType) => {
  return (
    <div>
      <div className="header-container">
        <TabControler<PagesPreliquidationTypes>
          tabs={tabs}
          changePage={(page)=>changePage(page)}
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
      <Form
        onSubmit={(value) => value}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            delete value.label;
            changeValue(state, field, () => value);
          },
        }}
        
      >
        {({ invalid, handleSubmit, form, values, dirty }) => (
          <form className="form-filter-transaction" onSubmit={handleSubmit}>
            <div className="display-filter-transaction">
              <div className="container-detail-preliquidation-form-row">
                <div className="form-filter-transaction">
                  <div className="container-detail-preliquidation-form-col-sm-1">
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
                  <div className="container-detail-preliquidation-form-col-sm-1">
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
                  <div className="container-detail-preliquidation-form-col-sm-1">
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
                  <div className="container-detail-preliquidation-form-col-sm-1">
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
                  <div className="container-detail-preliquidation-form-col-sm-1">
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
            </div>
            <div className="detail-preliquidation-container-card">
              <div className="container-detail-preliquidation-card-row">
                <div className="container-detail-preliquidation-card-col-sm-2">
                  <h2>Historial</h2>
                  <div className="display-filter-transaction">
                    componente historial
                  </div>
                </div>
                <div className="container-detail-preliquidation-card-col-sm-2">
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
                  componente Transacciones
                    <div className="transparent"></div>

                    <div>
                      <h3 className="table-amount-preliquidation-subtitle">
                        Total
                      </h3>
                      <div className="container-table-amount-preliquidation">
                        <p>Transacciones</p>
                        <p>
                          <b>$300.12</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
