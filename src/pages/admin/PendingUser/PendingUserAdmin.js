import React from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import './PendingUserAdmin.css'
import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import {Filter} from '../../../component/admin/Filter/Filter'
import { TableAdmin } from '../../../component/admin/table/TableAdmin'

export const PendingUserAdmin = () => {
    const titulosAdminPending = ['Nombre','DNI','Email','vehiculo','Pendiente hace','Editar'];

  
    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="pending-container">
                     <PendingBlue/>
                       
                     <div 
                     className="mainContainerFlex">
                         <h2 className="subTitle-pending">Pickers pendientes</h2>
                         <button 
                            
                            className="export"
                            name="export"
                            >
                            <img  src={exportar} alt="export" />
                            <img className="or-pending" src={or} alt="or" />
                            <p className="display-inline-block p-export"> Exportar</p>
                         </button>
                     </div>
                     
                     <Filter/>
                     <br/>
                     <TableAdmin
                    titulosAdminPending={titulosAdminPending}
                     />
                </div>
                
                
            </div>
            
        </div>
    )
}
