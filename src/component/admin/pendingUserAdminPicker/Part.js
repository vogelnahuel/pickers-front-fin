import React, { useCallback, useEffect } from 'react'
import { LoadAdminPicker } from '../LoadAdminPicker/LoadAdminPicker'
import {Labels}  from '../../Labels/Labels'
import './part.css'
import { SaveAdminPicker } from '../SaveAdminPicker/SaveAdminPicker'



/**** muestro los campos con sus labels y tambien los componentes pasados */
export const Part = (props) => {

 
   
    const variables = props.inputsPart;
    const componentes = props.ComponentesPart;
    const dataPicker = props.data;
   
    let Informacion = props.Informacion;
    const setInformacion = props.setInformacion;
    const setdisabledButtonAprobarPicker = props.setdisabledButtonAprobarPicker;


   
   
  /*
    const handleSubmit = () =>{
        console.log("submit")
    }*/

    

    const handleChange=(e) => {
        /*
        setInformacion( {
                        ...Informacion,
                        [e.target.name]:e.target.value
                        }
                 ); */
            if(e.target.name==="nombre"){
                    setInformacion(
                        {
                        ...Informacion,
                        name:e.target.value
                        }
                    );
                }
            if(e.target.name==="apellido"){
                    setInformacion(
                        {
                        ...Informacion,
                        surname:e.target.value
                        }
                    );
                }

            if(e.target.name==="fechaNac"){
            setInformacion(
                {
                ...Informacion,
                dateOfBirth:e.target.value
                }
            );
            }
            if(e.target.name==="telefono"){
                    setInformacion(
                        {
                        ...Informacion,
                        phoneNumber:e.target.value
                        }
                    );
            }
          
            if(e.target.name==="dni"){
                    setInformacion(
                        {
                        ...Informacion,
                        identificationNumber:e.target.value
                        }
                    );
            }
            if(e.target.name==="nombreBanco"){
                setInformacion(
                    {
                    ...Informacion,
                    bankName:e.target.value
                    }
                );
        }





           if(e.target.name==="vencimientoLicencia"){
                setInformacion(
                    {
                    ...Informacion,
                    expirationDateDriverLicense:e.target.value
                    }
                );
            }
             if(e.target.name==="fechaVecCel"){
                setInformacion(
                    {
                    ...Informacion,
                    expirationDateIdentificationCar:e.target.value
                    }
                );
            }
             if(e.target.name==="fechaVecSeguroAuto"){
                setInformacion(
                    {
                    ...Informacion,
                    expirationDatePolicyVehicle:e.target.value
                    }
                );
            }
              if(e.target.name==="fechaVecSeguroAccidente"){
                setInformacion(
                    {
                    ...Informacion,
                    expirationDatePolicyPersonal:e.target.value
                    }
                );
            }
        
       
        

    }   
    const  verificarInformacion  = useCallback(

        (Informacion) => {

            
            if(Informacion.vehicleTypeId===1 &&Informacion.expirationDateDriverLicense!==null ) {
           
                if(Informacion.expirationDateDriverLicense.length<10 ||Informacion.expirationDateIdentificationCar.length<10 || Informacion.expirationDatePolicyVehicle.length<10 || Informacion.expirationDatePolicyPersonal.length<10 ){
                    setdisabledButtonAprobarPicker(true);
                }
    
               
            }
             if(Informacion.vehicleTypeId===1 &&Informacion.expirationDateDriverLicense!==null)  {
                
                if(Informacion.expirationDateDriverLicense.length>=10 && Informacion.expirationDateIdentificationCar.length>=10 && Informacion.expirationDatePolicyVehicle.length>=10 && Informacion.expirationDatePolicyPersonal.length>=10 ){
                    setdisabledButtonAprobarPicker(false);
                }
                
            }
    
            if(Informacion.vehicleTypeId===2 && Informacion.expirationDatePolicyPersonal!==null ){
                if(Informacion.expirationDatePolicyPersonal.length<10)
                setdisabledButtonAprobarPicker(true);
            }
             if(Informacion.vehicleTypeId===2 && Informacion.expirationDatePolicyPersonal!==null) {
                if(Informacion.expirationDatePolicyPersonal.length>=10)
                setdisabledButtonAprobarPicker(false);
            }
        },
        [setdisabledButtonAprobarPicker],
    )


    useEffect(() => {

        verificarInformacion(Informacion)

    }, [verificarInformacion,Informacion])
    
    
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
                                            <input value={Informacion.expirationDatePolicyPersonal?Informacion.expirationDatePolicyPersonal:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
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
                                                                        variable.name ==="nombre" && <input value={Informacion.name?Informacion.name:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>                                                                                                     
                                                                    } 
                                                                    {
                                                                            variable.name==="apellido" && <input value={Informacion.surname?Informacion.surname:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="dni" && <input value={Informacion.identificationNumber?Informacion.identificationNumber:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="email" && <input value={Informacion.email?Informacion.email:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="fechaNac" && <input value={Informacion.dateOfBirth?Informacion.dateOfBirth:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="telefono" && <input value={Informacion.phoneNumber?Informacion.phoneNumber:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    
                                                                        {
                                                                            variable.name==="nombreBanco" && <input value={Informacion.bankName?Informacion.bankName:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                        {
                                                                            variable.name==="cbu" && <input readOnly value={Informacion.bankIdentifier?Informacion.bankIdentifier:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                            variable.name==="cuit" && <input readOnly value={Informacion.fiscalNumber?Informacion.fiscalNumber:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                    }
                                                                    {
                                                                        dataPicker.vehicleTypeId===1 ? 
                                                                        <>
                                                                                {
                                                                                        variable.name==="vencimientoLicencia" && <input value={Informacion.expirationDateDriverLicense ?  Informacion.expirationDateDriverLicense : ""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecCel" && <input value={Informacion.expirationDateIdentificationCar?Informacion.expirationDateIdentificationCar:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecSeguroAuto" && <input key={variable.id} value={Informacion.expirationDatePolicyVehicle?Informacion.expirationDatePolicyVehicle:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
                                                                                }
                                                                                {
                                                                                        variable.name==="fechaVecSeguroAccidente" && <input value={Informacion.expirationDatePolicyPersonal?Informacion.expirationDatePolicyPersonal:""} onChange={(e)=> {handleChange(e,variable.id)}}   className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>   
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
