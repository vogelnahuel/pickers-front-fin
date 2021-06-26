import React, { useEffect, useState } from 'react'
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
import codificarEmailURIFunction from '../../../tools/encodeMail.js'
import { useParams } from 'react-router-dom'
import api from '../../../config/api'
import createCSV from '../../../tools/createCSV'
import  disabledButton  from '../../../assets/admin/ActiveUserAdminPicker/disabledButton.svg' 

export const ActiveUserAdminPicker = () => {
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
    const id = useParams().id;  
    const [imgEnabled, setimgEnabled] = useState(true);
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

    useEffect(()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
       // const mailCodificado = codificarEmailURIFunction(dataPicker.email);
        const cargarDatos = async () =>{setDataPicker(
            await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
            .then((res)=>{return res.data.result})
            .catch((err)=>{console.log(err)}) )}
       
       cargarDatos();
    
      },[id])

    const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();
   
    const Export = async () => {              
        const mailCodificado = codificarEmailURIFunction(dataPicker.email);
        const datosExport =await api.get(`/ms-admin-rest/api/v1.0/pickers.csv?&email=${mailCodificado}`)
        .then( (res) => {return res})
        .catch((err) => {console.log(err)})
   
        createCSV(datosExport);   
    }

    const onCLickImg = () =>{

        setimgEnabled(!imgEnabled);
       
    }
    const corregirDocumentos= async (e) =>{
        e.preventDefault();
        
    
                await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}/invalid-documentation`,{    
                "vehicleTypeId": dataPicker.vehicleTypeId,
                "name": info.nombre[0] ? info.nombre[0] :dataPicker.name ,
                "surname": info.apellido[0] ? info.apellido[0] : dataPicker.surname ,
                "dateOfBirth": info.fechaNac[0] ? info.fechaNac[0] : dataPicker.dateOfBirth ,
                "phoneNumber": info.telefono[0] ? info.telefono[0] : dataPicker.phoneNumber ,
                "identificationNumber":(info.dni[0]) ? (info.dni[0]) :dataPicker.identificationNumber ,
                "fiscalNumber": info.cuit[0] ?info.cuit[0] :  dataPicker.fiscalNumber,
                "bankName":info.nombreBanco[0]? info.nombreBanco[0] : dataPicker.bankName,
                "bankIdentifier":info.cbu[0] ?info.cbu[0] :  dataPicker.bankIdentifier,
                "expirationDateDriverLicense": info.vencimientoLicencia[0] ? info.vencimientoLicencia[0] : dataPicker.expirationDateDriverLicense,
                "expirationDateIdentificationCar":info.fechaVecCel[0]?info.fechaVecCel[0]: dataPicker.expirationDateIdentificationCar,
                "expirationDatePolicyVehicle":info.fechaVecSeguroAuto[0]?info.fechaVecSeguroAuto[0]: dataPicker.expirationDatePolicyVehicle,
                "expirationDatePolicyPersonal": info.fechaVecSeguroAccidente[0]?info.fechaVecSeguroAccidente[0]: dataPicker.expirationDatePolicyPersonal        
            })
    }

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
                    
                     
                        {
                            imgEnabled===true ? 
                            <>
                             <p className="admin-active-picker">Deshabilitado</p>
                             <img onClick={onCLickImg}  className="button-active-picker" src={button} alt="vehiculo" />     
                             <p className="admin-active-picker-p">Habilitado</p>
                            </>
                            : 
                            <> 
                                <p className="admin-buttonDisabled-picker-disabled">Deshabilitado</p>
                                <img onClick={onCLickImg}  className="button-active-picker" src={disabledButton} alt="vehiculo" />     
                                <p className="admin-buttonDisabled-picker-enabled">Habilitado</p>
                            </>
                        }
                   

                     <button 
                        
                        className="export"
                        name="export"
                        onClick={Export}
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
                        />  

                        <Part
                         setInfo={setInfo}
                         info={info}  
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        data={dataPicker}
                        /> 
                 </div>
                    
                    <div className="pending-admin-picker-button">
                        <button className="corregir-admin-picker-active">Cancelar</button>
                        <button onClick={corregirDocumentos} className="aprobar-admin-picker">Guardar</button>
                    </div>
                    
                </form>  
            </div>
            
            
        </div>
        
    </div>
    )
}
