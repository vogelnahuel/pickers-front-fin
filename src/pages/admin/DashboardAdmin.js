import React, { useEffect } from 'react'
import { Card } from '../../component/admin/DashBoard/Card'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import './Dashboard.css'
export const DashboardAdmin = () => {
   
    useEffect(()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
    
      })

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
                                             title="En linea"
                                             number={10}
                                             backgroundColor="#63E8A8"
                                            />
                                            <Card
                                             subtitle="Transacciones"
                                             title="Activas"
                                             number={8}
                                             backgroundColor="#63E8A8"
                                            />

                                             <Card
                                             subtitle="Transacciones"
                                             title="Pendientes de asignación"
                                             number={2}
                                             backgroundColor="#BCB6FF"
                                            />
                                             <Card
                                             subtitle="Transacciones"
                                             title="En alerta"
                                             number={3}
                                             backgroundColor="#FF8F76"
                                            />

                                </div>
                            </div>
              
            </div>
            
        </div>
    )
}
