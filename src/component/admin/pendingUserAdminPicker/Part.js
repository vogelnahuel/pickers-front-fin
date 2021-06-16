import React, { useState } from 'react'
import { LoadAdminPicker } from '../LoadAdminPicker/LoadAdminPicker'
import {Labels}  from '../../Labels/Labels'


import './part.css'
import { SaveAdminPicker } from '../SaveAdminPicker/SaveAdminPicker'

/**** muestro los campos con sus labels y tambien los componentes pasados */
export const Part = (props) => {


    const variables = props.inputsPart;
    const componentes = props.ComponentesPart;
    const dataPicker = props.data;
    console.log(dataPicker)
    const [info, setInfo] = useState({
        nombre:"",
        apellido:"",
        dni:"",
        email:"",
        fechaNac:"",
        telefono:"",
    });
    let nombre2="";
    let apellido2="";
    let dni2="";
    let email2="";
    let fechaNac2="";
    let telefono2="";
   

    const handleChange=(e,id) => {

        switch (e.target.name) {
            case "nombre":
                nombre2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;
            case "apellido":
                apellido2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;
            case "dni":
                apellido2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;
            case "email":
                apellido2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;
            case "fechaNac":
                apellido2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;
            case "telefono":
                apellido2+=e.target.value;
                setInfo( {
                    ...info,
                    [e.target.name]:[e.target.value]}
                     );
            break;

        
            default:
                break;
        }
         

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
                                                         variable.name ==="nombre" && <input value={info.nombre||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>                                                                                                     
                                                       } 
                                                       {
                                                             variable.name==="apellido" && <input value={info.apellido||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="dni" && <input value={info.dni||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="email" && <input value={info.email||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="fechaNac" && <input value={info.fechaNac||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                       {
                                                             variable.name==="telefono" && <input value={info.telefono||''} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                       }
                                                   
                                                </div>
                                            </>
                                        : null
                                        }        
                                       
                                    </div>  

                            ))
            
        }
                {
                    componentes.map(componente => (
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


                    ))
                }
                    
                    
        </>        

      
    )
}
