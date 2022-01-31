import React from "react";
import { Header } from "component/admin/Header/Header";
import Nav from "component/admin/Nav/Nav";
import "pages/pickers/Pickers.scss";
import "pages/pickers/detailPicker/DetailPicker.scss";
import { TabControler } from "component/admin/TabControler/TabControler";
import { Input } from "component/inputs/Input";
import { Switch } from "component/inputs/switch";
import motorcycle from "assets/admin/PendingUserAdminPicker/motorcycle.svg";
import bici from "assets/admin/PendingUserAdminPicker/bici.svg";
import { Field, Form } from "react-final-form";
import useValidationSchema from "hooks/useValidationSchema";
import { FormSpy } from "react-final-form";
import NotificationModal from "component/modal/NotificationModal";
import ExportAction from "../actions/ExportAction";
import { DetailPickerTypeProps, pickerTabs } from "./types";
import i18next from "i18next";
import ExpandableFile from "component/admin/ExpandableFile/ExpandableFile";
import relojAzul from "assets/admin/PendingUser/relojAzul.svg";
import relojOscuro from "assets/admin/PendingUser/relojOscuro.svg";
import trabajadorOscuro from "assets/admin/PendingUser/trabajadorOscuro.svg";
import trabajadorAzul from "assets/admin/PendingUser/trabajadorAzul.svg";
import Back from "component/back/Back";
import { TabType } from "component/admin/TabControler/types";
import { PickerType } from "../types";
import Select from "component/inputs/Select";

export const DetailPicker: React.FC<DetailPickerTypeProps> = ({
  actualPage,
  isFetching,
  pendingUserAdminPicker,
  initialValues,
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
  wrongFiles,
  showNotification,
  loadedFiles,
  changePage,
  getBankName,
  provinces,
}) => {
  const tabs: TabType<pickerTabs>[] = [
    {
      title: "pickers:label.title.pending",
      id: "PENDING",
      icons: { active: relojAzul, disable: relojOscuro },
    },
    {
      title: "pickers:label.title.pickers",
      id: "ACTIVE",
      icons: { active: trabajadorAzul, disable: trabajadorOscuro },
    },
  ];
  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <Form
            keepDirtyOnReinitialize
            onSubmit={(values) =>
              !active
                ? aproveSubmit(values, goBack)
                : wrongFiles
                ? showNotification({
                    level: "warning",
                    title: i18next.t("global:title.modal.withoutSaving"),
                    body: i18next.t("global:label.modal.withoutSaving"),
                    onClickLabel: i18next.t("global:label.button.checkErrors"),
                    onCloseLabel: i18next.t("global:label.button.continue"),
                    onClose: () => postEditPickerRequest(values, goBack),
                    onClick: undefined,
                  })
                : postEditPickerRequest(values, goBack)
            }
            initialValues={initialValues}
            validate={useValidationSchema(validationSchema)}
            mutators={{
              bankSearch: ([field, value], state, { changeValue }) => {
                const values = state.formState.values as PickerType;
                const { bankIdentifier } = values.accountingData;

                if (!bankIdentifier || bankIdentifier.length < 22)
                  changeValue(state, "accountingData.bankName", () => "-");
                else {
                  const prefix = bankIdentifier.substring(0, 3);
                  getBankName(prefix);
                }
              },
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
          >
            {({
              invalid,
              handleSubmit,
              dirty,
              initialValues,
              values,
              form,
            }) => (
              <>
                <div className="header-container">
                  <TabControler<pickerTabs>
                    tabs={tabs}
                    changePage={(page) => changePage(page, dirty)}
                    actualPage={actualPage}
                  />
                  <Back onClick={() => goBack(true, dirty)} />
                </div>

                <div className="mainContainerFlex-picker">
                  <div className="picker-id">
                    {pendingUserAdminPicker?.id &&
                      (pendingUserAdminPicker?.status?.id === 4 ||
                        pendingUserAdminPicker?.status?.id === 5) &&
                      `#${pendingUserAdminPicker?.id}`}
                    <h2 className="subTitle-pending-picker">{nameDisplay}</h2>
                  </div>
                  {pendingUserAdminPicker?.vehicle &&
                  pendingUserAdminPicker?.vehicle?.type === "motorcycle" ? (
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
                    <ExportAction
                      getPendingUserPickerExport={() => {
                        getPendingUserPickerExport(
                          pendingUserAdminPicker?.personalData
                        );
                      }}
                    />
                  </div>
                </div>
                <form className="Admin-Pickers-inputs" onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{
                      dirty: true,
                      values: true,
                      pristine: true
                    }}
                    onChange={(pro) => {
                      setDirty(pro.dirty);
                    }}
                  />
                  <div
                    id="personal-data-card"
                    className="container-detailPicker-fluid form-part-1-admin-pickers"
                  >
                    <div className="container-detailPicker-row">
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="personalData.name"
                          label={i18next.t("detailPicker:label.user.name")}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.user.name"
                          )}
                          maxLength={49}
                          onClick={() => {
                            form.mutators.upper("personalData.name");
                          }}
                        />
                      </div>
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="personalData.surname"
                          label={i18next.t("detailPicker:label.user.surname")}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.user.surname"
                          )}
                          maxLength={49}
                        />
                      </div>
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="personalData.identificationNumber"
                          disabled
                          label={i18next.t(
                            "detailPicker:label.user.identifier"
                          )}
                          component={Input}
                          className="Admin-Pickers-input disabled"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.user.identifier"
                          )}
                        />
                      </div>


                    <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                      <Field
                        type="text"
                        name="personalData.email"
                        label={i18next.t("detailPicker:label.user.email")}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input disabled"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.email"
                        )}
                      />
                    </div>
                    <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                      <Field
                        type="text"
                        name="personalData.dateOfBirth"
                        label={i18next.t("detailPicker:label.user.birthdate")}
                        component={Input}
                        disabled
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.birthdate"
                        )}
                      />
                    </div>
                    <div className="container-detailPicker-col-sm-4  container-detailPicker-col-xl-3">
                      <Field
                        type="text"
                        name="personalData.phone.areaNumber"
                        label={i18next.t("detailPicker:label.user.areaCode")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.areaCode"
                        )}
                        maxLength={5}
                      />
                    </div>

                    <div className="container-detailPicker-col-sm-4  container-detailPicker-col-xl-3">
                      <Field
                        type="text"
                        name="personalData.phone.number"
                        label={i18next.t("detailPicker:label.user.phone")}
                        component={Input}
                        className="Admin-Pickers-input"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.phone"
                        )}
                        maxLength={10}
                      />
                    </div>
                    </div>
                    <ExpandableFile
                      files={pendingUserAdminPicker?.files?.personalData}
                      pickerId={pendingUserAdminPicker?.id}
                    />
              
                  </div>
                  <h3 className="subTitle-pending-data">
                    {i18next.t("detailPicker:label.subtitle.account")}
                  </h3>
                  <div
                    id="accounting-data-card"
                    className="form-part-1-admin-pickers"
                  >
                    <div className="container-detailPicker-row">
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="accountingData.fiscalNumber"
                          label={i18next.t(
                            "detailPicker:label.account.fiscalNumber"
                          )}
                          component={Input}
                          disabled
                          className="Admin-Pickers-input disabled"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.account.fiscalNumber"
                          )}
                        />
                      </div>
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6 ">
                        <Field
                          type="text"
                          name="accountingData.bankIdentifier"
                          label={i18next.t(
                            "detailPicker:label.account.bankIdentifier"
                          )}
                          component={Input}
                          className="Admin-Pickers-input"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.account.bankIdentifier"
                          )}
                          maxLength={22}
                          onBlur={form.mutators.bankSearch}
                        />
                      </div>
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="accountingData.bankName"
                          label={i18next.t(
                            "detailPicker:label.account.bankName"
                          )}
                          isEqual={() => true}
                          disabled
                          className="Admin-Pickers-input disabled"
                          placeholder={i18next.t(
                            "detailPicker:placeholder.account.bankName"
                          )}
                        />
                      </div>
                      <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                        <Field
                          type="text"
                          name="accountingData.sapInterlocutor"
                          label={i18next.t(
                            "detailPicker:label.accountingData.sapInterlocutor"
                          )}
                          component={Input}
                          disabled
                          className="Admin-Pickers-input readonly"
                        />
                      </div>
                      </div>   
                      <div className="container-detailPicker-col-sm-24">
                        <div className="divider"></div>
                      </div>
                      <h3 className="container-detailPicker-row subTitle-fiscal-data">
                        {i18next.t("detailPicker:label.card.fiscalDirection")}
                      </h3>
                      <div className="container-detailPicker-row">
                        <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                          <Field
                            type="text"
                            name="accountingData.address.street"
                            label={i18next.t(
                              "detailPicker:label.accountingData.street"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "detailPicker:placeholder.accountingData.street"
                            )}
                            maxLength={50}
                          />
                        </div>
                        <div className="container-detailPicker-col-sm-4  container-detailPicker-col-xl-3">
                          <Field
                            type="text"
                            name="accountingData.address.streetNumber"
                            label={i18next.t(
                              "detailPicker:label.accountingData.streetNumber"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "detailPicker:placeholder.accountingData.streetNumber"
                            )}
                            maxLength={10}
                          />
                        </div>
                        <div className="container-detailPicker-col-sm-4  container-detailPicker-col-xl-3">
                          <Field
                            type="text"
                            name="accountingData.address.postalCode"
                            label={i18next.t(
                              "detailPicker:label.accountingData.postalCode"
                            )}
                            component={Input}
                            className="Admin-Pickers-input "
                            placeholder={i18next.t(
                              "detailPicker:placeholder.accountingData.postalCode"
                            )}
                            maxLength={4}
                          />
                        </div>
                        <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                          <Field
                            type="text"
                            name="accountingData.address.locality"
                            label={i18next.t(
                              "detailPicker:label.accountingData.locality"
                            )}
                            component={Input}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "detailPicker:placeholder.accountingData.locality"
                            )}
                            maxLength={50}
                          />
                        </div>
                        <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                          <Field
                            type="text"
                            name="accountingData.address.province"
                            onChange={form.mutators.setValue}
                            label={i18next.t(
                              "detailPicker:label.accountingData.province"
                            )}
                            className="Admin-Pickers-input"
                            placeholder={i18next.t(
                              "detailPicker:placeholder.accountingData.province"
                            )}
                            options={provinces.map((o) => ({
                              ...o,
                              label: o.name,
                            }))}
                          >
                            {(props: any) => <Select {...props} />}
                          </Field>
                        </div>
                      </div>

                    <ExpandableFile
                      files={pendingUserAdminPicker?.files?.accountingData}
                      pickerId={pendingUserAdminPicker.id}
                    />
                  </div>

                  {initialValues?.vehicle?.type === "motorcycle" && (
                    <>
                      <h3 className="subTitle-pending-data">
                        {i18next.t("detailPicker:label.subtitle.insurance")}
                      </h3>
                      <div
                        id="vehicle-data-card"
                        className="form-part-1-admin-pickers"
                      >
                        <div className="container-detailPicker-row">
                          {initialValues.vehicle &&
                            initialValues.vehicle.type === "motorcycle" && (
                              <>
                                <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6 ">
                                  <Field
                                    type="text"
                                    name={`vehicle.patent`}
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
                                </div>
                                <div className="container-detailPicker-col-sm-8  container-detailPicker-col-xl-6">
                                  <Field
                                    type="text"
                                    name={`vehicle.expirationDateDriverLicense`}
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
                                </div>
                                <div className="container-detailPicker-col-sm-8 container-detailPicker-col-xl-6 ">
                                  <Field
                                    type="text"
                                    name={`vehicle.expirationDateIdentificationVehicle`}
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
                                </div>
                                <div className="container-detailPicker-col-sm-8 container-detailPicker-col-xl-6">
                                  <Field
                                    type="text"
                                    name={`vehicle.expirationDatePolicyVehicle`}
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
                                </div>
                              </>
                            )}
                        </div>
                        <ExpandableFile
                          files={pendingUserAdminPicker?.files?.vehicle}
                          pickerId={pendingUserAdminPicker.id}
                        />
                      </div>
                    </>
                  )}

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
                          {i18next.t("global:label.button.cancel")}
                        </button>
                        <button
                          type="submit"
                          disabled={invalid || !dirty}
                          className="button-submit-active"
                        >
                          {i18next.t("global:label.button.save")}
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
                          onClick={() =>
                            wrongFiles
                              ? showNotification({
                                  level: "warning",
                                  title: i18next.t(
                                    "global:title.modal.withoutSaving"
                                  ),
                                  body: i18next.t(
                                    "global:label.modal.withoutSaving"
                                  ),
                                  onClickLabel: i18next.t(
                                    "global:label.button.checkErrors"
                                  ),
                                  onCloseLabel: i18next.t(
                                    "global:label.button.continue"
                                  ),
                                  onClose: () =>
                                    postPendingUserDocumentsEdit(values),
                                  onClick: undefined,
                                })
                              : postPendingUserDocumentsEdit(values)
                          }
                          className="button-submit-subtype"
                        >
                          {i18next.t("detailPicker:label.button.save")}
                        </button>

                        <button
                          type="submit"
                          disabled={invalid || wrongFiles || !loadedFiles}
                          className="button-submit-active"
                        >
                          {i18next.t("detailPicker:label.button.approvePicker")}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </>
            )}
          </Form>
          <NotificationModal />
        </div>
      </div>
      {isFetching && <div className="modalLoading"></div>}
    </div>
  );
};
