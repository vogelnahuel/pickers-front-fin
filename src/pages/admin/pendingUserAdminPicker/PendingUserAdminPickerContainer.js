import React, { useEffect} from "react";
import { connect } from "react-redux";
import { actions as pendingUserAdminPickerActions, selectors as pendingUserAdminPickerSelectors} from "reducers/pendingUserAdminPicker";
import { PendingUserAdminPicker } from "pages/admin/pendingUserAdminPicker/PendingUserAdminPicker"
import {useHistory, useParams} from "react-router-dom";
import moment from "moment";
import {actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/PendingUser";
import * as yup from "yup";

const PendingUserAdminPickerContainer = (props) => {
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
                expirationDatePolicyPersonal: yup.string().nullable().required("Este campo es requerido."),
                vehicle:
                    values.vehicleType === 'motorcycle' &&
                    yup.object({
                        [values.vehicleType]: yup.object({
                            patent: yup.string().nullable().required("Este campo es requerido."),
                            expirationDatePolicyVehicle: yup.string().nullable().required("Este campo es requerido."),
                            expirationDateIdentificationVehicle: yup.string().nullable().required("Este campo es requerido."),
                            expirationDateDriverLicense: yup.string().nullable().required("Este campo es requerido."),
                        })
                    })
            });
        });

    const onSubmit = (values) => {
        let pickerUpdated = {
            ...values,
            dateOfBirth: moment(values.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD")
        }
        props.postPendingUserDocumentsEdit(pickerUpdated);
    };

    return (
        <PendingUserAdminPicker {...props} validationSchema={validationSchema} changePage={changePage} onSubmit={onSubmit}/>
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
    setActualPage:(page)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminPickerContainer);
