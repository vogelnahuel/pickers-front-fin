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
import moment from 'moment'




export const PendingUserAdminPicker = () => {

 

    
    

    const [modalOpenAprobar, setmodalOpenAprobar] = useState(false);

    const [disabledButtonAprobarPicker, setdisabledButtonAprobarPicker] = useState(false)
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

         //         if(dataPicker.vehicleTypeId!==" " && dataPicker.expirationDatePolicyPersonal !== null){
           ////             if(dataPicker.vehicleTypeId===2 && dataPicker.expirationDatePolicyPersonal.length>0){
            //                setdisabledButtonAprobarPicker(false)
         //                }
         //                else if(dataPicker.expirationDatePolicyPersonal.length>0 && dataPicker.expirationDatePolicyVehicle.length>0 &&dataPicker.expirationDateDriverLicense.length > 0  && dataPicker.expirationDateIdentificationCar.length > 0 )
         //                {
          //                  setdisabledButtonAprobarPicker(false)
        //                 }
          //           }
                    },
                  
                [],
)

useEffect( () => {
               // const mailCodificado = codificarEmailURIFunction(dataPicker.email);
            const cargarDatos = async () =>{setDataPicker(
                await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
                .then((res)=>{
                    res.data.result.fiscalNumber=res.data.result.fiscalNumber.slice(0,-9)+" - "+res.data.result.fiscalNumber.slice(2,-1)+" - "+res.data.result.fiscalNumber.slice(10)
                    res.data.result.dateOfBirth=res.data.result.dateOfBirth?moment(res.data.result.dateOfBirth).format('DD/MM/YYYY'):res.data.result.dateOfBirth
                    res.data.result.expirationDateDriverLicense=res.data.result.expirationDateDriverLicense?moment(res.data.result.expirationDateDriverLicense).format('DD/MM/YYYY'):res.data.result.expirationDateDriverLicense
                    res.data.result.expirationDateIdentificationCar=res.data.result.expirationDateIdentificationCar?moment(res.data.result.expirationDateIdentificationCar).format('DD/MM/YYYY'):res.data.result.expirationDateIdentificationCar
                    res.data.result.expirationDatePolicyPersonal=res.data.result.expirationDatePolicyPersonal?moment(res.data.result.expirationDatePolicyPersonal).format('DD/MM/YYYY'):res.data.result.expirationDatePolicyPersonal
                    res.data.result.expirationDatePolicyVehicle=res.data.result.expirationDatePolicyVehicle?moment(res.data.result.expirationDatePolicyVehicle).format('DD/MM/YYYY'):res.data.result.expirationDatePolicyVehicle
                    return res.data.result})
                .catch((err)=>{console.log(err)}) )}
            
               cargarDatos()
          
               
                    
}, [id])

          
useEffect(() => {
     habilitarBoton(dataPicker);
}, [habilitarBoton,dataPicker])
            
useEffect(() => {
              
 setInformacion(dataPicker);
 }, [dataPicker])
           
 

const cerrarAprobarPicker = async (e) => {
    
    e.preventDefault();
   
   
    await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}`,{    
        "enable": true,
        "vehicleTypeId": dataPicker.vehicleTypeId,
        "name":Informacion.name ,
         "surname":Informacion.surname ,
         "dateOfBirth":Informacion.dateOfBirth?moment(Informacion.dateOfBirth,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.dateOfBirth,
         "phoneNumber":Informacion.phoneNumber ,
         "identificationNumber":Informacion.identificationNumber ,
         "fiscalNumber":Informacion.fiscalNumber.slice(0,-15)+Informacion.fiscalNumber.slice(5,-4)+Informacion.fiscalNumber.slice(16),
         "bankName":Informacion.bankName,
         "bankIdentifier":Informacion.bankIdentifier,
         "expirationDateDriverLicense":Informacion.expirationDateDriverLicense?moment(Informacion.expirationDateDriverLicense,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateDriverLicense,
         "expirationDateIdentificationCar":Informacion.expirationDateIdentificationCar?moment(Informacion.expirationDateIdentificationCar,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateIdentificationCar,
         "expirationDatePolicyVehicle":Informacion.expirationDatePolicyVehicle?moment(Informacion.expirationDatePolicyVehicle,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyVehicle,
         "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal?moment(Informacion.expirationDatePolicyPersonal,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyPersonal,     
    })
        .then(rs=>{})
        .catch(e=>{})

        window.location.href="/pendingUserAdmin";

}

const cerrarAprobarPickerCorrigiendo  =  (e) => {
    e.preventDefault();
    setmodalOpenAprobar(false);
} 
          

const corregirDocumentos= async (e) =>{
        e.preventDefault();
        console.log( )
        await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}/invalid-documentation`,{    
        "vehicleTypeId": dataPicker.vehicleTypeId,
        "name": Informacion.name  ,
         "surname": Informacion.surname ,
         "dateOfBirth":Informacion.dateOfBirth?moment(Informacion.dateOfBirth,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.dateOfBirth,
         "phoneNumber": Informacion.phoneNumber,
         "identificationNumber":Informacion.identificationNumber ,
         "fiscalNumber":Informacion.fiscalNumber.replace(/ - /,'').replace(/ - /,''),
         "bankName":Informacion.bankName,
         "bankIdentifier":Informacion.bankIdentifier,
         "expirationDateDriverLicense":Informacion.expirationDateDriverLicense?moment(Informacion.expirationDateDriverLicense,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateDriverLicense,
         "expirationDateIdentificationCar":Informacion.expirationDateIdentificationCar?moment(Informacion.expirationDateIdentificationCar,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateIdentificationCar,
         "expirationDatePolicyVehicle":Informacion.expirationDatePolicyVehicle?moment(Informacion.expirationDatePolicyVehicle,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyVehicle,
         "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal?moment(Informacion.expirationDatePolicyPersonal,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyPersonal,     
         "pickerStatusId":3
        })
        .then(rs=>{window.location.href="/pendingUserAdmin";})
        .catch(e=>{})

        
}
const aprobarPicker= async (e) =>{
    e.preventDefault();
    setmodalOpenAprobar(true);           
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
                    {
                            disabledButtonAprobarPicker===true ? <>
                        <button disabled={true} onClick={corregirDocumentos} className="corregir-admin-picker-disable">Corregir documentos</button>
                        
                            <button disabled={true} onClick={aprobarPicker} className="aprobar-admin-picker">Aprobar picker</button></>
                            :
                            <>
                            <button onClick={corregirDocumentos} className="corregir-admin-picker">Corregir documentos</button>
                            <button disabled={false} onClick={aprobarPicker} className="aprobar-admin-picker-active">Aprobar picker</button>
                           </>
                        }
                       
                    </div>
                    
                </form>  

                
    {   modalOpenAprobar === true ? 
                    <div className="contendor-modal-pending-pickers-aprobar">
                            <Modal

                                    width="750px"
                                    height="351px"
                                    isOpen={modalOpenAprobar}
                                   
                                    >
                                    <div className="container-modal">
                                        <div className="modal-error-title2">
                                            <p className="p-modal-error-title">Aprobar picker</p>
                                        </div>
                                        <div className="modal-error-subtitle">
                                            <p className="p-modal-error-subtitle">Al aprobar la solicitud, va a pasar a la pestaña de pickers</p>
                                                <div className="button-pending-picker-modal">
                                                        <button 
                                                            onClick={cerrarAprobarPickerCorrigiendo}
                                                            className="button-modal-revisar">
                                                                    Revisar datos
                                                        </button>
                                                        <button 
                                                            onClick={cerrarAprobarPicker}
                                                            className="button-modal-aprobar">
                                                                    Aprobar
                                                        </button>
                                                </div>
                                        </div>
                                    </div>
                                </Modal>
                        </div>
              : null
        }                     
                    
                </div>
                
                
            </div>
            
        </div>
    )
}
