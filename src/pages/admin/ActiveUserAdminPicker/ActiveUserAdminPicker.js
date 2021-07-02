import React, { useEffect, useState, useCallback } from 'react'
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
import {Modal} from 'pickit-components'

export const ActiveUserAdminPicker = () => {

    const [disableButtons, setdisableButtons] = useState(false);
    const [Redirect, setRedirect] = useState('/activeUserAdmin')
    const [modalGuardarCambios, setmodalGuardarCambios] = useState(false)
    const [activeModalPicker, setactiveModalPicker] = useState(false)

    const handleCancel  = (e) => {
        e.preventDefault()
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
    }

    const cerrarGuardarExito =  (e) => {
        e.preventDefault();
        setactiveModalPicker(false);
        window.location.reload();
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
        //       if(dataPicker.vehicleTypeId===2 && dataPicker.expirationDatePolicyPersonal.length>0){
        //         setdisableButtons(false)
        //        }
        //        else if(dataPicker.expirationDatePolicyPersonal.length>0 && dataPicker.expirationDatePolicyVehicle.length>0 &&dataPicker.expirationDateDriverLicense.length > 0  && dataPicker.expirationDateIdentificationCar.length > 0 )
        //        {
        //         setdisableButtons(false)
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

      useEffect(() => {
        habilitarBoton(dataPicker);
      }, [habilitarBoton,dataPicker])

      useEffect(() => {
              
        setInformacion(dataPicker);
      }, [dataPicker])
       

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
                "name":Informacion.name ,
                "surname":Informacion.surname ,
                "dateOfBirth":Informacion.dateOfBirth ,
                "phoneNumber":Informacion.phoneNumber ,
                "identificationNumber":Informacion.identificationNumber ,
                "fiscalNumber":Informacion.fiscalNumber,
                "bankName":Informacion.bankName,
                "bankIdentifier":Informacion.bankIdentifier,
                "expirationDateDriverLicense": Informacion.expirationDateDriverLicense,
                "expirationDateIdentificationCar":Informacion.expirationDateIdentificationCar,
                "expirationDatePolicyVehicle":Informacion.expirationDatePolicyVehicle,
                "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal        
                
                }).then(()=>{ setactiveModalPicker(true);}
                   
                )
                .catch(()=>{})


                
    }


 


    return (
        <div className="background-Grey">
        <Header/>
        <div className="mainContainerFlex">
            <Nav
                setmodalGuardarCambios={setmodalGuardarCambios}
                setRedirect={setRedirect}
            />
            <div className="pending-container">
                 <PendingBlack
                    setmodalGuardarCambios={setmodalGuardarCambios}
                    setRedirect={setRedirect}
                 />
                   
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
                      
                        inputsPart={inputsPart1}                      
                        ComponentesPart={ComponentesPart1}
                        data={dataPicker}
                        clave={1}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisabledButtonAprobarPicker={setdisableButtons}
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
                        setdisabledButtonAprobarPicker={setdisableButtons}
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
                        setdisabledButtonAprobarPicker={setdisableButtons}
                        active={true}
                        />  

                        <Part
                         
                        inputsPart={inputsPart4}                       
                        ComponentesPart={ComponentesPart4}
                        data={dataPicker}
                        clave={4}
                        Informacion={Informacion}
                        setInformacion={setInformacion}
                        setdisabledButtonAprobarPicker={setdisableButtons}
                        active={true}
                        /> 
                 </div>
                    
                    <div className="pending-admin-picker-button">
                        {disableButtons?<>
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
                                                            className="button-modal-aprobar">
                                                                    Entendido
                                                        </button>
                                                </div>
                                        </div>
                                    </div>
                                </Modal>
                        </div>
              : null
        }    
         {   modalGuardarCambios === true ? 
                    <div className="contendor-modal-pending-pickers-aprobar">
                            <Modal

                                    width="750px"
                                    height="351px"
                                    isOpen={modalGuardarCambios}
                                   
                                    >
                                    <div className="container-modal">
                                        <div className="modal-error-title">
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
        
            </div>
            
            
        </div>
        
    </div>
    )
}
