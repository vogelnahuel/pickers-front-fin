import React from "react";
import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import "pages/pickers/Pickers.scss";
import "pages/pickers/detailPicker/DetailPicker.scss";
import PickerStatusButton from "component/admin/PickerStatusButton/PickerStatusButton";
import { Input } from "component/inputs/Input";
import { Switch } from "component/inputs/switch";
import motorcycle from "assets/admin/PendingUserAdminPicker/motorcycle.svg";
import bici from "assets/admin/PendingUserAdminPicker/bici.svg";
import { Field, Form } from "react-final-form";
import useValidationSchema from "hooks/useValidationSchema";
import { Col, Container, Row } from "react-bootstrap";
import { FormSpy } from "react-final-form";
import moment from "moment";
import NotificationModal from "component/modal/NotificationModal";
import Actions from "pages/pickers/actions/Actions";
import { DetailPickerTypeProps } from "./types";
import i18next from "i18next";

export const DetailPicker: React.FC<DetailPickerTypeProps> = ({
  isFetching,
  pendingUserAdminPicker,
  getPendingUserPickerExport,
  setDirty,
  active,
  cancel,
  aproveSubmit,
  nameDisplay,
  goBack,
  postPendingUserDocumentsEdit,
  postEditPickerRequest,
  validationSchema,
}) => {
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <PickerStatusButton isDetail={true} />
          <div></div>
          <div className="mainContainerFlex-picker">
            <div className="picker-id">
              {pendingUserAdminPicker.id &&
                (pendingUserAdminPicker.status.id === 4 ||
                  pendingUserAdminPicker.status.id === 5) &&
                `#${pendingUserAdminPicker.id}`}
              <h2 className="subTitle-pending-picker">{nameDisplay}</h2>
            </div>
            {pendingUserAdminPicker.vehicleType === "motorcycle" ? (
              <img
                className="vehiculo-pending-picker"
                src={motorcycle}
                alt="vehiculo"
              />
            ) : (
              <img
                className="vehiculo-pending-picker"
                src={bici}
                alt="vehiculo"
              />
            )}
            <div className="export-container">
              <Actions
                getPendingUserPickerExport={getPendingUserPickerExport}
                pendingUserAdminPicker={pendingUserAdminPicker}
              />
            </div>
          </div>
          <Form
            onSubmit={(values) =>
              active
                ? postEditPickerRequest(values, goBack)
                : aproveSubmit(values, goBack)
            }
            initialValues={
              pendingUserAdminPicker.id
                ? {
                    ...pendingUserAdminPicker,
                    accountingData: {
                      ...pendingUserAdminPicker.accountingData,
                      fiscalNumber:
                        pendingUserAdminPicker.accountingData.fiscalNumber.includes(
                          "-"
                        )
                          ? pendingUserAdminPicker.accountingData.fiscalNumber
                          : pendingUserAdminPicker.accountingData.fiscalNumber.slice(
                              0,
                              2
                            ) +
                            " - " +
                            pendingUserAdminPicker.accountingData.fiscalNumber.slice(
                              2,
                              10
                            ) +
                            " - " +
                            pendingUserAdminPicker.accountingData.fiscalNumber.slice(
                              10,
                              11
                            ),
                    },
                    dateOfBirth:
                      pendingUserAdminPicker.dateOfBirth &&
                      !pendingUserAdminPicker.dateOfBirth.includes("/")
                        ? moment(
                            pendingUserAdminPicker.dateOfBirth,
                            "YYYY-MM-DD"
                          ).format("DD/MM/YYYY")
                        : pendingUserAdminPicker.dateOfBirth,
                    expirationDatePolicyPersonal:
                      pendingUserAdminPicker.expirationDatePolicyPersonal &&
                      !pendingUserAdminPicker.expirationDatePolicyPersonal.includes(
                        "/"
                      )
                        ? moment(
                            pendingUserAdminPicker.expirationDatePolicyPersonal,
                            "YYYY-MM-DD"
                          ).format("DD/MM/YYYY")
                        : pendingUserAdminPicker.expirationDatePolicyPersonal,
                    vehicle: {
                      ...pendingUserAdminPicker.vehicle,
                      [pendingUserAdminPicker.vehicleType]: {
                        ...pendingUserAdminPicker.vehicle[
                          pendingUserAdminPicker.vehicleType
                        ],
                        expirationDatePolicyVehicle:
                          pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDatePolicyVehicle &&
                          !pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDatePolicyVehicle.includes("/")
                            ? moment(
                                pendingUserAdminPicker.vehicle[
                                  pendingUserAdminPicker.vehicleType
                                ].expirationDatePolicyVehicle,
                                "YYYY-MM-DD"
                              ).format("DD/MM/YYYY")
                            : pendingUserAdminPicker.vehicle[
                                pendingUserAdminPicker.vehicleType
                              ].expirationDatePolicyVehicle,
                        expirationDateIdentificationVehicle:
                          pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDateIdentificationVehicle &&
                          !pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDateIdentificationVehicle.includes("/")
                            ? moment(
                                pendingUserAdminPicker.vehicle[
                                  pendingUserAdminPicker.vehicleType
                                ].expirationDateIdentificationVehicle,
                                "YYYY-MM-DD"
                              ).format("DD/MM/YYYY")
                            : pendingUserAdminPicker.vehicle[
                                pendingUserAdminPicker.vehicleType
                              ].expirationDateIdentificationVehicle,
                        expirationDateDriverLicense:
                          pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDateDriverLicense &&
                          !pendingUserAdminPicker.vehicle[
                            pendingUserAdminPicker.vehicleType
                          ].expirationDateDriverLicense.includes("/")
                            ? moment(
                                pendingUserAdminPicker.vehicle[
                                  pendingUserAdminPicker.vehicleType
                                ].expirationDateDriverLicense,
                                "YYYY-MM-DD"
                              ).format("DD/MM/YYYY")
                            : pendingUserAdminPicker.vehicle[
                                pendingUserAdminPicker.vehicleType
                              ].expirationDateDriverLicense,
                      },
                    },
                  }
                : pendingUserAdminPicker
            }
            validate={useValidationSchema(validationSchema)}
          >
            {({
              invalid,
              handleSubmit,
              dirty,
              initialValues,
              values,
              form,
            }) => (
              <form className="Admin-Pickers-inputs" onSubmit={handleSubmit}>
                <FormSpy
                  subscription={{ dirty: true }}
                  onChange={(pro) => {
                    setDirty(pro.dirty);
                  }}
                />
                <Container fluid className="form-part-1-admin-pickers">
                  <Row>
                    <Col>
                      <Field
                        type="text"
                        name="name"
                        label={i18next.t("detailPicker:label.user.name")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.name"
                        )}
                        maxLength={49}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="surname"
                        label={i18next.t("detailPicker:label.user.surname")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.surname"
                        )}
                        maxLength={49}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="identificationNumber"
                        disabled
                        label={i18next.t("detailPicker:label.user.identifier")}
                        component={Input}
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.identifier"
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Field
                        type="text"
                        name="email"
                        label={i18next.t("detailPicker:label.user.email")}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.email"
                        )}
                      />
                    </Col>
                    <Col md={4}>
                      <Field
                        type="text"
                        name="dateOfBirth"
                        label={i18next.t("detailPicker:label.user.birthdate")}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.birthdate"
                        )}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="phone.areaNumber"
                        label={i18next.t("detailPicker:label.user.areaCode")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.areaCode"
                        )}
                        maxLength={5}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="phone.number"
                        label={i18next.t("detailPicker:label.user.phone")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.phone"
                        )}
                        maxLength={10}
                      />
                    </Col>
                  </Row>
                </Container>
                <h3 className="subTitle-pending-data">
                  {i18next.t("detailPicker:label.subtitle.account")}
                </h3>
                <Container fluid className="form-part-1-admin-pickers">
                  <Row>
                    <Col>
                      <Field
                        type="text"
                        name="accountingData.fiscalNumber"
                        label={i18next.t(
                          "detailPicker:label.account.fiscalNumber"
                        )}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.account.fiscalNumber"
                        )}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="accountingData.bankIdentifier"
                        label={i18next.t(
                          "detailPicker:label.account.bankIdentifier"
                        )}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.account.bankIdentifier"
                        )}
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        name="accountingData.bankName"
                        label={i18next.t("detailPicker:label.account.bankName")}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.account.bankName"
                        )}
                      />
                    </Col>
                  </Row>
                </Container>
                <h3 className="subTitle-pending-data">
                  {i18next.t("detailPicker:label.subtitle.insurance")}
                </h3>
                <Container fluid className="form-part-1-admin-pickers">
                  <Row>
                    {initialValues.vehicleType === "motorcycle" && (
                      <>
                        <Col md={4}>
                          <Field
                            type="text"
                            name={`vehicle.${initialValues.vehicleType}.patent`}
                            label={i18next.t(
                              "detailPicker:label.insurance.patent"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "detailPicker:placeholder.insurance.patent"
                            )}
                            maxLength={7}
                          />
                        </Col>
                        <Col md={4}>
                          <Field
                            type="text"
                            name={`vehicle.${initialValues.vehicleType}.expirationDateDriverLicense`}
                            label={i18next.t(
                              "detailPicker:label.insurance.licenseExpiration"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "global:placeholder.input.date"
                            )}
                            maxLength={10}
                          />
                        </Col>
                        <Col md={4}>
                          <Field
                            type="text"
                            name={`vehicle.${initialValues.vehicleType}.expirationDateIdentificationVehicle`}
                            label={i18next.t(
                              "detailPicker:label.insurance.identifierExpiration"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "global:placeholder.input.date"
                            )}
                            maxLength={10}
                          />
                        </Col>
                        <Col md={4}>
                          <Field
                            type="text"
                            name={`vehicle.${initialValues.vehicleType}.expirationDatePolicyVehicle`}
                            label={i18next.t(
                              "detailPicker:label.insurance.carInsuranceExpiration"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "global:placeholder.input.date"
                            )}
                            maxLength={10}
                          />
                        </Col>
                      </>
                    )}
                    <Col md={4}>
                      <Field
                        type="text"
                        name="expirationDatePolicyPersonal"
                        label={i18next.t(
                          "detailPicker:label.insurance.personalAccidentInsuranceExpiration"
                        )}
                        lastLabel
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t("global:placeholder.input.date")}
                        maxLength={10}
                      />
                    </Col>
                  </Row>
                </Container>
                {active ? (
                  <>
                    <Field name="enable" component={Switch} />
                    <div className="pending-admin-picker-button">
                      <button
                        type="button"
                        onClick={() => cancel(dirty, form.restart)}
                        disabled={!dirty}
                        className="button-submit-subtype"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={invalid || !dirty}
                        className="button-submit-active"
                      >
                        Guardar
                      </button>
                    </div>
                  </>
                ) : (
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
                      <button
                        type="button"
                        onClick={() => postPendingUserDocumentsEdit(values)}
                        className="button-submit-subtype"
                      >
                        Guardar cambios
                      </button>
                      <button
                        type="submit"
                        disabled={invalid}
                        className="button-submit-active"
                      >
                        Aprobar picker
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </Form>
          <NotificationModal />
        </div>
      </div>
      {isFetching && <div className="modalLoading"></div>}
    </div>
  );
};
