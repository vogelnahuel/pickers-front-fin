import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import { TabControler } from "component/admin/TabControler/TabControler";
import { PdfViewer } from "component/pdf-viewer/PdfViewer";
import React from "react";
import deletePDF from "../../../assets/preli/deletePDF.svg";
import download from "../../../assets/preli/download.svg";
import replace from "../../../assets/preli/replace.svg";
import pdfFile from "../../../component/pdf-viewer/factura.pdf";
import calckBlack from "./../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../assets/preli/invoiceBlue.svg";
import "./DetailPreliquidation.scss";
import back from "./../../../assets/admin/PendingUser/volver.svg";
import InvoiceContainer from "./invoice/InvoiceContainer";
import "pages/preliquidation/DetailPreliquidation/detailPreliquidation.scss";
import { DetailPreliquidationPropsType } from "./types";

import i18next from "i18next";

export const DetailPreliquidation: React.FC<DetailPreliquidationPropsType> = ({
  isFetching,
  handleClickBack,
}): JSX.Element => {
  const actualPage = true;

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

  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <div className="preliquidation-display-flex">
            <TabControler
              tabs={tabs}
              changePage={() => {}}
              actualPage={"INVOICE"}
            />
            <div
              className="detail-preliquidation-inline"
              onClick={() => handleClickBack()}
            >
              <img className="img-goBack" src={back} alt="" />
              <p className="preliquidation-paragraph-goBack">
                {i18next.t("detailPreliquidation:label.button.goBack")}
              </p>
            </div>
          </div>
          <div className="mainContainerFlex">
            <h2 className="subTitle-pending"></h2>
          </div>
          <PdfViewer src={pdfFile}>
            <img
              src={deletePDF}
              alt=""
              onClick={() => {
                console.log("soy el boton de eliminar");
              }}
              className="download-PDF"
            />
            <img
              src={replace}
              alt=""
              onClick={() => {
                console.log("soy el boton de reemplazar");
              }}
              className="download-PDF"
            />
            <img
              src={download}
              alt=""
              onClick={() => {
                console.log("soy el boton de descarga");
              }}
              className="download-PDF"
            />
          </PdfViewer>

          <h2 className="detail-preliquidation-h2">
            {i18next.t(
              "detailPreliquidation:label.subtitle.preliquidationNumber"
            )}
          </h2>
          <p className="detail-preliquidation-number">{2201100002}</p>
        </div>
        {actualPage ? <InvoiceContainer /> : <></>}
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
