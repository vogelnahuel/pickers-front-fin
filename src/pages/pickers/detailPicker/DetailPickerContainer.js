import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    actions as pendingUserAdminPickerActions,
    selectors as pendingUserAdminPickerSelectors
} from "reducers/pendingUserAdminPicker";
import {DetailPicker} from "./DetailPicker"
import { DATE_FORMATS } from "utils/constants";
import {useHistory, useParams} from "react-router-dom";
import {actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/PendingUser";
import * as yup from "yup";
import moment from "moment";

const DetailPickerContainer = (props) => {
    const params = useParams();
    const historial = useHistory();

    useEffect(() => {
        props.getPendingUserPicker(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const changePage = (page) => {
        props.setActualPage(page);
        historial.goBack();
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
                // ,
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

    const onSubmit = (values) => {
//TODO sacar
        props.postPendingUserDocumentsEdit(values);
    };

    const Historial = useHistory();
    const cancel = () => {
        Historial.goBack();
    };

    return (
        <DetailPicker
            {...props}
            validationSchema={validationSchema}
            changePage={changePage}
            onSubmit={onSubmit}
            cancel={cancel}
            active={props.pendingUserAdminPicker.status && (props.pendingUserAdminPicker.status.id === 4 || props.pendingUserAdminPicker.status.id === 5 )}
        />
    );
};


const mapStateToProps = (state) => ({
    pendingUserAdminPicker: pendingUserAdminPickerSelectors.getPendingUserPicker(state),
    modalExportPicker: pendingUserAdminPickerSelectors.getModalExportPicker(state),
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
    getPendingUserPickerExportCloseModal: () => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerExportCloseModal());
    },
    postPendingUserDocumentsEdit: (params) => {
        dispatch(pendingUserAdminPickerActions.getPendingUserPickerDocumentsEditRequest(params));
    },
    postAprovePickerRequest: (params) => {
        dispatch(pendingUserAdminPickerActions.getAprovePickerRequest(params));
    },
    postEditPickerRequest: (params) => {
        dispatch(pendingUserAdminPickerActions.getEditPickerRequest(params));
    },
    setActualPage:(page)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPickerContainer);
