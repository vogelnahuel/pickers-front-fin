import TabControler from "component/admin/TabControler/TabControler";
import Back from "component/back/Back";

import i18next from "i18next";
import React from "react";
import { PagesPreliquidationTypes } from "../types";

import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import { DetailPreliquidationPropsType } from "./types";

const tabs = [
  {
    title: "Preliquidacion",
    id: PagesPreliquidationTypes.PRELI,
    icons: { active: calckBlue, disable: calckBlack },
  },
  {
    title: "Factura",
    id: PagesPreliquidationTypes.INVOICE,
    icons: { active: invoiceBlue, disable: invoiceBlack },
  },
];


export const DetailPreliquidation = ({
  changePage,
  handleClickBack,
  actualPage,
}: DetailPreliquidationPropsType) => {
  return (
    <div>
      <div className="header-container">
        <TabControler
          tabs={tabs}
          changePage={()=>changePage(PagesPreliquidationTypes.INVOICE)}
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
        <p className="detail-preliquidation-number">{2201100002}</p>
      </div>
    </div>
  );
};


