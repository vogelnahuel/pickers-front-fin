import React from 'react'
import {Header} from 'component/admin/Header/Header'
import Nav from 'component/admin/Nav/Nav'
import 'pages/pickers/Pickers.scss'
import 'pages/pickers/detailPicker/DetailPicker.scss'
import PendingBlue from 'component/admin/Sub-Title-Image/PendingBlue'
import {Input} from "component/inputs/Input"
import {Switch} from "component/inputs/switch"
import exportar from 'assets/admin/PendingUser/exportar.svg'
import or from 'assets/admin/PendingUser/or.svg'
import motorcycle from 'assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from 'assets/admin/PendingUserAdminPicker/bici.svg'
import {Field, Form} from "react-final-form";
import button from "assets/admin/ActiveUserAdminPicker/button.svg";
import useValidationSchema from "hooks/useValidationSchema"
import {Col, Container, Row} from "react-bootstrap";
import { FormSpy } from 'react-final-form'
import moment from "moment";
import NotificationModal from "component/modal/NotificationModal";
import volver from 'assets/admin/PendingUser/volver.svg';
import { Link } from 'react-router-dom'


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
                    <div className="pendingblue-container">
                    <PendingBlue changePage={changePage} actualPage={actualPage}/>
                    <div>
                    <Link  className="buttonVolver" to="/pickers"  >
                        <img className="img3" src={volver} alt="volver"/>
                        <p className="Pending-paragraph3">Volver</p>
                    </Link>

                </div>
                </div>
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
                            <p className="display-inline-block p-export">Exportar</p>
                        </button>
                    </div>
                    <Form
                        onSubmit={values => active ? postEditPickerRequest(values, goBack) : postPendingUserDocumentsEdit(values)}
                        initialValues={
                            pendingUserAdminPicker.dateOfBirth ?
                                {
                                    ...pendingUserAdminPicker,
                                    dateOfBirth: pendingUserAdminPicker.dateOfBirth && moment(pendingUserAdminPicker.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY"),
                                    expirationDatePolicyPersonal: pendingUserAdminPicker.expirationDatePolicyPersonal && moment(pendingUserAdminPicker.expirationDatePolicyPersonal, "YYYY-MM-DD").format("DD/MM/YYYY"),
                                    vehicle: {
                                        ...pendingUserAdminPicker.vehicle,
                                        [pendingUserAdminPicker.vehicleType]: {
                                            ...pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType],
                                            expirationDatePolicyVehicle: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle && moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDatePolicyVehicle, "YYYY-MM-DD").format("DD/MM/YYYY"),
                                            expirationDateIdentificationVehicle: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle && moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateIdentificationVehicle, "YYYY-MM-DD").format("DD/MM/YYYY"),
                                            expirationDateDriverLicense: pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense && moment(pendingUserAdminPicker.vehicle[pendingUserAdminPicker.vehicleType].expirationDateDriverLicense, "YYYY-MM-DD").format("DD/MM/YYYY"),
                                        }
                                    }
                                } :
                                pendingUserAdminPicker
                        }
                        validate={useValidationSchema(validationSchema)}
                    >
                        {({ invalid,handleSubmit, dirty, initialValues, values }) =>
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
                                                placeholder="Ingresá el Código de área *"
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                type="text"
                                                name="phone.number"
                                                label="Teléfono *"
                                                component={Input}
                                                className="Admin-Pickers-input"
                                                placeholder="Ingresá el teléfono"
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
                                                label="Número de CUIT/CUIL"
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
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.expirationDatePolicyVehicle`}
                                                        label="Vencimiento de la cédula *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="día / mes / año"
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Field
                                                        type="text"
                                                        name={`vehicle.${initialValues.vehicleType}.expirationDateIdentificationVehicle`}
                                                        label="Vencimiento del seguro de automotor *"
                                                        component={Input}
                                                        className="Admin-Pickers-input"
                                                        placeholder="día / mes / año"
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
                                            <button type="button" onClick={()=>cancel(dirty)} disabled={!dirty} className="button-submit-subtype">Cancelar</button>
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
                                            <button type="submit" disabled={!dirty} className="button-submit-subtype">Guardar cambios</button>
                                            <button type="button" onClick={()=> {aproveSubmit(values,goBack)}} disabled={invalid} className="button-submit-active">Aprobar picker</button>
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
