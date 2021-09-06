import React from 'react'
import { Card } from 'component/admin/DashBoard/Card'
import {Header} from 'component/admin/Header/Header'
import {Nav} from 'component/admin/Nav/Nav'
import 'pages/dashboard/Dashboard.scss'

export const DashboardAdmin = ({dashboard,isFetching}) => {
    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="Admin-container">
                    <h2 className="title_Dashboard_Admin">Dashboard</h2>
                    <h3 className="subtitle_Dashboard_Admin">Visualizá la información más importante</h3>
                    <div className="card-admin">
                        <Card
                            subtitle="Pickers"
                            title="En línea"
                            number="-"
                            backgroundColor="#63E8A8"
                            url="#"
                            id="dashboard-card-Online"
                        />
                        <Card
                            subtitle="Transacciones"
                            title="Activas"
                            number={dashboard.activeTransactions}
                            backgroundColor="#63E8A8"
                            url="/transaction?state=ASSIGNED,IN_PICK_UP,IN_PICK_UP_POINT,PICKED_UP,IN_DELIVERY,IN_DELIVERY_POINT,IN_RETURN_TO_SENDER"
                        />
                        <Card
                            subtitle="Transacciones"
                            title="Pendientes de asignación"
                            number={dashboard.pendingTransactions}
                            backgroundColor="#BCB6FF"
                            url="/transaction?state=PENDING_ASSIGNMENT"
                            id="dashboard-card-pending-Assignment"
                        />
                        <Card
                            subtitle="Transacciones"
                            title="En alerta"
                            number={dashboard.inAlertTransactions}
                            backgroundColor="#FF8F76"
                            url="/transaction?inAlert=true"
                        />
                    </div>
                </div>
            </div>
            {   isFetching &&
            <div className="modalLoading"></div>

            }
        </div>
    )
};
