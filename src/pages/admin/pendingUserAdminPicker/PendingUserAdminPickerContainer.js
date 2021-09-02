import React, { useEffect} from "react";
import { connect } from "react-redux";
import { actions as pendingUserAdminPickerActions, selectors as pendingUserAdminPickerSelectors} from "reducers/pendingUserAdminPicker";
import { PendingUserAdminPicker } from "pages/admin/pendingUserAdminPicker/PendingUserAdminPicker"
import {useParams} from "react-router-dom";
import moment from "moment";

const PendingUserAdminPickerContainer = (props) => {
    const params = useParams();
    useEffect(() => {
        props.getPendingUserPicker(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (values) => {
        let pickerUpdated = {
            ...values,
            dateOfBirth: moment(values.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD")
        }
        props.postPendingUserDocumentsEdit(pickerUpdated);
    };

    return (
        <PendingUserAdminPicker {...props} onSubmit={onSubmit}/>
    );
}


const mapStateToProps = (state) => ({
    pendingUserAdminPicker: pendingUserAdminPickerSelectors.getPendingUserPicker(state),
    modalExportPicker: pendingUserAdminPickerSelectors.getModalExportPicker(state),
    isFetching: pendingUserAdminPickerSelectors.isFetching(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminPickerContainer);
