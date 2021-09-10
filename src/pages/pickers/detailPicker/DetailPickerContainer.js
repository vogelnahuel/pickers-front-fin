import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    actions as pendingUserAdminPickerActions,
    selectors as pendingUserAdminPickerSelectors
} from "reducers/detailPicker";
import {DetailPicker} from "pages/pickers/detailPicker/DetailPicker"
import {DATE_FORMATS} from "utils/constants";
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
                    onClose: onClose
                }
            );
        } else {
            onClose();
        }
    };

    const validationSchema =
        yup.lazy((values) => {
            return yup.object({
                name: yup.string().required("Este campo es requerido."),
                surname: yup.string().required("Este campo es requerido."),
                phone: yup.object({
                    areaNumber: yup.string().required("Este campo es requerido."),
                    number: yup.string().required("Este campo es requerido.")
                }),
                expirationDatePolicyPersonal: yup.string().nullable().required("Este campo es requerido.")
                    .matches(DATE_FORMATS.regex,"Ingesa el formato correcto" ),
                vehicle:
                    values.vehicleType === 'motorcycle' &&
                    yup.object({
                        [values.vehicleType]: yup.object({
                            patent: yup.string().nullable().required("Este campo es requerido."),
                            expirationDatePolicyVehicle: yup.string().nullable().required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingesa el formato correcto" ),
                            expirationDateIdentificationVehicle: yup.string().nullable().required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingesa el formato correcto" ),
                            expirationDateDriverLicense: yup.string().nullable().required("Este campo es requerido.")
                                .matches(DATE_FORMATS.regex,"Ingesa el formato correcto" ),
                        })
                    })
            });
        });

    const cancel = (isDirty) => {
        let onClose = ()=>{
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
                    onClose: onClose
                }
            );
        } else {
            onClose();
        }
    };

    const aproveSubmit = (params) => {
        props.showNotification(
            {
                level:"info",
                title: "Aprobar picker",
                body:"Al aprobar la solicitud, ya va a poder hacer envíos",
                onClickLabel: "Aprobar",
                onCloseLabel: "Revisar datos",
                onClick: pendingUserAdminPickerActions.getAprovePickerRequest(params)
            }
        );
    };

    return (
        <DetailPicker
            {...props}
            validationSchema={validationSchema}
            changePage={changePage}
            cancel={cancel}
            aproveSubmit={aproveSubmit}
            active={props.pendingUserAdminPicker.status && (props.pendingUserAdminPicker.status.id === 4 || props.pendingUserAdminPicker.status.id === 5 )}
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
    postPendingUserDocumentsEdit: (params) => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerDocumentsEditRequest(params));
    },
    showNotification: (content) => {
        dispatch(notificationActions.showNotification(content));
    },
    postEditPickerRequest: (params) => {
        dispatch(pendingUserAdminPickerActions.getEditPickerRequest(params));
    },
    setActualPage:(page)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPickerContainer);
