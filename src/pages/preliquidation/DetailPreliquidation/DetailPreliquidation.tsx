import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import NotificationModal from "component/modal/NotificationModal";
import "pages/preliquidation/DetailPreliquidation/detailPreliquidation.scss";
import React from "react";
import InvoiceContainer from "./invoice/InvoiceContainer";
import "pages/preliquidation/DetailPreliquidation/detailPreliquidations.scss";
import { DetailPreliquidationPropsType } from "./types";




export const DetailPreliquidation: React.FC<DetailPreliquidationPropsType> = ({
  isFetching,
  actualPage
}): JSX.Element => {


  const containerInvoice = true;



  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          

          <NotificationModal />
          {containerInvoice ? <InvoiceContainer/> : <></>}
        </div>

      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
