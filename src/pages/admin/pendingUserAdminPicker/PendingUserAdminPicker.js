import React, {useCallback, useEffect, useState} from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.css'
import './pendingUserAdminPicker.css'
import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import motorcycle from '../../../assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from '../../../assets/admin/PendingUserAdminPicker/bici.svg'
import { Part } from '../../../component/admin/pendingUserAdminPicker/Part'
import {data} from './data'
import api  from '../../../config/api'
import { useParams } from 'react-router-dom'
import codificarEmailURIFunction from '../../../tools/encodeMail.js'
import createCSV from '../../../tools/createCSV'
import { Modal } from 'pickit-components'




export const PendingUserAdminPicker = () => {

    const [disabledButtonAprobarPicker, setdisabledButtonAprobarPicker] = useState(true)
    const [Informacion, setInformacion] = useState({
        nombre:"",
        apellido:"",
        dni:"",
        email:"",
        fechaNac:"",
        telefono:"",   
        nombreBanco:"",
        cbu:"",
        cuit:"",
        vencimientoLicencia:"",
        fechaVecCel:"",
        fechaVecSeguroAuto:"",
        fechaVecSeguroAccidente:"",
    })
 

    const [info, setInfo] = useState( {
        nombre:"",
        apellido:"",
        dni:"",
        email:"",
        fechaNac:"",
        telefono:"",   
        nombreBanco:"",
        cbu:"",
        cuit:"",
        vencimientoLicencia:"",
        fechaVecCel:"",
        fechaVecSeguroAuto:"",
        fechaVecSeguroAccidente:"",
    }); 
  
 
   
    const id= useParams().id  
    /****Campos y componentes a mostrar  que se muestran en un part que es parte del diseño*/
    const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();
   
    const [dataPicker, setDataPicker] = useState({bankIdentifier: "",
    bankName: "",
    dateOfBirth: "",
    email: "",
    expirationDateDriverLicense: "",
    expirationDateIdentificationCar: "",
    expirationDatePolicyPersonal: "",
    expirationDatePolicyVehicle: "",
    fiscalNumber: "",
    id: "",
    identificationNumber: "",
    name: "",
    phoneNumber: "",
    pickerStatusId: "",
    registerDate: null,
    surname:"",
    vehicleTypeId: ""})

            const Export = async () => {                
                const mailCodificado = codificarEmailURIFunction(dataPicker.email);

                const datosExport =await api.get(`/ms-admin-rest/api/v1.0/pickers.csv?&email=${mailCodificado}`)
                .then( (res) => {return res})
                .catch((err) => {console.log(err)})
           
                createCSV(datosExport);           
            }
    
            
            const habilitarBoton   =   useCallback(
                  (dataPicker) => {


                    
                    
                    if(dataPicker.vehicleTypeId!==" " && dataPicker.expirationDatePolicyPersonal !== null){
                        if(dataPicker.vehicleTypeId===2 && dataPicker.expirationDatePolicyPersonal.length>0){
                            setdisabledButtonAprobarPicker(false)
                         }
                         else if(dataPicker.expirationDatePolicyPersonal.length>0 && dataPicker.expirationDatePolicyVehicle.length>0 &&dataPicker.expirationDateDriverLicense.length > 0  && dataPicker.expirationDateIdentificationCar.length > 0 )
                         {
                            setdisabledButtonAprobarPicker(false)
                         }
                     }
                    },
                  
                [],
            )

            useEffect( () => {
               // const mailCodificado = codificarEmailURIFunction(dataPicker.email);
            const cargarDatos = async () =>{setDataPicker(
                await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
                .then((res)=>{return res.data.result})
                .catch((err)=>{console.log(err)}) )}
            
               cargarDatos()
               
              
            }, [id])

          
          useEffect(() => {
            habilitarBoton(dataPicker);
          }, [habilitarBoton,dataPicker])
            
          useEffect(() => {
              
            setInformacion(dataPicker);
          }, [dataPicker])
                

          

    const corregirDocumentos= async (e) =>{
        e.preventDefault();
        
    
        await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}/invalid-documentation`,{    
        "vehicleTypeId": dataPicker.vehicleTypeId,
        "name": info.nombre ? info.nombre :dataPicker.name ,
         "surname": info.apellido ? info.apellido : dataPicker.surname ,
         "dateOfBirth": info.fechaNac ? info.fechaNac : dataPicker.dateOfBirth ,
         "phoneNumber": info.telefono ? info.telefono : dataPicker.phoneNumber ,
         "identificationNumber":(info.dni) ? (info.dni) :dataPicker.identificationNumber ,
         "fiscalNumber": info.cuit ?info.cuit :  dataPicker.fiscalNumber,
         "bankName":info.nombreBanco? info.nombreBanco : dataPicker.bankName,
         "bankIdentifier":info.cbu ?info.cbu :  dataPicker.bankIdentifier,
         "expirationDateDriverLicense": info.vencimientoLicencia ? info.vencimientoLicencia : dataPicker.expirationDateDriverLicense,
         "expirationDateIdentificationCar":info.fechaVecCel?info.fechaVecCel: dataPicker.expirationDateIdentificationCar,
         "expirationDatePolicyVehicle":info.fechaVecSeguroAuto?info.fechaVecSeguroAuto: dataPicker.expirationDatePolicyVehicle,
         "expirationDatePolicyPersonal": info.fechaVecSeguroAccidente?info.fechaVecSeguroAccidente: dataPicker.expirationDatePolicyPersonal,        
         "pickerStatusId":3
        })
        .then(rs=>{})
        .catch(e=>{})

        window.location.reload();
    }
    const aprobarPicker= async (e) =>{
        e.preventDefault();
        await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}`,{    
        "enable": true,
        "vehicleTypeId": dataPicker.vehicleTypeId,
        "name": info.nombre ? info.nombre :dataPicker.name ,
         "surname": info.apellido ? info.apellido : dataPicker.surname ,
         "dateOfBirth": info.fechaNac ? info.fechaNac : dataPicker.dateOfBirth ,
         "phoneNumber": info.telefono ? info.telefono : dataPicker.phoneNumber ,
         "identificationNumber":(info.dni) ? (info.dni) :dataPicker.identificationNumber ,
         "fiscalNumber": info.cuit ?info.cuit :  dataPicker.fiscalNumber,
         "bankName":info.nombreBanco? info.nombreBanco : dataPicker.bankName,
         "bankIdentifier":info.cbu ?info.cbu :  dataPicker.bankIdentifier,
         "expirationDateDriverLicense": info.vencimientoLicencia ? info.vencimientoLicencia : dataPicker.expirationDateDriverLicense,
         "expirationDateIdentificationCar":info.fechaVecCel?info.fechaVecCel: dataPicker.expirationDateIdentificationCar,
         "expirationDatePolicyVehicle":info.fechaVecSeguroAuto?info.fechaVecSeguroAuto: dataPicker.expirationDatePolicyVehicle,
         "expirationDatePolicyPersonal": info.fechaVecSeguroAccidente?info.fechaVecSeguroAccidente: dataPicker.expirationDatePolicyPersonal        
    })
        .then(rs=>{})
        .catch(e=>{})

        window.location.href="/pendingUserAdmin";
    }
    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="pending-container">
                     <PendingBlue/>
                       
                     <div 
                     className="mainContainerFlex">
                         <h2 className="subTitle-pending">{dataPicker.name} {dataPicker.surname}</h2>
                         {
                             dataPicker.vehicleTypeId===1 ? 
                             <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                            :
                            <img  className="vehiculo-pending-picker" src={bici} alt="vehiculo" />
                         
                         }
                        <button 
                            onClick={Export}
                            className="Admin-Pickers-button"
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
                        setInfo={setInfo}
                        info={info}                
                        inputsPart={inputsPart1}                      
                        ComponentesPart={ComponentesPart1}
                        data={dataPicker}
                        clave={1}
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
             
                        Informacion={Informacion}
                        setInformacion={setInformacion}

                        />
                </div>
                
                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                <div  className="form-part-1-admin-pickers">
                        <Part
                        setInfo={setInfo}
                        info={info}
                        inputsPart={inputsPart2}                 
                        ComponentesPart={ComponentesPart2}
                        data={dataPicker}
                        clave={2}
                        
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
                        
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        />                          
                </div>

                    <h3 className="subTitle-pending-data">Seguros</h3>

                 <div  className="form-part-1-admin-pickers">  
                        <Part
                        setInfo={setInfo}
                        info={info}
                        inputsPart={inputsPart3}                   
                        ComponentesPart={ComponentesPart3}
                        data={dataPicker}   
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
                        clave={3}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        />  

                        <Part
                        setInfo={setInfo}
                        info={info}
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        data={dataPicker}
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}   
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        clave={4}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        /> 
                 </div>
                     
                    
                    
                    <div className="pending-admin-picker-button">
                        <button onClick={corregirDocumentos} className="corregir-admin-picker">Corregir documentos</button>
                        {
                            disabledButtonAprobarPicker===true ?  
                            <button disabled={true} onClick={aprobarPicker} className="aprobar-admin-picker">Aprobar picker</button>
                            :
                            <button disabled={false} onClick={aprobarPicker} className="aprobar-admin-picker-active">Aprobar picker</button>
                           
                        }
                       
                    </div>
                    
                </form>  
                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
