import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/pendingUserAdminPicker";
import * as pendingUserAdminPickerMiddleware from "middleware/pendingUserPicker";

import moment from "moment";
import createCSV from "tools/createCSV";

const sagas = [
    takeLatest(types.PENDING_USER_ADMIN_PICKER_GET_REQUEST, getPendingUserPicker),
    takeLatest(types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST, getPendingUserPickerExport)
];

export default sagas;



function* getPendingUserPicker({ params }) {
    const response = yield call(
        pendingUserAdminPickerMiddleware.getPendingUserPicker,
        params
    );
    if (response.type === "W") {
        yield put(actions.getPendingUserPickerError());
    } else {
        const { result } = response.data;
        yield put(actions.getPendingUserPickerSuccess(result));
    }

}

function* getPendingUserPickerExport({ params }) {

    console.log("sagas-export");
    console.log(params);

    
    const response = yield call(
        pendingUserAdminPickerMiddleware.getPendingUserPickerExport,
        params
    );

    
    if (response.type === "W") {
        yield put(actions.getPendingUserPickerExportError());
    } else {
        console.log(response)
        createCSV(response)
        yield put(actions.getPendingUserPickerExportSuccess(response));
    }
    
   
}