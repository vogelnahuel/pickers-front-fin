import React, { useEffect } from 'react';
import { Card } from 'component/admin/DashBoard/Card';
import {Header} from 'component/admin/Header/Header';
import {Nav} from '../../component/admin/Nav/Nav';
import './Dashboard.scss';
import moment from "moment";
import { DashboardTypes } from './types';
import i18next from "i18next"


export const DashboardAdmin: React.FC<DashboardTypes> = ({dashboard,isFetching}): JSX.Element => {
        return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav isDirty={null} showNotification={null}/>
                <div className="Admin-container">
                    <h2 className="title_Dashboard_Admin" >{i18next.t("dashboard:title.dashboard.dashboard")}</h2>
                    <h3 className="subtitle_Dashboard_Admin">{i18next.t("dashboard:subtitle.dashboard.description")}</h3>
                    {/* <button  className={"login-button"} onClick={()=>{console.log("pepe");i18n.changeLanguage("es_MX")}}>es_MX</button>
      <button  className={"login-button"} onClick={()=>{console.log("pepe");i18n.changeLanguage("es_AR")}}>es_AR</button> */}
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
                            url={`/transaction?state=ASSIGNED,IN_PICK_UP,IN_PICK_UP_POINT,PICKED_UP,IN_DELIVERY,IN_DELIVERY_POINT,IN_RETURN_TO_SENDER&minMinDeliveryDate=${moment().subtract(4,'d').format('YYYY-MM-DD')}&maxMinDeliveryDate=${moment().format("YYYY-MM-DD")}`}
                        />
                        <Card
                            subtitle={i18next.t("dashboard:subtitle.card.transactions")}
                            title={i18next.t("dashboard:title.card.pendingAssigment")}
                            number={dashboard.pendingTransactions?.toString()}
                            backgroundColor="#BCB6FF"
                            url={`/transaction?state=PENDING_ASSIGNMENT&minMinDeliveryDate=${moment().subtract(4,'d').format('YYYY-MM-DD')}&maxMinDeliveryDate=${moment().format("YYYY-MM-DD")}`}
                            id="dashboard-card-pending-Assignment"
                        />
                        <Card
                            id={null}
                            subtitle={i18next.t("dashboard:subtitle.card.transactions")}
                            title={i18next.t("dashboard:title.card.inAlert")}
                            number={dashboard.inAlertTransactions?.toString()}
                            backgroundColor="#FF8F76"
                            url={`/transaction?inAlert=${true}&minMinDeliveryDate=${moment().subtract(4,'d').format('YYYY-MM-DD')}&maxMinDeliveryDate=${moment().format("YYYY-MM-DD")}`}
                        />
                        
                    </div>
                </div>
            </div>
            {   isFetching &&
            <div className="modalLoading"></div>
            }
        </div>
       
    );
};
