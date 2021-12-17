import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import { TabControler } from "component/admin/TabControler/TabControler";

import React from "react";
import calckBlack from "./../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../assets/preli/invoiceBlue.svg";
import InvoiceContainer from "./invoice/InvoiceContainer";
import NotificationModal from "component/modal/NotificationModal";
import "pages/preliquidation/DetailPreliquidation/detailPreliquidation.scss";
import { DetailPreliquidationPropsType } from "./types";

import i18next from "i18next";
import Back from "component/back/Back";

export const DetailPreliquidation: React.FC<DetailPreliquidationPropsType> = ({
  isFetching,
  handleClickBack,
  actualPage
}): JSX.Element => {
  
 
 const  containerInvoice = true;
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
          <div className="header-container">
            <TabControler
              tabs={tabs}
              changePage={() => {}}
              actualPage={"INVOICE"}
            />
            <Back onClick={() => handleClickBack()} />
          </div>
          <div className="mainContainerFlex">
          <h2 className="detail-preliquidation-h2">
              {i18next.t(
                "detailPreliquidation:label.subtitle.preliquidationNumber"
              )}
            </h2>
            <p className="detail-preliquidation-number">{2201100002}</p>
          </div>
          
          <NotificationModal />
          {containerInvoice ? <InvoiceContainer /> : <></>}
        </div>
      
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
