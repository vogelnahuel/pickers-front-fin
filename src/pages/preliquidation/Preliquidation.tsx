import React from "react";
import { Header } from "component/admin/Header/Header";
import { Nav } from "component/admin/Nav/Nav";
import "pages/preliquidation/preliquidation.scss";
import NotificationModal from "component/modal/NotificationModal";
import PreliquidationFilter from "./filter/PreliquidationFilterContainer";

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
          <PreliquidationFilter/>
        </div>
        <NotificationModal />
      </div>
      {isFetching === true ? <div className="modalLoading"></div> : <></>}
    </div>
  );
};
