import React, { useState } from 'react'
import { LoadAdminPicker } from '../LoadAdminPicker/LoadAdminPicker'
import {Labels}  from '../../Labels/Labels'


import './part.css'
import { SaveAdminPicker } from '../SaveAdminPicker/SaveAdminPicker'
import { data } from '../../../pages/admin/pendingUserAdminPicker/data'

/**** muestro los campos con sus labels y tambien los componentes pasados */
export const Part = (props) => {


    const variables = props.inputsPart;
    const componentes = props.ComponentesPart;
    const dataPicker = props.data;
    console.log(dataPicker)
    let defaultInfo = {
        nombre:dataPicker.name,
        apellido:dataPicker.surname,
        dni:dataPicker.identificationNumber,
        email:dataPicker.email,
        fechaNac:dataPicker.dateOfBirth,
        telefono:dataPicker.phoneNumber,
        vencimientoLicencia:dataPicker.expirationDateDriverLicense,
        nombreBanco:dataPicker.bankName,
        cbu:dataPicker.bankIdentifier,
        cuit:dataPicker.bankIdentifier,
        fechaVecCel:dataPicker.expirationDateIdentificationCar,
        fechaVecSeguroAuto:dataPicker.expirationDatePolicyVehicle,
        fechaVecSeguroAccidente:dataPicker.expirationDatePolicyPersonal,
    }
   
    const [info, setInfo] = useState( {
        nombre:"",
        apellido:"",
        dni:"",
        email:"",
        fechaNac:"",
        telefono:"",
        vencimientoLicencia:"",
        nombreBanco:"",
        cbu:"",
        cuit:"",
        fechaVecCel:"",
        fechaVecSeguroAuto:"",
        fechaVecSeguroAccidente:"",
    });

 


    const handleChange=(e,id) => {


                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     ); 

    }   
    
    return (
       <>
       
         {         

           
                            variables.map( variable => (
                                
                                    <div key={variable.id} className="Admin-Pickers-space">
                                        {   variable.type !== "" ? 
                                            <>
                                                <div>
                                                    <Labels width={variable.label.labelwidth} className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor} parrafo={variable.label.labelparrafo} /> 
                                                </div>
                                                <div >
                                                       {
                                                         variable.name ==="nombre" && <input value={!info.nombre?defaultInfo.nombre:info.nombre} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>                                                                                                     
                                                       } 
                                                       {
                                                             variable.name==="apellido" && <input value={!info.apellido?defaultInfo.apellido:info.apellido} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="dni" && <input value={!info.dni?defaultInfo.dni:info.dni} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="email" && <input value={!info.email?defaultInfo.email:info.email} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="fechaNac" && <input value={!info.fechaNac?defaultInfo.fechaNac:info.fechaNac} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="telefono" && <input value={!info.telefono?defaultInfo.telefono:info.telefono} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="vencimientoLicencia" && <input value={!info.vencimientoLicencia?defaultInfo.vencimientoLicencia:info.vencimientoLicencia} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                         {
                                                             variable.name==="nombreBanco" && <input value={!info.nombreBanco?defaultInfo.nombreBanco:info.nombreBanco} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                        {
                                                             variable.name==="cbu" && <input value={!info.cbu?defaultInfo.cbu:info.cbu} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="cuit" && <input value={!info.cuit?defaultInfo.cuit:info.cuit} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="fechaVecCel" && <input value={!info.cuifechaVecCelt?defaultInfo.fechaVecCel:info.fechaVecCel} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="fechaVecSeguroAuto" && <input value={!info.fechaVecSeguroAuto?defaultInfo.fechaVecSeguroAuto:info.fechaVecSeguroAutoVecCel} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                        {
                                                             variable.name==="fechaVecSeguroAccidente" && <input value={!info.fechaVecSeguroAccidente?defaultInfo.fechaVecSeguroAccidente:info.fechaVecSeguroAccidente} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                   
                                                   
                                                </div>
                                            </>
                                        : null
                                        }        
                                       
                                    </div>  

                            ))
            
        }
                {
                    componentes?componentes.map(componente => (
                    <div key={componente.title} className="Admin-Pickers-space">
                        {
                            componente.componentType ==="LoadAdminPicker" ? 
                            <LoadAdminPicker
                                 titulo={componente.title}
                                 marginButton={componente.marginButton}
                            />   
                            :
                            null  
                        }
                        {
                            componente.componentType ==="SaveAdminPicker" ? 
                            <SaveAdminPicker
                                 titulo={componente.title}
                                 marginButton={componente.marginButton}
                            />   
                            :
                            null  
                        }
                             
                    </div>


                    )):null
                }
                    
                    
        </>        

      
    )
}
