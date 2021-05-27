import React from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.css'
import './activeUserAdminPicker.css'

import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import { PendingBlack } from '../../../component/admin/Sub-Title-Image/PendingBlack'
import motorcycle from '../../../assets/admin/PendingUserAdminPicker/motorcycle.svg'
import button from '../../../assets/admin/ActiveUserAdminPicker/button.svg'
import { SaveAdminPicker } from '../../../component/admin/SaveAdminPicker/SaveAdminPicker'

export const ActiveUserAdminPicker = () => {
    return (
        <div className="background-Grey">
        <Header/>
        <div className="mainContainerFlex">
            <Nav/>
            <div className="pending-container">
                 <PendingBlack/>
                   
                 <div 
                 className="mainContainerFlex">
                     <h2 className="subTitle-pending">Pepito Picker</h2>
                     <img  className="vehiculo-active-picker" src={motorcycle} alt="vehiculo" />
                    
                     <p className="admin-active-picker">Deshabilitado</p>
                        
                    <img  className="button-active-picker" src={button} alt="vehiculo" />     

                     <p className="admin-active-picker-p">Habilitado</p>

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

                    <div className="form-part-1-admin-pickers">
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="nombre">Nombre/s</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="nombre" id="nombre" placeholder="Ingresá el nombre"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                    <label className="label-Admin-Pickers" htmlFor="DNI">Apellido/s</label>
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="DNI" id="DNI" placeholder="Ingresá el apellido" />
                                </div>
                            </div>
                            
                            <div className="Admin-Pickers-space">
                                <div>
                                <label className="label-Admin-Pickers" htmlFor="Email">DNI</label>   
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el DNI"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                <label className="label-Admin-Pickers" htmlFor="Email">E-mail</label>   
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el mail"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                <label className="label-Admin-Pickers" htmlFor="Email">Fecha de nacimiento</label>   
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá la fecha nac"/>
                                </div>
                            </div>
                            <div className="Admin-Pickers-space">
                                <div>
                                <label className="label-Admin-Pickers" htmlFor="Email">Teléfono</label>   
                                </div>
                                <div>
                                    <input className="Admin-Pickers-input" type="text" name="Email" id="Email" placeholder="Ingresá el telefono"/>
                                </div>
                            </div>
                           
                            
                            
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
                                    titulo="Frente del DNI"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
                                    titulo="Dorso del DNI"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
                                    titulo="Rostro de frente"
                                    />
                                </div>
                            

                    </div>

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
                                    <SaveAdminPicker
                                    titulo="Comprobante del alta fiscal"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
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
                                    <SaveAdminPicker
                                    titulo="Licencia de conducir"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
                                    titulo="Frente de la cédula"
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
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
                                    <SaveAdminPicker
                                    titulo="Seguro de automotor"
                                    marginButton={22}
                                    />
                                </div>
                                <div className="Admin-Pickers-space">
                                    <SaveAdminPicker
                                    titulo="Seguro de accidentes
                                    personales"
                                    />
                                </div>

                    </div>
                    
                    <div className="pending-admin-picker-button">
                        <button className="corregir-admin-picker-active">Cancelar</button>
                        <button className="aprobar-admin-picker">Guardar</button>
                    </div>
                    
                </form>  
            </div>
            
            
        </div>
        
    </div>
    )
}
