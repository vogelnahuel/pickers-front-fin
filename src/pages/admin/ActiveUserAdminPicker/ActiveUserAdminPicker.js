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
import bici from '../../../assets/admin/PendingUserAdminPicker/bici.svg'

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
        pickerStatusId: 0,
    }); 
    const id = useParams().id;  
    const [imgEnabled, setimgEnabled] = useState(true);
    const [dataPicker, setDataPicker] = useState({
    bankIdentifier: "",
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
    pickerStatusId: 0,
    enable:true,
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
            .then((res)=>{
                const result=res.data.result
                result.enable=res.data.result.pickerStatusId===4?true:false
                return result})
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
        console.log(dataPicker.enable)
        setDataPicker(
            dataPicker,
            dataPicker.enable=!dataPicker.enable
        )
        }
   
    const modificarPicker= async (e) =>{
        e.preventDefault();
        
    
                await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}`,{  
                "enable": dataPicker.enable,  
                "vehicleTypeId": dataPicker.vehicleTypeId,
                "name": info.nombre ? info.nombre :dataPicker.name ,
                "surname": info.apellido ? info.apellido : dataPicker.surname ,
                "dateOfBirth": info.fechaNac ? info.fechaNac : dataPicker.dateOfBirth ,
                "phoneNumber": info.telefono ? info.telefono : dataPicker.phoneNumber ,
                "identificationNumber":(info.dni) ? (info.dni) :dataPicker.identificationNumber ,
                "fiscalNumber": info.cuit ?info.cuit :  dataPicker.fiscalNumber,
                "bankName":info.nombreBanco? info.nombreBanco : dataPicker.bankName,
                "bankIdentifier":info.cbu ?info.cbu :  dataPicker.bankIdentifier,
                "expirationDateDriverLicense": info.vencimientoLicencia ? info.vencimientoLicencia: dataPicker.expirationDateDriverLicense,
                "expirationDateIdentificationCar":info.fechaVecCel?info.fechaVecCel: dataPicker.expirationDateIdentificationCar,
                "expirationDatePolicyVehicle":info.fechaVecSeguroAuto?info.fechaVecSeguroAuto: dataPicker.expirationDatePolicyVehicle,
                "expirationDatePolicyPersonal": info.fechaVecSeguroAccidente?info.fechaVecSeguroAccidente: dataPicker.expirationDatePolicyPersonal        
                
                }).then(()=>{ window.location.reload()}
                   
                )
                .catch(()=>{})
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
                     <h2 className="subTitle-pending">{dataPicker.name} {dataPicker.surname}</h2>
                     {
                             dataPicker.vehicleTypeId===1 ? 
                             <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                            :
                            <img  className="vehiculo-pending-picker" src={bici} alt="vehiculo" />
                         
                         }
                     
                        {
                            dataPicker.enable ===true ? 
                            <>
                             <p className="admin-active-picker">Deshabilitado</p>
                             <img onClick={onCLickImg}  className="button-active-picker" src={button} alt="boton" />     
                             <p className="admin-active-picker-p">Habilitado</p>
                            </>
                            : 
                            <> 
                                <p className="admin-buttonDisabled-picker-disabled">Deshabilitado</p>
                                <img onClick={onCLickImg}  className="button-active-picker" src={disabledButton} alt="boton" />     
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
                        <button onClick={modificarPicker} className="aprobar-admin-picker">Guardar</button>
                    </div>
                    
                </form>  
            </div>
            
            
        </div>
        
    </div>
    )
}
