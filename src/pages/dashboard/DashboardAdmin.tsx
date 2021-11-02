import React from 'react';
import { Card } from 'component/admin/DashBoard/Card';
import {Header} from 'component/admin/Header/Header';
import {Nav} from '../../component/admin/Nav/Nav';
import './Dashboard.scss';
import moment from "moment";
import { DashboardTypes } from './types';
import { useTranslation } from "react-i18next";
import '../../i18n/es_AR/i18n'

export const DashboardAdmin: React.FC<DashboardTypes> = ({dashboard,isFetching}): JSX.Element => {
   // i18next.addResourceBundle("es","dashboard",{dashboard:"Dashboard"})
   //i18n.addResourceBundle("es","dashboard",require("../../i18n/es_AR/Dashboard/dashboard.json")) 
   const {t} = useTranslation();

    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav isDirty={null} showNotification={null}/>
                <div className="Admin-container">
                    <h2 className="title_Dashboard_Admin">{t("dashboard:title.dashboard")}</h2>
                    <h3 className="subtitle_Dashboard_Admin">{t("dashboard:label.visualizeInformation")}</h3>
                    <div className="card-admin">
                        <Card
                            subtitle={t("dashboard:subtitle.pickers")}
                            title={t("dashboard:label.online")}
                            number="-"
                            backgroundColor="#63E8A8"
                            url="#"
                            id="dashboard-card-Online"
                        />
                        <Card
                            id={null}
                            subtitle={t("dashboard:subtitle.transactions")}
                            title={t("dashboard:label.active")}
                            number={dashboard.activeTransactions?.toString()}
                            backgroundColor="#63E8A8"
                            url={`/transaction?state=ASSIGNED,IN_PICK_UP,IN_PICK_UP_POINT,PICKED_UP,IN_DELIVERY,IN_DELIVERY_POINT,IN_RETURN_TO_SENDER&minMinDeliveryDate=${moment().subtract(4,'d').format('YYYY-MM-DD')}&maxMinDeliveryDate=${moment().format("YYYY-MM-DD")}`}
                        />
                        <Card
                            subtitle={t("dashboard:subtitle.transactions")}
                            title={t("dashboard:label.pendingAssigment")}
                            number={dashboard.pendingTransactions?.toString()}
                            backgroundColor="#BCB6FF"
                            url={`/transaction?state=PENDING_ASSIGNMENT&minMinDeliveryDate=${moment().subtract(4,'d').format('YYYY-MM-DD')}&maxMinDeliveryDate=${moment().format("YYYY-MM-DD")}`}
                            id="dashboard-card-pending-Assignment"
                        />
                        <Card
                            id={null}
                            subtitle={t("dashboard:subtitle.transactions")}
                            title={t("dashboard:label.inAlert")}
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
