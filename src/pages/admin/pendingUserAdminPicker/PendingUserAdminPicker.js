import React, {useEffect, useState} from 'react'
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
import api  from '../../../config/api'
import { useParams } from 'react-router-dom'
import codificarEmailURIFunction from '../../../tools/encodeMail.js'
import createCSV from '../../../tools/createCSV'
import e from 'cors'



export const PendingUserAdminPicker = () => {


 
   
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
    
      
            useEffect( () => {
                const mailCodificado = codificarEmailURIFunction(dataPicker.email);
            const cargarDatos = async () =>{setDataPicker(
                await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
                .then((res)=>{return res.data.result})
                .catch((err)=>{console.log(err)}) )}
           
           cargarDatos()
            }, [])
    const corregirDocumentos= async (e) =>{
        e.preventDefault();
        await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}`,{    
         "enable": true,
        //  "vehicleTypeId": dataPicker.vehicleTypeId,
        //  "name": dataPicker.name,
        // "surname": dataPicker.surname,
        // "dateOfBirth": dataPicker.dateOfBirth,
        // "phoneNumber": dataPicker.phoneNumber,
        // "identificationNumber":dataPicker.identificationNumber,
        // "fiscalNumber":dataPicker.identificationNumber,
        // "bankName":dataPicker.bankName,
        // "bankIdentifier":dataPicker.bankIdentifier,
        // "expirationDateDriverLicense": dataPicker.expirationDateDriverLicense,
        // "expirationDateIdentificationCar":dataPicker.expirationDateIdentificationCar,
        // "expirationDatePolicyVehicle":dataPicker.expirationDatePolicyVehicle,
        // "expirationDatePolicyPersonal": dataPicker.expirationDatePolicyPersonal

"vehicleTypeId": 1,
"name": "Cosme",
"surname": "Fulanito",
"dateOfBirth": "2000-06-01",
"phoneNumber": "32165484",
"identificationNumber":"12345678",
"fiscalNumber":"20378885559",
"bankName":"Macro",
"bankIdentifier":"1234567891234567891242",
"expirationDateDriverLicense": null,
"expirationDateIdentificationCar":"2021-06-22",
"expirationDatePolicyVehicle":"2021-06-29",
"expirationDatePolicyPersonal": "2021-06-29"
            
    })
        .then(rs=>{})
        .catch(e=>{})
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
                         <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                         <button 
                            onClick={Export}
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
                        data={dataPicker}
                        />
                </div>
                
                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                <div  className="form-part-1-admin-pickers">
                        <Part
                        inputsPart={inputsPart2}                 
                        ComponentesPart={ComponentesPart2}
                        data={dataPicker}
                        />                          
                </div>

                    <h3 className="subTitle-pending-data">Seguros</h3>

                 <div  className="form-part-1-admin-pickers">  
                        <Part
                        inputsPart={inputsPart3}                   
                        ComponentesPart={ComponentesPart3}
                        data={dataPicker}
                        />  

                        <Part
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        data={dataPicker}
                        /> 
                 </div>
                     
                    
                    
                    <div className="pending-admin-picker-button">
                        <button onClick={corregirDocumentos} className="corregir-admin-picker">Corregir documentos</button>
                        <button className="aprobar-admin-picker">Aprobar picker</button>
                    </div>
                    
                </form>  
                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
