import React, {useEffect, useState} from 'react'
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




export const PendingUserAdminPicker = () => {

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
    
      
            useEffect( () => {
               // const mailCodificado = codificarEmailURIFunction(dataPicker.email);
            const cargarDatos = async () =>{setDataPicker(
                await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
                .then((res)=>{return res.data.result})
                .catch((err)=>{console.log(err)}) )}
           
           cargarDatos()
            }, [id])
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
        .then(rs=>{})
        .catch(e=>{})

        window.location.reload();
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
                        <button onClick={corregirDocumentos} className="corregir-admin-picker">Corregir documentos</button>
                        <button className="aprobar-admin-picker">Aprobar picker</button>
                    </div>
                    
                </form>  
                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
