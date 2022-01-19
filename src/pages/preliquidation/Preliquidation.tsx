import React from "react";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import "pages/preliquidation/preliquidation.scss";
import NotificationModal from "component/modal/NotificationModal";
import TablePreliquidation from "./tablePreliquidation/TablePreliquidation";

import PreliquidationFilter from "./filter/PreliquidationFilterContainer";
import SeeMoreButton from "component/seeMoreButton/SeeMoreButton";
import i18next from "i18next";
import Button from "component/button/Button";
import { PreliquidationsProps } from "./types";

export const Preliquidation: React.FC<PreliquidationsProps> = ({
  isFetching,
  filters,
  seeMore,
  filtersExtraSeeMore,
  preliquidations,
  getMorePreliquidations,
  anyPreliquidationSelected,
  sendToAccounting,
}): JSX.Element => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav isDirty={null} showNotification={null} />
        <div className="pending-container">
          <h2 className="subTitle-pending">
            <p className="subtitle-pendingUser-h2">
              {i18next.t("preli:label.title.preliquidations")}
            </p>
          </h2>
          <PreliquidationFilter />
          <div className="button-container-preliquidation">
            <Button
              disabled={!anyPreliquidationSelected}
              onClick={sendToAccounting}
            >
              {i18next.t("preli:label.button.sendToAccounting")}
            </Button>
          </div>
          <TablePreliquidation items={preliquidations} />
          {preliquidations && preliquidations.length !== 0 ? (
            <SeeMoreButton
              disabled={!seeMore}
              onClick={() =>
                getMorePreliquidations({
                  ...filters,
                  ...filtersExtraSeeMore,
                })
              }
            />
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
