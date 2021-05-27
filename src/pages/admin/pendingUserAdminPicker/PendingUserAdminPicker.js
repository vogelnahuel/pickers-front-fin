import React from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'

import '../PendingUser/PendingUserAdmin.css'
import './pendingUserAdminPicker.css'

import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import motorcycle from '../../../assets/admin/PendingUserAdminPicker/motorcycle.svg'
import { LoadAdminPicker } from '../../../component/admin/LoadAdminPicker/LoadAdminPicker'
import { Part } from '../../../component/admin/pendingUserAdminPicker/Part'

export const PendingUserAdminPicker = () => {
    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="pending-container">
                     <PendingBlue/>
                       
                     <div 
                     className="mainContainerFlex">
                         <h2 className="subTitle-pending">Pepito Picker</h2>
                         <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                         <button 
                            
                            className="export"
                            name="export"
                            >
                            <img  src={exportar} alt="export" />
                            <img className="or-pending" src={or} alt="or" />
                            <p className="display-inline-block p-export"> Exportar</p>
                         </button>
                     </div>

             <form className="Admin-Pickers-inputs">

                    <Part/>

                    <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>
                    <div className="form-part-1-admin-pickers">
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="nombre">Número de CUIT/CUIL</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="nombre" id="nombre" placeholder="20 - 39589475 - 4"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="DNI">Número de CBU</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="DNI" id="DNI" placeholder="20 - 39589475 - 4" />
                                </div>
                            </div>
                            
                            <div className="Admin-Pickers-space">
                                <div>
                                <label className="label-Admin-Pickers" htmlFor="Email">Nombre del banco</label>   
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el nombre"/>
                                </div>
                            </div>
                            
                           
                            
                            
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Comprobante del alta fiscal"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Comprobante del CBU"
                                    />
                                </div>
                               
                            

                    </div>


                    <h3 className="subTitle-pending-data">Seguros</h3>
                    <div className="form-part-1-admin-pickers">
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="nombre">Vencimiento de la licencia</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="nombre" id="nombre" placeholder="dia / mes / año"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="DNI">Vencimiento de la cédulal</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="DNI" id="DNI" placeholder="dia / mes / año" />
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                               
                                
                            </div>
                    
                            
                           
                            
                            
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Licencia de conducir"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Frente de la cédula"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Dorso de la cédula"
                                    />
                                </div>



                            <div className="Admin-Pickers-space separacion">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="nombre">Vencimiento  del seguro de automotor</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="nombre" id="nombre" placeholder="dia / mes / año"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space separacion">
                                <div>
                                    <label className="label-Admin-Pickers label-width" htmlFor="DNI">Vencimiento  del seguro de accidentes personales</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="DNI" id="DNI" placeholder="dia / mes / año" />
                                </div>
                            </div>
                            <div className="Admin-Pickers-space separacion">
                               
                                
                               </div>

                            

                            <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Seguro de automotor"
                                    marginButton={22}
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <LoadAdminPicker
                                    titulo="Seguro de accidentes
                                    personales"
                                    />
                                </div>

                    </div>
                    
                    <div className="pending-admin-picker-button">
                        <button className="corregir-admin-picker">Corregir documentos</button>
                        <button className="aprobar-admin-picker">Aprobar picker</button>
                    </div>
                    
                </form>  
                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
