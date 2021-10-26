import React from "react";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import "pages/pickers/Pickers.scss";
import PickerStatusButton from "component/admin/PickerStatusButton/PickerStatusButton";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import FilterPickers from "pages/pickers/filter/FilterPickersContainer";
import  {TableAdmin}  from "../../component/admin/table/TableAdmin";
import NotificationModal from "component/modal/NotificationModal";
import { PickerTypes } from "./types";

export const Pickers: React.FC<PickerTypes> = ({
  actualPage,
  tableTitles,
  pendingUsers,
  filters,
  filtersExtraSeeMore,
  isFetching,
  seeMore,
  getMorePendingUser,
  getPendingUsersExportRequest,
}): JSX.Element => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav isDirty={null} showNotification={null} />
        <div className="pending-container">
          <PickerStatusButton />

          <div className="mainContainerFlex">
            <h2 className="subTitle-pending">
              <p className="subtitle-pendingUser-h2">
                {actualPage === "PENDING"
                  ? "Solicitudes pendientes"
                  : "Pickers"}{" "}
              </p>
            </h2>
            <button
              onClick={(
                e //getPendingUsersExportRequest(filters, e.target)}
              ) =>
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
              <p className="display-inline-block p-export"> Exportar</p>
            </button>
          </div>
          <FilterPickers />
          <br />
          <TableAdmin
            tableTitles={tableTitles} actualPage={actualPage} pendingUsers={pendingUsers}      />
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
                    Ver más
                  </button>
                </>
              ) : (
                <>
                  <button className="paginator-button-disabled">Ver más</button>
                </>
              )}
            </>
          ) : (
            <div className="paginator-button-transaction-noResult">
              No obtuvimos resultados para tu búsqueda :(
            </div>
          )}
        </div>
        <NotificationModal />
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
