import React, {useEffect} from 'react'
import {Header} from 'component/admin/Header/Header'
import {Nav} from 'component/admin/Nav/Nav'
import 'pages/admin/PendingUser/Pickers.scss'
import 'pages/admin/pendingUserAdminPicker/pendingUserAdminPicker.scss'
import {PendingBlue} from 'component/admin/Sub-Title-Image/PendingBlue'
import exportar from 'assets/admin/PendingUser/exportar.svg'
import or from 'assets/admin/PendingUser/or.svg'
import motorcycle from 'assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from 'assets/admin/PendingUserAdminPicker/bici.svg'
import {Field, Form} from "react-final-form";

import { Part } from 'component/admin/pendingUserAdminPicker/Part'
import {data} from './data'
import api  from 'config/api'
import { Modal } from '@pickit/pickit-components'
import moment from 'moment'
import {useParams} from "react-router-dom";
import button from "../../../assets/admin/ActiveUserAdminPicker/button.svg";
import disabledButton from "../../../assets/admin/ActiveUserAdminPicker/disabledButton.svg";




export const PendingUserAdminPicker = (
    {
        isFetching,
        pendingUserAdminPicker,
        getPendingUserPickerExport,
        modalExportPicker,
        getPendingUserPickerExportCloseModal,
        onSubmit,


        // getPendingUserPicker
    }) => {

    // const params = useParams();
    // useEffect(() => {
    // debugger
    // getPendingUserPicker(params.id);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // console.log(pendingUserAdminPicker)

    // const [loader, setloader] = useState(true);


    // const [ModalAprobadoExito, setModalAprobadoExito] = useState(false);
    // const [modalOpenAprobar, setmodalOpenAprobar] = useState(false);
    // const [disabledButtonAprobarPicker, setdisabledButtonAprobarPicker] = useState(true);
    //
    //
    //
    // const [Informacion, setInformacion] = useState(pendingUserAdminPicker)



    // const [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4]=data();


    /*
    const habilitarBoton   =   useCallback(
                      (pendingUserAdminPicker) => {
                        if(pendingUserAdminPicker!==null){

                          if(pendingUserAdminPicker.vehicleTypeId!==" " && pendingUserAdminPicker.expirationDatePolicyPersonal !== null){
                            if(pendingUserAdminPicker.vehicleTypeId===2  && pendingUserAdminPicker?.expirationDatePolicyPersonal.length>0){
                                setdisabledButtonAprobarPicker(false)
                            }
                             else if( pendingUserAdminPicker && pendingUserAdminPicker?.expirationDatePolicyPersonal.length>0 && pendingUserAdminPicker?.expirationDatePolicyVehicle.length>0 &&pendingUserAdminPicker?.expirationDateDriverLicense.length > 0  && pendingUserAdminPicker?.expirationDateIdentificationCar.length > 0 )
                             {
                              setdisabledButtonAprobarPicker(false)
                             }
                         }}

                        },

                    [],);

    */
    /*
    useEffect(() => {
         habilitarBoton(pendingUserAdminPicker);
    }, [habilitarBoton,pendingUserAdminPicker])
    */

    // const cerrarModalAprobado = (e) => {
    //     e.preventDefault();
    //     setModalAprobadoExito(false);
    //     window.location.href="/pendingUserAdmin"
    // };









    // const cerrarAprobarPicker = async (e) => {
    //     setloader(true);
    //     e.preventDefault();
    //
    //     setmodalOpenAprobar(false)
    //
    //     await api.post(`/ms-admin-rest/api/v1.0/pickers/${pendingUserAdminPicker.id}`,{
    //         "enable": true,
    //         "vehicleTypeId": pendingUserAdminPicker.vehicleTypeId,
    //         "name":Informacion.name ,
    //         "surname":Informacion.surname ,
    //         "dateOfBirth":Informacion.dateOfBirth?moment(Informacion.dateOfBirth,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.dateOfBirth,
    //         "phoneNumber":Informacion.phoneNumber ,
    //         "identificationNumber":Informacion.identificationNumber ,
    //         "fiscalNumber":Informacion.fiscalNumber.slice(0,-15)+Informacion.fiscalNumber.slice(5,-4)+Informacion.fiscalNumber.slice(16),
    //         "bankName":Informacion.bankName,
    //         "bankIdentifier":Informacion.bankIdentifier,
    //         "expirationDateDriverLicense":Informacion.expirationDateDriverLicense?moment(Informacion.expirationDateDriverLicense,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateDriverLicense,
    //         "expirationDateIdentificationCar":Informacion.expirationDateIdentificationCar?moment(Informacion.expirationDateIdentificationCar,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDateIdentificationCar,
    //         "expirationDatePolicyVehicle":Informacion.expirationDatePolicyVehicle?moment(Informacion.expirationDatePolicyVehicle,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyVehicle,
    //         "expirationDatePolicyPersonal":Informacion.expirationDatePolicyPersonal?moment(Informacion.expirationDatePolicyPersonal,"DD/MM/YYYY").format('YYYY-MM-DD'):Informacion.expirationDatePolicyPersonal,
    //     })
    //         .then(rs=>{
    //
    //             setModalAprobadoExito(true)})
    //         .catch(e=>{})
    //         .finally(setloader(false))
    //
    //     // window.location.href="/pendingUserAdmin";
    //
    // }


    // const cerrarAprobarPickerCorrigiendo  =  (e) => {
    //     e.preventDefault();
    //     setmodalOpenAprobar(false);
    // }

    /*
    const corregirDocumentos= async (e) =>{

            setloader(true);
            e.preventDefault();
            console.log(Informacion)

            await api.post(`/ms-admin-rest/api/v1.0/pickers/${Informacion.id}/invalid-documentation`,{
             "vehicleType": Informacion.vehicleType,
             "accountingData": Informacion.accountingData,
             "vehicle": Informacion.vehicle,
             "name": Informacion.name  ,
             "surname": Informacion.surname ,
             "dateOfBirth":Informacion.dateOfBirth,
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
    */

    //
    // const aprobarPicker= async (e) =>{
    //     e.preventDefault();
    //     setmodalOpenAprobar(true);
    // }


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
                            { pendingUserAdminPicker.id && (pendingUserAdminPicker.status.id=== 4 || pendingUserAdminPicker.status.id=== 5) && `#${pendingUserAdminPicker.id}`}
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










                    <Form
                        onSubmit={onSubmit}
                        initialValues={pendingUserAdminPicker
                            // {
                            //     ...pendingUserAdminPicker,
                            //     dateOfBirth: moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY"),
                            //     expirationDatePolicyPersonal: moment(pendingUserAdminPicker.expirationDatePolicyPersonal, "YYYY-MM-DD").format("DD/MM/YYYY"),
                            //     vehicle: {
                            //         ...pendingUserAdminPicker.vehicle,
                            //         [pendingUserAdminPicker.vehicleType]: {
                            //             ...pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType],
                            //             expirationDateIdentificationVehicle: moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle, "YYYY-MM-DD").format("DD/MM/YYYY"),
                            //             expirationDateDriverLicense: moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense, "YYYY-MM-DD").format("DD/MM/YYYY"),
                            //             expirationDatePolicyVehicle: moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle, "YYYY-MM-DD").format("DD/MM/YYYY")
                            //         }
                            //     }
                            //     // {initialValues.vehicleType}.expirationDateIdentificationVehicle
                            //     // dateOfBirth: moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY")
                            //     // dateOfBirth: moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY")
                            //     // dateOfBirth: moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY")
                            // }
                        }>
                        {({ handleSubmit, initialValues }) => (
                            <form className="Admin-Pickers-inputs" onSubmit={handleSubmit}>
                                <div  className="form-part-1-admin-pickers">
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Nombre/s *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="name"
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá el nombre"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Apellido/s *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="surname"
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá el apellido"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            DNI
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="identificationNumber"
                                                disabled
                                                component="input"
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el DNI"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            E-mail
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="email"
                                                component="input"
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el Email"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            Fecha de nacimiento
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="dateOfBirth"
                                                component="input"
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá la fecha nac"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers-middle">
                                            Código de área *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="phone.areaNumber"
                                                component="input"
                                                className="Admin-Pickers-input-middle"
                                                placeholder="Ingresá el Código de área *"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers-middle">
                                            Teléfono *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="phone.number"
                                                component="input"
                                                className="Admin-Pickers-input-middle"
                                                placeholder="Ingresá el teléfono"
                                            />
                                        </div>
                                    </div>

                                    {/*<Part*/}
                                    {/*    inputsPart={inputsPart1}*/}
                                    {/*    ComponentesPart={ComponentesPart1}*/}
                                    {/*    clave={1}*/}
                                    {/*    setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}*/}
                                    {/*    disabledButtonAprobarPicker={disabledButtonAprobarPicker}*/}
                                    {/*    Informacion={pendingUserAdminPicker}*/}
                                    {/*    setInformacion={setInformacion}*/}
                                    {/*/>*/}
                                </div>

                                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>

                                <div  className="form-part-1-admin-pickers">
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            Número de CUIT/CUIL
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="accountingData.fiscalNumber"
                                                component="input"
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="20 - 39589475 - 4"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            Número de CBU
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="accountingData.bankIdentifier"
                                                component="input"
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="20 - 39589475 - 4"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers readonly">
                                            Nombre del banco
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="accountingData.bankName"
                                                component="input"
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el Nombre"
                                            />
                                        </div>
                                    </div>
                                    {/*<Part*/}
                                    {/*    inputsPart={inputsPart2}*/}
                                    {/*    ComponentesPart={ComponentesPart2}*/}
                                    {/*    clave={2}*/}
                                    {/*    setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}*/}
                                    {/*    disabledButtonAprobarPicker={disabledButtonAprobarPicker}*/}
                                    {/*    Informacion={pendingUserAdminPicker}*/}
                                    {/*    setInformacion={setInformacion}*/}
                                    {/*/>*/}
                                </div>

                                <h3 className="subTitle-pending-data">Seguros</h3>

                                <div  className="form-part-1-admin-pickers">
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Patente del vehículo *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name={`vehicle.${initialValues.vehicleType}.patent`}
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá los dígitos de la patente"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Vencimiento de la licencia *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name={`vehicle.${initialValues.vehicleType}.expirationDateDriverLicense`}
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="día / mes / año"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Vencimiento de la cédula *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name={`vehicle.${initialValues.vehicleType}.expirationDatePolicyVehicle`}
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="día / mes / año"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Vencimiento del seguro de automotor *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name={`vehicle.${initialValues.vehicleType}.expirationDateIdentificationVehicle`}
                                                // value={console.log(initialValues.vehicle[initialValues.vehicleType].expirationDateIdentificationVehicle)}
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="día / mes / año"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-Admin-Pickers">
                                            Vencimiento del seguro de accidentes personales *
                                        </label>
                                        <div>
                                            <Field
                                                type="text"
                                                name="expirationDatePolicyPersonal"
                                                component="input"
                                                className="Admin-Pickers-input"
                                                placeholder="día / mes / año"
                                            />
                                        </div>
                                    </div>
                                    {/*<Part*/}

                                    {/*    inputsPart={inputsPart3}*/}
                                    {/*    ComponentesPart={ComponentesPart3}*/}
                                    {/*    setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}*/}
                                    {/*    disabledButtonAprobarPicker={disabledButtonAprobarPicker}*/}
                                    {/*    clave={3}*/}
                                    {/*    Informacion={pendingUserAdminPicker}*/}
                                    {/*    setInformacion={setInformacion}*/}
                                    {/*/>*/}

                                    {/*<Part*/}
                                    {/*    inputsPart={inputsPart4}*/}
                                    {/*    ComponentesPart={ComponentesPart4}*/}
                                    {/*    disabledButtonAprobarPicker={disabledButtonAprobarPicker}*/}
                                    {/*    setdisabledButtonAprobarPicker={setdisabledButtonAprobarPicker}*/}
                                    {/*    clave={4}*/}
                                    {/*    Informacion={pendingUserAdminPicker}*/}
                                    {/*    setInformacion={setInformacion}*/}
                                    {/*/>*/}
                                </div>
                                {pendingUserAdminPicker.enable ?
                                    <>
                                        <h3 className="subTitle-pending-data">Estado</h3>
                                        <div className="active-admin-picker-estado-container">
                                            <p className={pendingUserAdminPicker.enable?"admin-active-picker":"admin-buttonDisabled-picker-disabled"}>Deshabilitado</p>
                                            <img
                                                // onClick={onCLickImg}
                                                className="button-active-picker" src={pendingUserAdminPicker.enable?button:disabledButton}/>
                                            <p className={pendingUserAdminPicker.enable?"admin-active-picker-p":"admin-buttonDisabled-picker-enabled"}>Habilitado</p>
                                        </div >
                                    </>
                                    :
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
                                }

                                <div className="pending-admin-picker-button">
                                    {/*{*/}
                                    {/*    disabledButtonAprobarPicker===true ? <>*/}

                                    <button type="submit" className="corregir-admin-picker">Guardar cambios</button>

                                    {/*            <button disabled={true} onClick={aprobarPicker} className="aprobar-admin-picker">Aprobar picker</button></>*/}
                                    {/*        :*/}
                                    {/*        <>*/}

                                    {/*            <button onClick={()=>{ postPendingUserDocumentsEdit(pendingUserAdminPicker)} } className="corregir-admin-picker">Guardar cambios</button>*/}
                                    {/*            <button disabled={false} onClick={aprobarPicker} className="aprobar-admin-picker-active">Aprobar picker</button>*/}
                                    {/*        </>*/}
                                    {/*}*/}

                                </div>


                            </form>
                        )}
                    </Form>


                    {/*{   modalOpenAprobar === true ?*/}
                    {/*    <div className="contendor-modal-pending-pickers-aprobar">*/}
                    {/*        <Modal*/}

                    {/*            width="750px"*/}
                    {/*            height="304px"*/}
                    {/*            isOpen={modalOpenAprobar}*/}

                    {/*        >*/}
                    {/*            <div className="container-modal">*/}
                    {/*                <div className="modal-error-title2">*/}
                    {/*                    <p className="p-modal-error-title">Aprobar picker</p>*/}
                    {/*                </div>*/}
                    {/*                <div className="modal-error-subtitle-buttons">*/}
                    {/*                    <p className="p-modal-error-subtitle-buttons">Al aprobar la solicitud, va a pasar a la pestaña de pickers</p>*/}
                    {/*                    <div className="button-pending-picker-modal">*/}
                    {/*                        <button*/}
                    {/*                            onClick={cerrarAprobarPickerCorrigiendo}*/}
                    {/*                            className="button-modal-revisar">*/}
                    {/*                            Revisar datos*/}
                    {/*                        </button>*/}
                    {/*                        <button*/}
                    {/*                            onClick={cerrarAprobarPicker}*/}
                    {/*                            className="button-modal-aprobar">*/}
                    {/*                            Aprobar*/}
                    {/*                        </button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </Modal>*/}
                    {/*    </div>*/}
                    {/*    : null*/}
                    {/*}*/}
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
                    {/*{ModalAprobadoExito === true ? (*/}
                    {/*    <div className="contendor-modal-pending-pickers-aprobar">*/}
                    {/*        <Modal width="750px" height="351px" isOpen={ModalAprobadoExito}>*/}
                    {/*            <div className="container-modal">*/}
                    {/*                <div className="modal-success-title">*/}
                    {/*                    <p className="p-modal-error-title">Aprobación exitosa</p>*/}
                    {/*                </div>*/}
                    {/*                <div className="modal-error-subtitle">*/}
                    {/*                    <p className="p-modal-pending-subtitle">*/}
                    {/*                        Aprobaste al picker {pendingUserAdminPicker.name} {pendingUserAdminPicker.surname}. Ya podés visualizar sus datos en la pestaña “Pickers”*/}
                    {/*                    </p>*/}
                    {/*                    <div className="button-pending-picker-modal">*/}
                    {/*                        <button*/}
                    {/*                            onClick={cerrarModalAprobado}*/}
                    {/*                            className="button-modal-aprobar-exito"*/}
                    {/*                        >*/}
                    {/*                            Entendido*/}
                    {/*                        </button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </Modal>*/}
                    {/*    </div>*/}
                    {/*) : null}*/}

                </div>


            </div>
            {
                isFetching  && <div className="modalLoading"></div>
            }

        </div>
    )
}
