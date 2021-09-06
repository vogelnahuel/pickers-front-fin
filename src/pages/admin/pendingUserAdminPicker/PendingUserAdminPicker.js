import React from 'react'
import {Header} from 'component/admin/Header/Header'
import {Nav} from 'component/admin/Nav/Nav'
import 'pages/admin/PendingUser/Pickers.scss'
import 'pages/admin/pendingUserAdminPicker/pendingUserAdminPicker.scss'
import {PendingBlue} from 'component/admin/Sub-Title-Image/PendingBlue'
import {Input} from "component/inputs/Input"
import {Switch} from "component/inputs/switch"
import exportar from 'assets/admin/PendingUser/exportar.svg'
import or from 'assets/admin/PendingUser/or.svg'
import motorcycle from 'assets/admin/PendingUserAdminPicker/motorcycle.svg'
import bici from 'assets/admin/PendingUserAdminPicker/bici.svg'
import {Field, Form} from "react-final-form";
import {Modal} from '@pickit/pickit-components'
import button from "assets/admin/ActiveUserAdminPicker/button.svg";
import disabledButton from "assets/admin/ActiveUserAdminPicker/disabledButton.svg";
import useValidationSchema from "hooks/useValidationSchema"
import {Col, Row, Container} from "react-bootstrap";

export const PendingUserAdminPicker = (
    {
        isFetching,
        pendingUserAdminPicker,
        getPendingUserPickerExport,
        modalExportPicker,
        getPendingUserPickerExportCloseModal,
        onSubmit,
        actualPage,
        active,
        cancel,
        postAprovePickerRequest,
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
                    <PendingBlue changePage={changePage} actualPage={actualPage}/>

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
                        initialValues={pendingUserAdminPicker}
                        validate={useValidationSchema(validationSchema)}
                    >
                        {({ handleSubmit, initialValues }) => (
                            <form className="Admin-Pickers-inputs" onSubmit={handleSubmit}>
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
                                                middle
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
                                                middle
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
                                                {/*</Row>*/}
                                                {/*<Row>*/}
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
                                            <button onClick={cancel} className="corregir-admin-picker">Cancelar</button>
                                            <button type="submit" className="button-modal-aprobar">Guardar</button>
                                        </div>
                                    </>
                                    :
                                        // TODO: hablitar cuando funcionen los checks de enviar carta
                                        // :
                                        // <div className="pending-admin-picker-container-checkbox">
                                        //     <div>
                                        //         <input className="pending-admin-picker-input-checkbox" type="checkbox" id="enviar" value="enviado" />
                                        //         <label className="pending-admin-picker-div-label" htmlFor="enviar">Envié la carta oferta</label>
                                        //     </div>
                                        //     <div>
                                        //         <input className="pending-admin-picker-input-checkbox" type="checkbox" id="firmar" value="firmado"/>
                                        //         <label  className="pending-admin-picker-div-label" htmlFor="firmar">Firmó la carta oferta</label>
                                        //     </div>
                                        // </div>
                                    <>
                                        <div className="pending-admin-picker-button">
                                            <button type="submit" className="corregir-admin-picker">Guardar cambios</button>
                                            <button onClick={postAprovePickerRequest} className="button-modal-aprobar">Aprobar picker</button>
                                        </div>
                                    </>
                                }
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
};
