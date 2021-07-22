import React, { useEffect, useState, useCallback } from 'react'
import {Header} from '../../../component/admin/Header/Header'
import {Nav} from '../../../component/admin/Nav/Nav'
import '../PendingUser/PendingUserAdmin.scss'
import './activeUserAdminPicker.scss'
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
import {Modal} from 'pickit-components'
import moment from 'moment'

export const ActiveUserAdminPicker = () => {
    const [loader, setloader] = useState(true);
    const [ExportModalActivePicker, setExportModalActivePicker] = useState(false);

    const [disableButtons, setdisableButtons] = useState(false);
    const [Redirect, setRedirect] = useState('/activeUserAdmin')
    const [modalGuardarCambios, setmodalGuardarCambios] = useState(false)
    const [activeModalPicker, setactiveModalPicker] = useState(false)

 

    const handleCancel  = (e) => {
            e.preventDefault();
            setmodalGuardarCambios(true);
            setRedirect(window.location.href)
    }

   

   

    const cerrarModalSinGuardar = (e) => {
        e.preventDefault();
        
    
        window.location.href=Redirect;
    }
    const cerrarModalGuardar =  (e) => {
        e.preventDefault();
        setmodalGuardarCambios(false);
        window.scroll(0, 1000)
    }

    const cerrarGuardarExito =  (e) => {
        e.preventDefault();
        setactiveModalPicker(false);
        window.location.href="/activeUserAdmin"
    }

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

    const habilitarBoton   =   useCallback(
        (dataPicker) => {

        //   if(dataPicker.vehicleTypeId!==" " && dataPicker.expirationDatePolicyPersonal !== null){
       //        if(dataPicker.vehicleTypeId===2 && dataPicker.expirationDatePolicyPersonal.length>0){
        //         setdisableButtons(false)
         //      }
          //     else if(dataPicker.expirationDatePolicyPersonal.length>0 && dataPicker.expirationDatePolicyVehicle.length>0 &&dataPicker.expirationDateDriverLicense.length > 0  && dataPicker.expirationDateIdentificationCar.length > 0 )
         //      {
         //        setdisableButtons(false)
        //        }
        //    }
          },
        
      [],
  )
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
    vehicleTypeId: "",
    nya: ""
    })



useEffect(()=>{
        if(!window.localStorage.getItem('token')){
            window.location.href = '/'
        }
       // const mailCodificado = codificarEmailURIFunction(dataPicker.email);
        const cargarDatos = async () =>{setDataPicker(
            await api.get(`/ms-admin-rest/api/v1.0/pickers/${id}`)
            .then((res)=>{
                    //res.data.result.fiscalNumber=res.data.result.fiscalNumber.slice(0,-9)+" - "+res.data.result.fiscalNumber.slice(2,-1)+" - "+res.data.result.fiscalNumber.slice(10)
                    res.data.result.dateOfBirth=res.data.result.dateOfBirth?moment(res.data.result.dateOfBirth).format('DD/MM/YYYY'):res.data.result.dateOfBirth
                    res.data.result.expirationDateDriverLicense=res.data.result.expirationDateDriverLicense?moment(res.data.result.expirationDateDriverLicense).format('DD/MM/YYYY'):res.data.result.expirationDateDriverLicense
                    res.data.result.expirationDateIdentificationCar=res.data.result.expirationDateIdentificationCar?moment(res.data.result.expirationDateIdentificationCar).format('DD/MM/YYYY'):res.data.result.expirationDateIdentificationCar
                    res.data.result.expirationDatePolicyPersonal=res.data.result.expirationDatePolicyPersonal?moment(res.data.result.expirationDatePolicyPersonal).format('DD/MM/YYYY'):res.data.result.expirationDatePolicyPersonal
                    res.data.result.expirationDatePolicyVehicle=res.data.result.expirationDatePolicyVehicle?moment(res.data.result.expirationDatePolicyVehicle).format('DD/MM/YYYY'):res.data.result.expirationDatePolicyVehicle
                    res.data.result.enable=res.data.result.pickerStatusId===4?true:false
                    res.data.result.nya= (res.data.result.name.concat(res.data.result.surname)).length>18?((res.data.result.name.concat(" ").concat(res.data.result.surname)).slice(0,18)).concat("..."):(res.data.result.name.concat(" ").concat(res.data.result.surname))
                    console.log(res.data.result.nya)
                    return res.data.result})
            .catch((err)=>{console.log(err)
            
            })
            .finally(
                
                    setloader(false)
                
               
            )
            )
            
        }
            
       cargarDatos();
    
},[id])

useEffect(() => {
        habilitarBoton(dataPicker);
}, [habilitarBoton,dataPicker])

useEffect(() => {
              
        setInformacion(dataPicker);
}, [dataPicker])
       

    const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();
   
const Export = async () => {        
    setExportModalActivePicker(true);      
        const mailCodificado = codificarEmailURIFunction(dataPicker.email);
        const datosExport =await api.get(`/ms-admin-rest/api/v1.0/pickers.csv?&email=${mailCodificado}`)
        .then( (res) => {return res})
        .catch((err) => {console.log(err)})
   
        createCSV(datosExport);   
}

const onCLickImg = () =>{

        setimgEnabled(!imgEnabled);
        setdisableButtons(true)
        setDataPicker(
            dataPicker,
            dataPicker.enable=!dataPicker.enable
        )
}
   
const modificarPicker= async (e) =>{
        setloader(true);
        e.preventDefault();
        console.log(dataPicker)
               await api.post(`/ms-admin-rest/api/v1.0/pickers/${dataPicker.id}`,{  
                "enable": dataPicker.enable,  
                "vehicleTypeId": dataPicker.vehicleTypeId,
                "name":Informacion.name ,
                "surname":Informacion.surname ,
                "dateOfBirth":Informacion.dateOfBirth?moment(Informacion.dateOfBirth,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.dateOfBirth,
                "phoneNumber":Informacion.phoneNumber ,
                "identificationNumber":Informacion.identificationNumber ,
                "fiscalNumber":Informacion.fiscalNumber,
                "bankName":Informacion.bankName,
                "bankIdentifier":Informacion.bankIdentifier,
                "expirationDateDriverLicense":Informacion.expirationDateDriverLicense?moment(Informacion.expirationDateDriverLicense,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateDriverLicense,
                "expirationDateIdentificationCar":Informacion.expirationDateIdentificationCar?moment(Informacion.expirationDateIdentificationCar,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateIdentificationCar,
                "expirationDatePolicyVehicle":Informacion.expirationDatePolicyVehicle?moment(Informacion.expirationDatePolicyVehicle,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyVehicle,
                "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal?moment(Informacion.expirationDatePolicyPersonal,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyPersonal,   
                
                }).then(()=>{ setactiveModalPicker(true);}
                   
                )
                .catch(()=>{}
                
                )
                .finally(
                    setloader(false)
                )
}
const cerrarGuardarExitoPicker = (e) => {
    e.preventDefault();
    setExportModalActivePicker(false);
  };


 


    return (
        <div className="background-Grey">
        <Header/>
        <div className="mainContainerFlex">
            <Nav
                setmodalGuardarCambios={setmodalGuardarCambios}
                setRedirect={setRedirect}
                dataPicker={dataPicker}
                Informacion={Informacion}
            />
            <div className="pending-container">
                 <PendingBlack
                    setmodalGuardarCambios={setmodalGuardarCambios}
                    setRedirect={setRedirect}
                    dataPicker={dataPicker}
                    Informacion={Informacion}
                 />
                   
                 <div 
                 className="mainContainerFlex">
                    <h2 className="picker-id">
                       #{dataPicker.id}
                     <h2 className="subTitle-pending-picker">{dataPicker.nya}</h2>
                    </h2>
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
                      
                        inputsPart={inputsPart1}                      
                        ComponentesPart={ComponentesPart1}
                        data={dataPicker}
                        clave={1}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisableButtons={setdisableButtons}
                        active={true}
                        />
                </div>
                
                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                <div  className="form-part-1-admin-pickers">
                        <Part
                       
                        inputsPart={inputsPart2}                 
                        ComponentesPart={ComponentesPart2}
                        data={dataPicker}
                        clave={2}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisableButtons={setdisableButtons}
                        active={true}
                        />                          
                </div>

                    <h3 className="subTitle-pending-data">Seguros</h3>

                 <div  className="form-part-1-admin-pickers">  
                        <Part
                        
                        inputsPart={inputsPart3}                   
                        ComponentesPart={ComponentesPart3}
                        data={dataPicker}
                        clave={3}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisableButtons={setdisableButtons}
                        active={true}
                        />  

                        <Part
                         
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        data={dataPicker}
                        clave={4}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisableButtons={setdisableButtons}
                        active={true}
                        /> 
                 </div>
                    
                    <div className="pending-admin-picker-button">
                        {disableButtons ===true ?<>
                            <button onClick={handleCancel} className="corregir-admin-picker-active">Cancelar</button>
                        <button onClick={modificarPicker} className="aprobar-admin-picker-active">Guardar</button></>:<>
                            <button disabled={true} className="corregir-admin-picker-disable">Cancelar</button>
                        <button disabled={true} className="aprobar-admin-picker-disable">Guardar</button></>}
                    </div>
                    
                </form>  
                {   activeModalPicker === true ? 
                    <div className="contendor-modal-pending-pickers-aprobar">
                            <Modal
                            

                                    width="750px"
                                    height="351px"
                                    isOpen={activeModalPicker}
                                   
                                    >
                                    <div className="container-modal">
                                        <div className="modal-success-title">
                                            <p className="p-modal-error-title">Datos guardados</p>
                                        </div>
                                        <div className="modal-error-subtitle">
                                            <p className="p-modal-error-subtitle">Ya quedaron registrados los cambios en el perfil del picker</p>
                                                <div className="button-pending-picker-modal">
                                                        
                                                        <button 
                                                            onClick={cerrarGuardarExito}
                                                            className="button-modal-aprobar-exito">
                                                                    Entendido
                                                        </button>
                                                </div>
                                        </div>
                                    </div>
                                </Modal>
                        </div>
              : null
        }    
         {   modalGuardarCambios === true    ? 
                    <div className="contendor-modal-pending-pickers-aprobar">
                            <Modal

                                    width="750px"
                                    height="351px"
                                    isOpen={modalGuardarCambios}
                                   
                                    >
                                    <div className="container-modal">
                                        <div className="modal-save-title">
                                            <p className="p-modal-error-title">Guardá tus cambios</p>
                                        </div>
                                        <div className="modal-error-subtitle">
                                            <p className="p-modal-error-subtitle">Si te vas sin guardar, tus cambios no van a quedar registrados</p>
                                                <div className="button-pending-picker-modal">
                                                        <button 
                                                            onClick={cerrarModalSinGuardar}
                                                            className="button-modal-revisar">
                                                                    No quiero guardarlos
                                                        </button>
                                                        
                                                        <button 
                                                            onClick={cerrarModalGuardar}
                                                            className="button-modal-sin-guardar">
                                                                    Ir a guardar
                                                        </button>
                                                </div>
                                        </div>
                                    </div>
                                </Modal>
                        </div>
              : null
        }  
         {ExportModalActivePicker === true ? (
          <div className="contendor-modal-pending-pickers-aprobar">
            <Modal width="750px" height="351px" isOpen={ExportModalActivePicker}>
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
                      onClick={cerrarGuardarExitoPicker}
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
              loader ===true  ? 
              <div className="modalLoading">
                
              </div>
              : <></>
          }
        
    </div>
    )
}
