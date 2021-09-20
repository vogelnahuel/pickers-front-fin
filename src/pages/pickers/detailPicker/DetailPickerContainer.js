import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    actions as pendingUserAdminPickerActions,
    selectors as pendingUserAdminPickerSelectors
} from "reducers/detailPicker";
import {DetailPicker} from "pages/pickers/detailPicker/DetailPicker"
import {DATE_FORMATS, VALIDATION_REGEX} from "utils/constants";
import {useHistory, useParams} from "react-router-dom";
import {actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import * as yup from "yup";
import {actions as notificationActions} from "reducers/notification";

const DetailPickerContainer = (props) => {
    const params = useParams();
    const historial = useHistory();

    useEffect(() => {
        props.getPendingUserPicker(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changePage = (page, isDirty) => {
        let onClose = ()=>{
            props.setActualPage(page);
            historial.goBack();
        };
        if(isDirty) {
            props.showNotification(
                {
                    level:"warning",
                    title: "Guardá tus cambios",
                    body:"Si te vas sin guardar, tus cambios no van a quedar registrados",
                    onClickLabel: "Ir a guardar",
                    onCloseLabel: "No quiero guardarlos",
                    onClose: onClose,
                    onClick: ()=>window.scroll({ top: window.innerHeight, left: 0,  behavior: 'smooth' })
                }
            );
        } else {
            onClose();
        }
    };
    let active = props.pendingUserAdminPicker.status && (props.pendingUserAdminPicker.status.id === 4 || props.pendingUserAdminPicker.status.id === 5 );

    const validationSchema =
        yup.lazy((values) => {
            return yup.object({
                name: yup.string().required("Este campo es requerido.").matches(VALIDATION_REGEX.expName,"No se admiten números o caracteres especiales"),
                surname: yup.string().required("Este campo es requerido.").matches(VALIDATION_REGEX.expName,"No se admiten números o caracteres especiales"),
                phone: yup.object({
                    areaNumber: yup.string().required("Este campo es requerido.").matches(VALIDATION_REGEX.regArea,"Ingresá el formato correcto"),
                    number: yup.string().required("Este campo es requerido.").matches(VALIDATION_REGEX.regTelefono,"Ingresá el formato correcto")
                }),
                expirationDatePolicyPersonal: yup.string().nullable()
                    .required("Este campo es requerido.")
                    .matches(DATE_FORMATS.regex,"Ingresá el formato correcto" ),
                vehicle:
                    values.vehicleType === 'motorcycle' &&
                    yup.object({
                        [values.vehicleType]: yup.object({
                            patent: yup.string().nullable().required("Este campo es requerido.").matches(VALIDATION_REGEX.regPatent,"No se admiten caracteres especiales"),
                            expirationDatePolicyVehicle: yup.string().nullable()
                                .required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingresá el formato correcto" )
                                .matches(DATE_FORMATS.regexValidCharacter,"No se admiten letras o caracteres especiales"),
                            expirationDateIdentificationVehicle: yup.string().nullable()
                                .required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingresá el formato correcto" )
                                .matches(DATE_FORMATS.regexValidCharacter,"No se admiten letras o caracteres especiales"),
                            expirationDateDriverLicense: yup.string().nullable()
                                .required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingresá el formato correcto" )
                                .matches(DATE_FORMATS.regexValidCharacter,"No se admiten letras o caracteres especiales"),
                        })
                    })
            });
        });

    const cancel = (isDirty,restart) => {
        let onClose = ()=>{
            restart();
        };
        if(isDirty) {
            props.showNotification(
                {
                    level:"warning",
                    title: "Guardá tus cambios",
                    body:"Si te vas sin guardar, tus cambios no van a quedar registrados",
                    onClickLabel: "Ir a guardar",
                    onCloseLabel: "No quiero guardarlos",
                    onClose: onClose,
                    onClick: ()=>window.scroll({ top: window.innerHeight, left: 0,  behavior: 'smooth' })
                }
            );
        } else {
            onClose();
        }
    };

    const aproveSubmit = (params, goBack) => {
       
        props.showNotification(
            {
                level:"info",
                title: "Aprobar picker",
                body:"Al aprobar la solicitud, ya va a poder hacer envíos",
                onClickLabel: "Aprobar",
                onCloseLabel: "Revisar datos",
                onClick: ()=>props.postAprovePickerRequest(params, goBack)
            }
        );
    };

    return (
        <DetailPicker
            {...props}
            validationSchema={validationSchema}
            changePage={changePage}
            cancel={cancel}
            goBack={()=>historial.goBack()}
            aproveSubmit={aproveSubmit}
            active={active}
        />
    );
};


const mapStateToProps = (state) => ({
    pendingUserAdminPicker: pendingUserAdminPickerSelectors.getPendingUserPicker(state),
    isFetching: pendingUserAdminPickerSelectors.isFetching(state),
    actualPage: pendingUserSelectors.getActualPage(state),
});

const mapDispatchToProps = (dispatch) => ({
    getPendingUserPicker: (params) => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerRequest(params));
    },
    getPendingUserPickerExport: (params) => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerExportRequest(params));
    },
    setDirty: (dirty) => {
        dispatch(pendingUserAdminPickerActions.setDirty(dirty));
    },
    postAprovePickerRequest: (params, goBack) => {
        dispatch(pendingUserAdminPickerActions.getAprovePickerRequest(params, goBack));
    },
    postPendingUserDocumentsEdit: (params) => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerDocumentsEditRequest(params));
    },
    showNotification: (content) => {
        dispatch(notificationActions.showNotification(content));
    },
    postEditPickerRequest: (params, goBack) => {
        dispatch(pendingUserAdminPickerActions.getEditPickerRequest(params, goBack));
    },
    setActualPage:(page)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPickerContainer);
