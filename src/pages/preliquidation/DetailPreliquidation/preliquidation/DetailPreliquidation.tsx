import {TabControler} from "component/admin/TabControler/TabControler";
import { TabType } from "component/admin/TabControler/types";
import Back from "component/back/Back";

import i18next from "i18next";
import React from "react";
import { PagesPreliquidationTypes } from "../types";

import calckBlack from "./../../../../assets/preli/calcBlack.svg";
import calckBlue from "./../../../../assets/preli/calcBlue.svg";
import invoiceBlack from "./../../../../assets/preli/invoiceBlack.svg";
import invoiceBlue from "./../../../../assets/preli/invoiceBlue.svg";
import { DetailPreliquidationPropsType } from "./types";

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
    </div>
  );
};


