import React, { useState } from "react";
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
import { FormSpy } from "react-final-form";
import moment from "moment";
import NotificationModal from "component/modal/NotificationModal";
import Actions from "pages/pickers/actions/Actions";
import { DetailPickerTypeProps } from "./types";
import { DATE_FORMATS, DETAIL_PICKER_TAG } from "utils/constants";
import i18next from "i18next";

import   Folder  from  "assets/admin/folder.svg";
import   FolderError  from  "assets/admin/folderError.svg";
import   FolderAdd  from  "assets/admin/folderAdd.svg";
import   FileReplace  from  "assets/admin/fileReplace.svg";
import   FileDelete  from  "assets/admin/fileDelete.svg";
import   FileLoad  from  "assets/admin/fileLoad.svg";
import { ExpandableFile } from "./ExpandableFile";

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
  formatDate,
}) => {

  const [activarOpciones, setactivarOpciones] = useState({
    PersonalData:false,
    AccountingData:false,
    VehicleData:false
  })


  return (
    <div className="background-Grey">
      <Header />
      <div className="mainContainerFlex">
        <Nav />
        <div className="pending-container">
          <PickerStatusButton isDetail={true} />
          <div className="mainContainerFlex-picker">
            <div className="picker-id">
              {pendingUserAdminPicker.id &&
                (pendingUserAdminPicker.status.id === 4 ||
                  pendingUserAdminPicker.status.id === 5) &&
                `#${pendingUserAdminPicker.id}`}
              <h2 className="subTitle-pending-picker">{nameDisplay}</h2>
            </div>
            {pendingUserAdminPicker.vehicle && pendingUserAdminPicker.vehicle.type === "motorcycle" ? (
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
                getPendingUserPickerExport={()=>{getPendingUserPickerExport(pendingUserAdminPicker.personalData)}}
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
                    personalData:{
                      ...pendingUserAdminPicker.personalData,
                      dateOfBirth:
                      pendingUserAdminPicker.personalData.dateOfBirth &&
                      pendingUserAdminPicker.personalData.dateOfBirth.includes("-")
                        ? moment(
                            pendingUserAdminPicker.personalData.dateOfBirth,
                            DATE_FORMATS.shortISODate
                          ).format(DATE_FORMATS.shortDate)
                        :pendingUserAdminPicker.personalData.dateOfBirth,
                    },
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
                    
                   
                    vehicle: {
                      ...pendingUserAdminPicker.vehicle,
                   
                    
                        expirationDatePolicyVehicle: formatDate(
                          pendingUserAdminPicker?.vehicle.expirationDatePolicyVehicle
                        ),
                        expirationDateIdentificationVehicle: formatDate(
                          pendingUserAdminPicker.vehicle.expirationDateIdentificationVehicle 
                        ),
                        expirationDateDriverLicense: formatDate(
                          pendingUserAdminPicker.vehicle.expirationDateDriverLicense
                        ),
                      
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
                <div className="container-detailPicker-fluid form-part-1-admin-pickers">
                  <div className="container-detailPicker-row">
                    <div className="container-detailPicker-col-sm-6  ">
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
                      />
                    </div>
                    <div className="container-detailPicker-col-sm-6  ">
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
                    <div className="container-detailPicker-col-sm-6  ">
                      <Field
                        type="text"
                        name="personalData.identificationNumber"
                        disabled
                        label={i18next.t("detailPicker:label.user.identifier")}
                        component={Input}
                        className="Admin-Pickers-input readonly"
                        placeholder={i18next.t(
                          "detailPicker:placeholder.user.identifier"
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="container-detailPicker-row">
                      <div className="container-detailPicker-col-sm-6  ">
                        <Field
                          type="text"
                          name="personalData.email"
                          label={i18next.t("detailPicker:label.user.email")}
                          component={Input}
                          disabled
                          className="Admin-Pickers-input readonly"
                          placeholder={i18next.t(
                              "detailPicker:placeholder.user.email"
                          )}                        />
                      </div>
                      <div className="container-detailPicker-col-sm-6  ">
                        <Field
                          type="text"
                          name="personalData.dateOfBirth"
                          label={i18next.t("detailPicker:label.user.birthdate")}
                          component={Input}
                          disabled
                          className="Admin-Pickers-input"
                          placeholder={i18next.t(
                              "detailPicker:placeholder.user.birthdate"
                          )}                        />
                      </div>
                      <div className="container-detailPicker-col-sm-3  ">
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
                    
                      <div className="container-detailPicker-col-sm-3  ">
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
                  </div>
                    <ExpandableFile files={pendingUserAdminPicker?.files?.personalData}/>
                </div>
               
                <h3 className="subTitle-pending-data" >
                    {i18next.t("detailPicker:label.subtitle.account")}
                </h3>
                <div className="form-part-1-admin-pickers">
                  <div className="container-detailPicker-row">
                    <div className="container-detailPicker-col-sm-6  ">
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
                    </div>
                    <div className="container-detailPicker-col-sm-6  ">
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
                    </div>
                    <div className="container-detailPicker-col-sm-6  ">
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
                    </div>
                  </div>
                  <hr className="border-row"/>
                  <div className="">
                    <div className="container-detailPicker-row " >
                   
                        <div className="container-detailPicker-col-18 display-flex cursor-pointer"  onClick={()=>setactivarOpciones( {...activarOpciones , AccountingData:!activarOpciones.AccountingData} ) }>
                          <img src={pendingUserAdminPicker?.files?.accountingData?.status==="EMPTY"?FolderAdd : pendingUserAdminPicker?.files?.accountingData?.status==="COMPLETED" ? Folder : FolderError}  alt="archivo"/>
                          <p className="p-file">Archivos</p>
                        </div>

                        <div className="container-detailPicker-col-sm-6" >
                     
                            <div>
                            <ul className={activarOpciones.AccountingData ? "p-li" :"display-none"}>
                                  {
                                      pendingUserAdminPicker&&   pendingUserAdminPicker.files &&   pendingUserAdminPicker.files.accountingData && pendingUserAdminPicker.files.accountingData.content && pendingUserAdminPicker.files.accountingData.content.map( (element) => (
                                      <li className="display-flex" key={element.tag}>
                                        {
                                              element.isUpload ?  <>
                                                                    <p className=""> 
                                                                        { i18next.t( DETAIL_PICKER_TAG[element.tag] ) }
                                                                    </p>  
                                                                    <div className="container-img-picker"> 
                                                                          <img className="picker-replace" src={FileReplace} alt=""/> 
                                                                          <img className="padding-left picker-delete" src={FileDelete} alt=""/> 
                                                                    </div> 
                                                                </>
                                                              :
                                                                  <>
                                                                    <p className="picker-color-gray"> 
                                                                        { i18next.t( DETAIL_PICKER_TAG[element.tag] ) }
                                                                    </p>  
                                                                    <div className="container-img-picker"> 
                                                                          <img className="picker-replace" src={FileLoad} alt=""/> 
                                                                    </div> 
                                                                  </>                 
                                          }
                                        </li>
                                      ))
                                  }
                              </ul>
                            </div>

                        </div>
                        <div className="container-detailPicker-col-sm-6">
                        </div>
                        <div className="container-detailPicker-col-sm-6">
                        </div>
                    </div>
                  </div>
                  
                </div>
                <h3 className="subTitle-pending-data">
                    {i18next.t("detailPicker:label.subtitle.insurance")}
                </h3>
                <div className="form-part-1-admin-pickers">
                  <div className="container-detailPicker-row">
                    {initialValues.vehicle && initialValues.vehicle.type === "motorcycle" && (
                      <>
                        <div className="container-detailPicker-col-sm-6  ">
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
                        <div className="container-detailPicker-col-sm-6  ">
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
                        <div className="container-detailPicker-col-sm-6  ">
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
                        <div className="container-detailPicker-col-sm-6">
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
                  <hr className="border-row"/>
                  <div className="">
                    <div className="container-detailPicker-row " >
                   
                        <div className="container-detailPicker-col-18 display-flex cursor-pointer"  onClick={()=>setactivarOpciones( {...activarOpciones , VehicleData:!activarOpciones.VehicleData} ) }>
                          <img src={pendingUserAdminPicker?.files?.vehicle?.status==="EMPTY"?FolderAdd : pendingUserAdminPicker?.files?.vehicle?.status==="COMPLETED" ? Folder : FolderError}  alt="archivo"/>
                          <p className="p-file">Archivos</p>
                        </div>

                        <div className="container-detailPicker-col-sm-6" >
                     
                            <div>
                            <ul className={activarOpciones.VehicleData ? "p-li" :"display-none"}>
                                  {
                                      pendingUserAdminPicker&&   pendingUserAdminPicker.files &&   pendingUserAdminPicker.files.vehicle && pendingUserAdminPicker.files.vehicle.content && pendingUserAdminPicker.files.vehicle.content.map( (element) => (
                                      <li className="display-flex" key={element.tag}> <p className={element.isUpload ? "azul" : "gris"}>  { i18next.t( DETAIL_PICKER_TAG[element.tag] ) }</p>   <div className="container-img-picker">  <img className="picker-replace" src={FileReplace} alt=""/> <img className="padding-left picker-delete" src={FileDelete} alt=""/>  </div> </li>
                                      ))
                                  }
                              </ul>
                            </div>

                        </div>
                        <div className="container-detailPicker-col-sm-6">
                        </div>
                        <div className="container-detailPicker-col-sm-6">
                        </div>
                    </div>
                  </div>
                </div>
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
                        onClick={() => postPendingUserDocumentsEdit(values)}
                        className="button-submit-subtype"
                      >
                        {i18next.t("detailPicker:label.button.save")}
                      </button>
                      <button
                        type="submit"
                        disabled={invalid}
                        className="button-submit-active"
                      >
                        {i18next.t("detailPicker:label.button.approvePicker")}
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
