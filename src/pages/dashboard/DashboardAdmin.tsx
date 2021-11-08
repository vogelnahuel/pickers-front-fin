import { Card } from "component/admin/DashBoard/Card";
import { Header } from "component/admin/Header/Header";
import i18next from "i18next";
import moment from "moment";
import React from "react";
import { DATE_FORMATS } from "utils/constants";
import { Nav } from "../../component/admin/Nav/Nav";
import "./Dashboard.scss";
import { DashboardTypes } from "./types";

export const DashboardAdmin: React.FC<DashboardTypes> = ({
  dashboard,
  isFetching,
}): JSX.Element => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav isDirty={null} showNotification={null} />
        <div className="Admin-container">
          <h2 className="title_Dashboard_Admin">
            {i18next.t("dashboard:label.title.dashboard")}
          </h2>
          <h3 className="subtitle_Dashboard_Admin">
            {i18next.t("dashboard:label.subtitle.description")}
          </h3>
          <div className="card-admin">
            <Card
              subtitle={i18next.t("dashboard:subtitle.card.pickers")}
              title={i18next.t("dashboard:title.card.online")}
              number="-"
              backgroundColor="#63E8A8"
              url="#"
              id="dashboard-card-Online"
            />
            <Card
              id={null}
              subtitle={i18next.t("dashboard:subtitle.card.transactions")}
              title={i18next.t("dashboard:title.card.active")}
              number={dashboard.activeTransactions?.toString()}
              backgroundColor="#63E8A8"
              url={`/transaction?state=ASSIGNED,IN_PICK_UP,IN_PICK_UP_POINT,PICKED_UP,IN_DELIVERY,IN_DELIVERY_POINT,IN_RETURN_TO_SENDER&minMinDeliveryDate=${moment()
                .subtract(4, "d")
                .format(
                  DATE_FORMATS.shortISODate
                )}&maxMinDeliveryDate=${moment().format(
                DATE_FORMATS.shortISODate
              )}`}
            />
            <Card
              subtitle={i18next.t("dashboard:subtitle.card.transactions")}
              title={i18next.t("dashboard:title.card.pendingAssigment")}
              number={dashboard.pendingTransactions?.toString()}
              backgroundColor="#BCB6FF"
              url={`/transaction?state=PENDING_ASSIGNMENT&minMinDeliveryDate=${moment()
                .subtract(4, "d")
                .format(
                  DATE_FORMATS.shortISODate
                )}&maxMinDeliveryDate=${moment().format(
                DATE_FORMATS.shortISODate
              )}`}
              id="dashboard-card-pending-Assignment"
            />
            <Card
              id={null}
              subtitle={i18next.t("dashboard:subtitle.card.transactions")}
              title={i18next.t("dashboard:title.card.inAlert")}
              number={dashboard.inAlertTransactions?.toString()}
              backgroundColor="#FF8F76"
              url={`/transaction?inAlert=${true}&minMinDeliveryDate=${moment()
                .subtract(4, "d")
                .format(
                  DATE_FORMATS.shortISODate
                )}&maxMinDeliveryDate=${moment().format(
                DATE_FORMATS.shortISODate
              )}`}
            />
          </div>
        </div>
      </div>
      {isFetching && <div className="modalLoading"></div>}
    </div>
  );
};
