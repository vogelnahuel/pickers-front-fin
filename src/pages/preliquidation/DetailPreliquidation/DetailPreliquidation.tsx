import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import  TabControler  from "component/admin/TabControler/TabControler";
import React from "react";
import calckBlack from "./../../../assets/preli/calcBlack.svg"
import invoiceBlue from "./../../../assets/preli/invoiceBlue.svg"
import calckBlue from "./../../../assets/preli/calcBlue.svg"
import invoiceBlack from "./../../../assets/preli/invoiceBlack.svg"
export const DetailPreliquidation: React.FC<any> = ({ isFetching }): JSX.Element => {
    //TODO: pasar a i18next
    const tabs = [{tittle:"Preliquidacion",id:"PRELI",icons:{active:calckBlue,disable:calckBlack}},{tittle:"Factura",id:"INVOICE",icons:{active:invoiceBlue,disable:invoiceBlack}}]

    return (
      <div className="background-Grey">
        <Header />
        <div className="mainContainerFlex">
          <Nav />
          <div className="pending-container">
            <div className="mainContainerFlex">
              <h2 className="subTitle-pending">
                  <TabControler tabs={tabs} changePage={()=>{console.log("pepe")}}/>
              </h2>
            </div>
          </div>
        </div>
        {isFetching === true ? <div className="modalLoading"></div> : <></>}
      </div>
    );
  };
  