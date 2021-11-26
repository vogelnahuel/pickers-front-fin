import React from "react";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import "pages/preliquidation/preliquidation.scss";
import NotificationModal from "component/modal/NotificationModal";
import TablePreliquidation from "./tablePreliquidation/TablePreliquidation";

import PreliquidationFilter from "./filter/PreliquidationFilterContainer";
import SeeMoreButton from "component/seeMoreButton/SeeMoreButton";
import i18next from "i18next";

const items = [1, 2, 4];

export const Preliquidation: React.FC<any> = ({ isFetching }): JSX.Element => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav isDirty={null} showNotification={null} />
        <div className="pending-container">
          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">
              <p className="subtitle-pendingUser-h2">Preliquidaciones</p>
            </h2>
          </div>
          <PreliquidationFilter />
          <TablePreliquidation items={items} />
          {items && items.length !== 0 ? (
            <SeeMoreButton disabled={true} />
          ) : (
            <div className="paginator-button-transaction-noResult">
              {i18next.t("global:label.title.noResults")}
            </div>
          )}
        </div>

        <NotificationModal />
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
