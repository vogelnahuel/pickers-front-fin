import React from 'react'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import './Dashboard.css'
export const DashboardAdmin = () => {
    return (
        <div className="background-Grey">
            <Header/>
          <div className="mainContainerFlex">  
                <Nav/>
              
                            <div className="Admin-container">
                                <h2 className="title_Dashboard_Admin">Dashboard</h2>
                                <h3 className="subtitle_Dashboard_Admin">Visualizá la información más importante</h3>
                                    <div className="card-admin">
                                            <div className="card-body-admin color-admin-card">
                                                <div className="part-1">
                                                    <p className="paragraph-admin-card">Pickers</p> 
                                                    <p className="admin-black">On line</p>
                                                </div>
                                                <div className="part-2">
                                                    <p className="number-admin">10</p>
                                                </div>
                                            </div>
                                            <div className="card-body-admin color-admin-card2">
                                                <div className="part-1">
                                                    <p className="paragraph-admin-card" >Transacciones</p>
                                                    <p className="admin-black"> Activas</p>
                                                </div>
                                                <div className="part-2">
                                                    <p className="number-admin">8</p>
                                                </div>
                                            </div>
                                            <div className="card-body-admin color2-admin-card">
                                                <div className="part-1">
                                                    <p className="paragraph-admin-card">Transacciones</p> 
                                                    <p className="admin-black">Pendientes de asignación</p>
                                                </div>
                                                <div className="part-2">
                                                    <p className="number-admin">2</p>
                                                </div>
                                            </div>
                                            <div className="card-body-admin color3-admin-card">
                                                <div className="part-1">
                                                    <p className="paragraph-admin-card">Transacciones</p>
                                                    <p className="admin-black">En alerta</p> 
                                                </div>
                                                <div className="part-2">
                                                    <p className="number-admin">3</p>
                                                </div>
                                            </div>
                                </div>
                            </div>
              
            </div>
            
        </div>
    )
}
