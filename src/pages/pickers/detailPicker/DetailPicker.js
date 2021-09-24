import React from 'react'
import {Header} from 'component/admin/Header/Header'
import Nav from 'component/admin/Nav/Nav'
import 'pages/pickers/Pickers.scss'
import 'pages/pickers/detailPicker/DetailPicker.scss'
import PendingBlue from 'component/admin/Sub-Title-Image/PendingBlue'
import {Input} from "component/inputs/Input"
import {Switch} from "component/inputs/switch"
import motorcycle from 'assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from 'assets/admin/PendingUserAdminPicker/bici.svg'
import {Field, Form} from "react-final-form";
import useValidationSchema from "hooks/useValidationSchema"
import {Col, Container, Row} from "react-bootstrap";
import { FormSpy } from 'react-final-form'
import moment from "moment";
import NotificationModal from "component/modal/NotificationModal";
import  Actions from 'pages/pickers/actions/Actions'

export const DetailPicker = (
    {
        isFetching,
        pendingUserAdminPicker,
        getPendingUserPickerExport,
        actualPage,
        setDirty,
        active,
        cancel,
        aproveSubmit,
        goBack,
        postPendingUserDocumentsEdit,
        postEditPickerRequest,
        changePage,
        validationSchema
    }) => {
    

        
    return (
        <div className="background-Grey">
            <Header/>
            <div className="mainContainerFlex">
                <Nav/>
                <div className="pending-container">
                    <PendingBlue changePage={changePage} actualPage={actualPage} isDetail={true}/>
                    <div>
                </div>
                    <div
                        className="mainContainerFlex-picker">
                        <div className="picker-id">
                            { pendingUserAdminPicker.id && (pendingUserAdminPicker.status.id=== 4 || pendingUserAdminPicker.status.id=== 5) && `#${pendingUserAdminPicker.id}`}
                            <h2 className="subTitle-pending-picker">{(pendingUserAdminPicker.name+" "+pendingUserAdminPicker.surname).length>25? (pendingUserAdminPicker.name+" "+pendingUserAdminPicker.surname).substring(0,22)+"...": (pendingUserAdminPicker.name+" "+pendingUserAdminPicker.surname)}</h2>
                        </div>
                        {
                            pendingUserAdminPicker.vehicleType==="motorcycle" ?
                                <img  className="vehiculo-pending-picker" src={motorcycle} alt="vehiculo" />
                                :
                                <img  className="vehiculo-pending-picker" src={bici} alt="vehiculo" />
                        }
                        <div className="export-container">
                        <Actions getPendingUserPickerExport={getPendingUserPickerExport} pendingUserAdminPicker={pendingUserAdminPicker}/>
                        </div>
                    </div>
                    <Form
                        onSubmit={values => active ? postEditPickerRequest(values, goBack) : aproveSubmit(values,goBack)}
                        initialValues={
                            pendingUserAdminPicker.id ?
                {
                    ...pendingUserAdminPicker,
                    accountingData:{
                        ...pendingUserAdminPicker.accountingData,
                        fiscalNumber: (pendingUserAdminPicker.accountingData.fiscalNumber).includes('-') ? pendingUserAdminPicker.accountingData.fiscalNumber : (pendingUserAdminPicker.accountingData.fiscalNumber).slice(0,2)+" - "+(pendingUserAdminPicker.accountingData.fiscalNumber).slice(2,10)+" - "+(pendingUserAdminPicker.accountingData.fiscalNumber).slice(10,11) 
                    },
                    dateOfBirth: pendingUserAdminPicker.dateOfBirth && !pendingUserAdminPicker.dateOfBirth.includes('/') ?moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY"): pendingUserAdminPicker.dateOfBirth,
                    expirationDatePolicyPersonal: pendingUserAdminPicker.expirationDatePolicyPersonal && !pendingUserAdminPicker.expirationDatePolicyPersonal.includes('/') ? moment(pendingUserAdminPicker.expirationDatePolicyPersonal, "YYYY-MM-DD").format("DD/MM/YYYY"):pendingUserAdminPicker.expirationDatePolicyPersonal ,
                    vehicle: {
                        ...pendingUserAdminPicker.vehicle,
                        [pendingUserAdminPicker.vehicleType]: {
                            ...pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType],
                            expirationDatePolicyVehicle: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle && !pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle.includes('/') ? moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle, "YYYY-MM-DD").format("DD/MM/YYYY") : pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle,
                            expirationDateIdentificationVehicle: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle && !pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle.includes('/') ?moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle, "YYYY-MM-DD").format("DD/MM/YYYY"):pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle,
                            expirationDateDriverLicense: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense && !pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense.includes('/') ? moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense, "YYYY-MM-DD").format("DD/MM/YYYY"):pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense,
                        }
                    }
                } :
                pendingUserAdminPicker
                        }
                        validate={useValidationSchema(validationSchema)}
                    >
                        {({ invalid,handleSubmit, dirty, initialValues, values,form}) =>
                            <form className="Admin-Pickers-inputs" onSubmit={handleSubmit}>
                                <FormSpy
                                    subscription={{ dirty: true }}
                                    onChange={pro => {
                                        if(active){
                                            setDirty(pro.dirty);
                                        }
                                    }}
                                />
                                <Container fluid className="form-part-1-admin-pickers">
                                    <Row>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="name"
                                                label="Nombre/s *"
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá el nombre"
                                                maxLength={49}
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="surname"
                                                label="Apellido/s *"
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá el apellido"
                                                maxLength={49}
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="identificationNumber"
                                                disabled
                                                label="DNI"
                                                component={Input}
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el DNI"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Field
                                                type="text"
                                                name="email"
                                                label="E-mail"
                                                component={Input}
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el Email"
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Field
                                                type="text"
                                                name="dateOfBirth"
                                                label="Fecha de nacimiento"
                                                component={Input}
                                                disabled
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá la fecha nac"
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="phone.areaNumber"
                                                label="Código de área *"
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="Ej: 011"
                                                maxLength={5}
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="phone.number"
                                                label="Teléfono *"
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="Ej: 12345678"
                                                maxLength={8}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                                <h3 className="subTitle-pending-data">Datos contables y bancarios</h3>
                                <Container fluid className="form-part-1-admin-pickers">
                                    <Row>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="accountingData.fiscalNumber"
                                                label= "Número de CUIT"
                                                component={Input}
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="20 - 39589475 - 4"
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="accountingData.bankIdentifier"
                                                label="Número de CBU"
                                                component={Input}
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="20 - 39589475 - 4"
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="accountingData.bankName"
                                                label="Nombre del banco"
                                                component={Input}
                                                disabled
                                                className="Admin-Pickers-input readonly"
                                                placeholder="Ingresá el Nombre"
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                                <h3 className="subTitle-pending-data">Seguros</h3>
                                <Container fluid className="form-part-1-admin-pickers">
                                    <Row>
                                        {
                                            initialValues.vehicleType === "motorcycle" &&
                                            <>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.patent`}
                                                        label="Patente del vehículo *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="Ingresá los dígitos de la patente"
                                                        maxLength={7}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.expirationDateDriverLicense`}
                                                        label="Vencimiento de la licencia *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="día / mes / año"
                                                        maxLength={10}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.expirationDateIdentificationVehicle`}
                                                        label="Vencimiento de la cédula *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="día / mes / año"
                                                        maxLength={10}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.expirationDatePolicyVehicle`}
                                                        label="Vencimiento del seguro de automotor *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="día / mes / año"
                                                        maxLength={10}
                                                    />
                                                </Col>
                                            </>
                                        }
                                        <Col md={4}>
                                            <Field
                                                type="text"
                                                name="expirationDatePolicyPersonal"
                                                label="Vencimiento del seguro de accidentes personales *"
                                                lastLabel
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="día / mes / año"
                                                maxLength={10}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                                {active ?
                                    <>
                                        <Field
                                            name="enable"
                                            component={Switch}
                                        />
                                        <div className="pending-admin-picker-button">
                                            <button type="button" onClick={()=>cancel(dirty,form.restart)} disabled={!dirty} className="button-submit-subtype">Cancelar</button>
                                            <button type="submit" disabled={invalid || !dirty} className="button-submit-active">Guardar</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {/*TODO: hablitar cuando funcionen los checks de enviar carta*/}
                                        {/*:*/}
                                        {/*<div className="pending-admin-picker-container-checkbox">*/}
                                        {/*    <div>*/}
                                        {/*        <input className="pending-admin-picker-input-checkbox" type="checkbox" id="enviar" value="enviado" />*/}
                                        {/*        <label className="pending-admin-picker-div-label" htmlFor="enviar">Envié la carta oferta</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div>*/}
                                        {/*        <input className="pending-admin-picker-input-checkbox" type="checkbox" id="firmar" value="firmado"/>*/}
                                        {/*        <label  className="pending-admin-picker-div-label" htmlFor="firmar">Firmó la carta oferta</label>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="pending-admin-picker-button">
                                            <button type="button" onClick={()=> postPendingUserDocumentsEdit(values)} className="button-submit-subtype">Guardar cambios</button>
                                            <button type="submit" disabled={invalid} className="button-submit-active">Aprobar picker</button>
                                        </div>
                                    </>
                                }
                            </form>
                        }
                    </Form>
                    <NotificationModal/>
                </div>
            </div>
            {
                isFetching  && <div className="modalLoading"></div>
            }
        </div>
    )
};
