import React from "react";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import "pages/pickers/Pickers.scss";
import {TabControler} from "component/admin/TabControler/TabControler";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import FilterPickers from "pages/pickers/filter/FilterPickersContainer";
import { TablePickers } from "./TablePickers/TablePIckers";
import NotificationModal from "component/modal/NotificationModal";
import { PickerTypes } from "./types";
import relojAzul from "assets/admin/PendingUser/relojAzul.svg";
import relojOscuro from "assets/admin/PendingUser/relojOscuro.svg";
import trabajadorOscuro from "assets/admin/PendingUser/trabajadorOscuro.svg";
import trabajadorAzul from "assets/admin/PendingUser/trabajadorAzul.svg";

import i18next from "i18next";
import { pickerTabs } from "./detailPicker/types";
import { TabType } from "component/admin/TabControler/types";

export const Pickers: React.FC<PickerTypes> = ({
  actualPage,
  pendingUsers,
  filters,
  filtersExtraSeeMore,
  isFetching,
  seeMore,
  getMorePendingUser,
  getPendingUsersExportRequest,
  changePage,
}): JSX.Element => {
  const tabs:TabType<pickerTabs>[] = [
    {
      title: "pickers:label.title.pending",
      id: "PENDING",
      icons: { active: relojAzul, disable: relojOscuro },
    },
    {
      title: "pickers:label.title.pickers",
      id: "ACTIVE",
      icons: { active: trabajadorAzul, disable: trabajadorOscuro },
    },
  ];

  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav isDirty={null} showNotification={null} />
        <div className="pending-container">
          <TabControler<pickerTabs>
            tabs={tabs}
            changePage={changePage}
            actualPage={actualPage}
            clickable={false}
          />

          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">
              <p className="subtitle-pendingUser-h2">
                {actualPage === "PENDING"
                  ? i18next.t("pickers:label.title.pending")
                  : i18next.t("pickers:label.title.pickers")}
              </p>
            </h2>
            <button
              onClick={(e) =>
                getPendingUsersExportRequest(
                  {
                    ...filters,
                    ...filtersExtraSeeMore,
                    vehicleType:
                      filters.vehicleType &&
                      (filters.vehicleType.value === ""
                        ? undefined
                        : filters.vehicleType.value),
                  },
                  e.target
                )
              }
              className="export"
              name="export"
            >
              <img src={exportar} alt="export" />
              <img className="or-pending" src={or} alt="or" />
              <p className="display-inline-block p-export">
                {i18next.t("global:label.button.export")}
              </p>
            </button>
          </div>
          <FilterPickers />
          <br />
          <TablePickers actualPage={actualPage} pendingUsers={pendingUsers} />
          {pendingUsers && pendingUsers.length !== 0 ? (
            <>
              {seeMore ? (
                <>
                  <button
                    onClick={() =>
                      getMorePendingUser({
                        ...filters,
                        ...filtersExtraSeeMore,
                        vehicleType:
                          filters.vehicleType &&
                          (filters.vehicleType.value === ""
                            ? undefined
                            : filters.vehicleType.value),
                      })
                    }
                    className="paginator-button"
                  >
                    {i18next.t("global:label.button.seeMore")}
                  </button>
                </>
              ) : (
                <>
                  <button className="paginator-button-disabled">
                    {" "}
                    {i18next.t("global:label.button.seeMore")}
                  </button>
                </>
              )}
            </>
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
// function showNotification(arg0: {
//   level: string;
//   title: string;
//   body: string;
//   onClickLabel: string;
//   onCloseLabel: string;
//   onClose: () => void;
//   onClick: () => void;
// }) {
//   throw new Error("Function not implemented.");
// }
