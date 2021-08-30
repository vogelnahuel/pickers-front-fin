import React, {useCallback, useEffect, useState} from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.scss'
import './pendingUserAdminPicker.scss'
import {PendingBlue} from '../../../component/admin/Sub-Title-Image/PendingBlue'
import exportar from '../../../assets/admin/PendingUser/exportar.svg'
import or from '../../../assets/admin/PendingUser/or.svg'
import motorcycle from '../../../assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from '../../../assets/admin/PendingUserAdminPicker/bici.svg'
import { Part } from '../../../component/admin/pendingUserAdminPicker/Part'
import {data} from './data'
import api  from '../../../config/api'
//import { useParams } from 'react-router-dom'
import codificarEmailURIFunction from '../../../tools/encodeMail.js'
import createCSV from '../../../tools/createCSV'
import { Modal } from '@pickit/pickit-components'
import moment from 'moment'




export const PendingUserAdminPicker = ({isFetching,pendingUserAdminPicker,getPendingUserPickerExport,modalExportPicker,getPendingUserPickerExportCloseModal}) => {

  
 
 
    const [loader, setloader] = useState(true);
    
  
    const [ModalAprobadoExito, setModalAprobadoExito] = useState(false);
    const [modalOpenAprobar, setmodalOpenAprobar] = useState(false);

    const [disabledButtonAprobarPicker, setdisabledButtonAprobarPicker] = useState(true);

     

    const [Informacion, setInformacion] = useState(pendingUserAdminPicker)



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
    vehicleTypeId: "",
    nya: "",
   
})

            
const habilitarBoton   =   useCallback(
                  (dataPicker) => {

                  if(dataPicker.vehicleTypeId!==" " && dataPicker.expirationDatePolicyPersonal !== null){
                        if(dataPicker.vehicleTypeId===2  && dataPicker.expirationDatePolicyPersonal.length>0){
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


  const cerrarModalAprobado = (e) => {
    e.preventDefault();
    setModalAprobadoExito(false);
    window.location.href="/pendingUserAdmin"
  };


          

useEffect(() => {
     habilitarBoton(dataPicker);
}, [habilitarBoton,dataPicker])
           


           
 

const cerrarAprobarPicker = async (e) => {
    setloader(true);
    e.preventDefault();
    
    setmodalOpenAprobar(false)
   
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
        .then(rs=>{
            
            setModalAprobadoExito(true)})
        .catch(e=>{})
        .finally(setloader(false))

       // window.location.href="/pendingUserAdmin";

}


const cerrarAprobarPickerCorrigiendo  =  (e) => {
    e.preventDefault();
    setmodalOpenAprobar(false);
} 
          

const corregirDocumentos= async (e) =>{

        setloader(true);
        e.preventDefault();
       
        Informacion.vehicle.motorcycle.expirationDateDriverLicense = Informacion.vehicle.motorcycle.expirationDateDriverLicense ? moment(Informacion.vehicle.motorcycle.expirationDateDriverLicense,"DD/MM/YYYY").format("YYYY-MM-DD"):Informacion.vehicle.motorcycle.expirationDateDriverLicense;
        Informacion.vehicle.motorcycle.expirationDateIdentificationVehicle = Informacion.vehicle.motorcycle.expirationDateIdentificationVehicle ? moment(Informacion.vehicle.motorcycle.expirationDateIdentificationVehicle,"DD/MM/YYYY").format("YYYY-MM-DD"):Informacion.vehicle.motorcycle.expirationDateIdentificationVehicle;
        Informacion.expirationDatePolicyPersonal = Informacion.expirationDatePolicyPersonal ? moment(Informacion.expirationDatePolicyPersonal,"DD/MM/YYYY").format("YYYY-MM-DD"):Informacion.expirationDatePolicyPersonal;
        Informacion.vehicle.motorcycle.expirationDatePolicyVehicle = Informacion.vehicle.motorcycle.expirationDatePolicyVehicle ? moment(Informacion.vehicle.motorcycle.expirationDatePolicyVehicle,"DD/MM/YYYY").format("YYYY-MM-DD"):Informacion.vehicle.motorcycle.expirationDatePolicyVehicle;
       
        Informacion.accountingData.fiscalNumber = Informacion.accountingData.fiscalNumber.replace(/ - /,'').replace(/ - /,'');
        console.log(Informacion);
       
        await api.post(`/ms-admin-rest/api/v1.0/pickers/${Informacion.id}/invalid-documentation`,{    
         "vehicleType": Informacion.vehicleType,
         "accountingData": Informacion.accountingData,
         "vehicle": Informacion.vehicle,
         "name": Informacion.name  ,
         "surname": Informacion.surname ,
         "dateOfBirth":Informacion.dateOfBirth?moment(Informacion.dateOfBirth,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.dateOfBirth,
         "phone": Informacion.phone,
         "identificationNumber":(Informacion.identificationNumber),
         "pickerStatusId":3,
         "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal
        })
      .then(rs=>{window.location.href="/pendingUserAdmin";})
        .catch(e=>{})
        .finally(
            setloader(false)
        )

        
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
                     className="mainContainerFlex-picker">
                         <div className="picker-id">
                              #{pendingUserAdminPicker.id}
                         <h2 className="subTitle-pending-picker">{pendingUserAdminPicker.name+" "+pendingUserAdminPicker.surname}</h2>
                    </div>
                         {
                             pendingUserAdminPicker.vehicleType==="motorcycle" ? 
                             <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                            :
                            <img  className="vehiculo-pending-picker" src={bici} alt="vehiculo" />
                         
                         }
                        <button 
                            onClick={()=>{getPendingUserPickerExport({email:(pendingUserAdminPicker.email)})}}
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
                        clave={1}
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
                        Informacion={pendingUserAdminPicker}
                        setInformacion={setInformacion}
                        />
                </div>
                
                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                <div  className="form-part-1-admin-pickers">
                        <Part
                        inputsPart={inputsPart2}                 
                        ComponentesPart={ComponentesPart2}
                        clave={2}
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
                        Informacion={pendingUserAdminPicker}
                        setInformacion={setInformacion}
                        />                          
                </div>

                    <h3 className="subTitle-pending-data">Seguros</h3>

                 <div  className="form-part-1-admin-pickers">  
                        <Part
                      
                        inputsPart={inputsPart3}                   
                        ComponentesPart={ComponentesPart3}
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}                  
                        clave={3}
                        Informacion={pendingUserAdminPicker}
                        setInformacion={setInformacion}
                        />  

                        <Part
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        disabledButtonAprobarPicker={disabledButtonAprobarPicker}   
                        setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}  
                        clave={4}
                        Informacion={pendingUserAdminPicker}
                        setInformacion={setInformacion}
                        /> 
                 </div>
                     
                 <div className="pending-admin-picker-container-checkbox">
                      <div>
                          
                          <input className="pending-admin-picker-input-checkbox" type="checkbox" id="enviar" value="enviado" />
                          <label className="pending-admin-picker-div-label" htmlFor="enviar">Envié la carta oferta</label>
                      </div>
                      <div>
                          <input className="pending-admin-picker-input-checkbox" type="checkbox" id="firmar" value="firmado"/>
                          <label  className="pending-admin-picker-div-label" htmlFor="firmar">Firmó la carta oferta</label>
                      </div>
                </div>
                    
                    <div className="pending-admin-picker-button">
                    {
                            disabledButtonAprobarPicker===true ? <>
                             
                             <button onClick={corregirDocumentos} className="corregir-admin-picker">Guardar cambios</button>
                            <button disabled={true} onClick={aprobarPicker} className="aprobar-admin-picker">Aprobar picker</button></>
                            :
                            <>
                            <button onClick={corregirDocumentos} className="corregir-admin-picker">Guardar cambios</button>
                            <button disabled={false} onClick={aprobarPicker} className="aprobar-admin-picker-active">Aprobar picker</button>
                           </>
                        }
                       
                    </div>
                    

                </form>  

                
    {   modalOpenAprobar === true ? 
                    <div className="contendor-modal-pending-pickers-aprobar">
                            <Modal

                                    width="750px"
                                    height="304px"
                                    isOpen={modalOpenAprobar}
                                   
                                    >
                                    <div className="container-modal">
                                        <div className="modal-error-title2">
                                            <p className="p-modal-error-title">Aprobar picker</p>
                                        </div>
                                        <div className="modal-error-subtitle-buttons">
                                            <p className="p-modal-error-subtitle-buttons">Al aprobar la solicitud, va a pasar a la pestaña de pickers</p>
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
        {modalExportPicker && (
          <div className="contendor-modal-pending-pickers-aprobar">
            <Modal width="750px" height="351px" isOpen={modalExportPicker}>
              <div className="container-modal">
                <div className="modal-success-title">
                  <p className="p-modal-error-title">Exportaste exitosamente</p>
                </div>
                <div className="modal-error-subtitle">
                  <p className="p-modal-error-subtitle">
                    El archivo se descargo correctamente
                  </p>
                  <div className="button-pending-picker-modal">
                    <button
                      onClick={getPendingUserPickerExportCloseModal}
                      className="button-modal-aprobar-exito"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) }     
            {ModalAprobadoExito === true ? (
          <div className="contendor-modal-pending-pickers-aprobar">
            <Modal width="750px" height="351px" isOpen={ModalAprobadoExito}>
              <div className="container-modal">
                <div className="modal-success-title">
                  <p className="p-modal-error-title">Aprobación exitosa</p>
                </div>
                <div className="modal-error-subtitle">
                  <p className="p-modal-pending-subtitle">
                  Aprobaste al picker {pendingUserAdminPicker.name} {pendingUserAdminPicker.surname}. Ya podés visualizar sus datos en la pestaña “Pickers”
                  </p>
                  <div className="button-pending-picker-modal">
                    <button
                      onClick={cerrarModalAprobado}
                      className="button-modal-aprobar-exito"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : null}           
                    
                </div>
                
                
            </div>
            {
              isFetching  && <div className="modalLoading"></div>
          }
            
        </div>
    )
}
