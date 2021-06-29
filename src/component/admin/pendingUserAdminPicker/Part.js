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
    const setInfo = props.setInfo;
    let info = props.info;
    const setdisabledButtonAprobarPicker=props.setdisabledButtonAprobarPicker;  

    

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
        cuit:dataPicker.fiscalNumber,
        fechaVecCel:dataPicker.expirationDateIdentificationCar,
        fechaVecSeguroAuto:dataPicker.expirationDatePolicyVehicle,
        fechaVecSeguroAccidente:dataPicker.expirationDatePolicyPersonal,
    }
   
  /*
    const handleSubmit = () =>{
        console.log("submit")
    }*/


    const [vencimientoLicencia2, setvencimientoLicencia2] = useState(false);
    const [fechaVecCel2, setfechaVecCel2] = useState(false);
    const [fechaVecSeguroAuto2, setfechaVecSeguroAuto2] = useState(false);
    const [fechaVecSeguroAccidente2, setfechaVecSeguroAccidente2] = useState(false);

   

    let seguro =  {
        vencimientoLicencia:  vencimientoLicencia2 ===true ? info.vencimientoLicencia :dataPicker.expirationDateDriverLicense,
        fechaVecCel:  fechaVecCel2===true  ?info.fechaVecCel: dataPicker.expirationDateIdentificationCar,
        fechaVecSeguroAuto: fechaVecSeguroAuto2 ===true ?info.fechaVecSeguroAuto: dataPicker.expirationDatePolicyVehicle,
        fechaVecSeguroAccidente: fechaVecSeguroAccidente2 === true ?info.fechaVecSeguroAccidente:  dataPicker.expirationDatePolicyPersonal,
    }


    const handleChange=(e,id) => {
        

            console.log(seguro);
                
             seguro  = {
                vencimientoLicencia:seguro.vencimientoLicencia,
                fechaVecCel:seguro.fechaVecCel,
                fechaVecSeguroAuto:seguro.fechaVecSeguroAuto,
                fechaVecSeguroAccidente:seguro.fechaVecSeguroAccidente,
                [e.target.name]:e.target.value
             }    

             console.log(seguro);
       
           

             setInfo( {
                        ...info,
                        [e.target.name]:e.target.value
                        }
                 ); 
                
   
       
        if(dataPicker.vehicleTypeId===1 && (e.target.name==="fechaVecSeguroAccidente"  ||(e.target.name==="vencimientoLicencia" ) || (e.target.name==="fechaVecCel" ) || (e.target.name==="fechaVecSeguroAuto") ) && e.target.value.length<10){

            

            if(seguro.vencimientoLicencia === null  || seguro.vencimientoLicencia.length<10 || seguro.fechaVecCel===null|| seguro.fechaVecCel.length<10 || seguro.fechaVecSeguroAuto===null|| seguro.fechaVecSeguroAuto.length<10 ||  seguro.fechaVecSeguroAccidente === null || seguro.fechaVecSeguroAccidente.length<10 )
            {
                setdisabledButtonAprobarPicker(true);
            }
            
            if(e.target.name==="vencimientoLicencia"){
                
                setvencimientoLicencia2(true)
            }
            if(e.target.name==="fechaVecSeguroAccidente"){
                
                setfechaVecSeguroAccidente2(true)
            }
            if(e.target.name==="fechaVecCel"){
         
                setfechaVecCel2(true)
            }
            if(e.target.name==="fechaVecSeguroAuto"){
                setfechaVecSeguroAuto2(true)
            }

        }
        else    if(dataPicker.vehicleTypeId===1 && (e.target.name==="fechaVecSeguroAccidente"  ||(e.target.name==="vencimientoLicencia" ) || (e.target.name==="fechaVecCel" ) || (e.target.name==="fechaVecSeguroAuto") ) && e.target.value.length>=10) {
           
            if(seguro.vencimientoLicencia !== null && seguro.vencimientoLicencia.length===10 && seguro.fechaVecCel!==null   &&   seguro.fechaVecCel.length===10 && seguro.fechaVecSeguroAuto!==null && seguro.fechaVecSeguroAuto.length===10 && seguro.fechaVecSeguroAccidente === null && seguro.fechaVecSeguroAccidente.length===10 )
            {
                setdisabledButtonAprobarPicker(false);
            }
            
        }


        if(dataPicker.vehicleTypeId===2  && e.target.name==="fechaVecSeguroAccidente" && e.target.value.length<10){
            setdisabledButtonAprobarPicker(true);   
        }
        else if(dataPicker.vehicleTypeId===2 && e.target.name==="fechaVecSeguroAccidente" && e.target.value.length===10) {
            setdisabledButtonAprobarPicker(false);   
        }

    }   
    
    
    return (
       <>
       
         {         

           
                            variables.map( variable => (
                             <div key={variable.id}>
                             {
                             dataPicker.vehicleTypeId===2  &&  variable.name==="fechaVecSeguroAccidente" ?  
                             <div key={props.clave+"alone"} className="Admin-Pickers-space-alone">  
                                        
                                   {
                                    variable.name==="fechaVecSeguroAccidente" ? 
                                    <div key={variable.label.labelhtmlFor}>
                                        <div>
                                            <Labels width={variable.label.labelwidth} className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor} parrafo={variable.label.labelparrafo} />
                                        </div>
                                        <div>
                                            <input value={!info.fechaVecSeguroAccidente?defaultInfo.fechaVecSeguroAccidente?defaultInfo.fechaVecSeguroAccidente:"":info.fechaVecSeguroAccidente} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                        </div>  
                                    </div>
                                    : null
                                 }
                                </div> : null
                             }

                                <div key={variable.id} className="Admin-Pickers-space">
                                                    {   variable.type !== "" ? 
                                                            <>
                                                                <div>
                                                                    { 
                                                                        dataPicker.vehicleTypeId===2  && variable.name==="fechaVecSeguroAccidente" ? <></> :  dataPicker.vehicleTypeId===2 &&  (variable.name==="vencimientoLicencia" || variable.name==="fechaVecCel" || variable.name==="fechaVecSeguroAuto")  ? <></> : <Labels width={variable.label.labelwidth} className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor} parrafo={variable.label.labelparrafo} /> 
                                                                    }
                                                                    
                                                                </div>
                                                                <div >
                                                                    {
                                                                        variable.name ==="nombre" && <input value={!info.nombre?defaultInfo.nombre ?  defaultInfo.nombre :"" :info.nombre} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>                                                                                                     
                                                                    } 
                                                                    {
                                                                            variable.name==="apellido" && <input value={!info.apellido?defaultInfo.apellido ? defaultInfo.apellido:"" :info.apellido} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="dni" && <input value={!info.dni?defaultInfo.dni ?defaultInfo.dni:"" :info.dni} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="email" && <input value={!info.email?defaultInfo.email?defaultInfo.email:""  :info.email} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="fechaNac" && <input value={!info.fechaNac?defaultInfo.fechaNac ?  defaultInfo.fechaNac:"" :info.fechaNac} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="telefono" && <input value={!info.telefono?defaultInfo.telefono ? defaultInfo.telefono:""  :info.telefono} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    
                                                                        {
                                                                            variable.name==="nombreBanco" && <input value={!info.nombreBanco?defaultInfo.nombreBanco?defaultInfo.nombreBanco:"":info.nombreBanco} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                        {
                                                                            variable.name==="cbu" && <input readOnly value={!info.cbu?defaultInfo.cbu?defaultInfo.cbu:"":info.cbu} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="cuit" && <input readOnly value={!info.cuit?defaultInfo.cuit?defaultInfo.cuit:"":info.cuit} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                        dataPicker.vehicleTypeId===1 ? 
                                                                        <>
                                                                                {
                                                                                        variable.name==="vencimientoLicencia" && <input value={!info.vencimientoLicencia?defaultInfo.vencimientoLicencia?defaultInfo.vencimientoLicencia:"" :info.vencimientoLicencia} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecCel" && <input value={!info.fechaVecCel?defaultInfo.fechaVecCel?defaultInfo.fechaVecCel:"":info.fechaVecCel} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecSeguroAuto" && <input key={variable.id} value={!info.fechaVecSeguroAuto?defaultInfo.fechaVecSeguroAuto?defaultInfo.fechaVecSeguroAuto:"":info.fechaVecSeguroAutoVecCel} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecSeguroAccidente" && <input value={!info.fechaVecSeguroAccidente?defaultInfo.fechaVecSeguroAccidente?defaultInfo.fechaVecSeguroAccidente:"":info.fechaVecSeguroAccidente} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>
                                                                               
                                                                            </>

                                                                    }
                                                      
                                                   
                                                        
                                                                </div>
                                                            </>
                                                        : null
                                                    }        
                                            
                                            </div>  

                                    </div>   ))
            
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
