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

import { Part } from '../../../component/admin/pendingUserAdminPicker/Part'
import {data} from './data'

export const ActiveUserAdminPicker = () => {

    const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();
       

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

                 <div  className="form-part-1-admin-pickers">
                        <Part
                        inputsPart={inputsPart1}                      
                        ComponentesPart={ComponentesPart1}
                        />
                </div>
                
                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                <div  className="form-part-1-admin-pickers">
                        <Part
                        inputsPart={inputsPart2}                 
                        ComponentesPart={ComponentesPart2}
                        />                          
                </div>

                    <h3 className="subTitle-pending-data">Seguros</h3>

                 <div  className="form-part-1-admin-pickers">  
                        <Part
                        inputsPart={inputsPart3}                   
                        ComponentesPart={ComponentesPart3}
                        />  

                        <Part
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        /> 
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
