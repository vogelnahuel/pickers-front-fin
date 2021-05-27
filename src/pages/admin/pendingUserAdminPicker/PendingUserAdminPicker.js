import React from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.css'
import './pendingUserAdminPicker.css'
import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import motorcycle from '../../../assets/admin/PendingUserAdminPicker/motorcycle.svg'
import { Part } from '../../../component/admin/pendingUserAdminPicker/Part'
import {data} from './data'


export const PendingUserAdminPicker = () => {


   const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();
        
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
                        <button className="corregir-admin-picker">Corregir documentos</button>
                        <button className="aprobar-admin-picker">Aprobar picker</button>
                    </div>
                    
                </form>  
                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
