import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import NotificationModal from "component/modal/NotificationModal";

import React from "react";
import InvoiceContainer from "./invoice/InvoiceContainer";
import "./wrapperPreliquidation.scss";

import DetailPreliquidationContainer from "./preliquidation/DetailPreliquidationContainer";
import {  WrapperPreliquidationPropsType } from "./types";

export const WrapperPreliquidation: React.FC<
  WrapperPreliquidationPropsType
> = ({ isFetching, actualPage }): JSX.Element => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <NotificationModal />
          {actualPage === "preliquidation" ? (
            <DetailPreliquidationContainer />
          ) : (
            <InvoiceContainer />
          )}
        </div>
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
