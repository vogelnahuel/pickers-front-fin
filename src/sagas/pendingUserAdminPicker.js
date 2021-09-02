import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/pendingUserAdminPicker";
import * as pendingUserAdminPickerMiddleware from "middleware/pendingUserPicker";


import createCSV from "tools/createCSV";

const sagas = [
    takeLatest(types.PENDING_USER_ADMIN_PICKER_GET_REQUEST, getPendingUserPicker),
    takeLatest(types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST, getPendingUserPickerExport),
    takeLatest(types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST, postPendingUserDocumentsEdit)
];

export default sagas;



function* getPendingUserPicker({ params }) {
    const response = yield call(
        pendingUserAdminPickerMiddleware.getPendingUserPicker,
        params
    );
    if (response.status !== 200) {
        yield put(actions.getPendingUserPickerError());
    } else {
        const { result } = response.data;
        yield put(actions.getPendingUserPickerSuccess(result));
    }

}

function* getPendingUserPickerExport({ params }) {
    const response = yield call(
        pendingUserAdminPickerMiddleware.getPendingUserPickerExport,
        params
    );

    if (response.type === "W") {
        yield put(actions.getPendingUserPickerExportError());
    } else {
        createCSV(response)
        yield put(actions.getPendingUserPickerExportSuccess(response));
    }
}


function* postPendingUserDocumentsEdit({ params }) {
    // try {
        const response = yield call(
            pendingUserAdminPickerMiddleware.postPendingUserDocumentsEdit,
            params
        );
        if (response.status !== 200) {
            yield put(actions.getPendingUserPickerDocumentsEditError());
        } else {
            yield put(actions.getPendingUserPickerDocumentsEditSuccess());
        }
    // } catch (error) {
    //     debugger
    //     console.log(error);
    // }

}