import { call, takeLatest, put } from "redux-saga/effects";
import { types as pickersTypes, actions as pickersActions } from "reducers/pickers";
import { types as detailPickerTypes, actions as detailPickerActions } from "reducers/detailPicker";
import createCSV from "utils/createCSV";
import moment from "moment";
import * as pickersMiddleware from "middleware/pickers";

const sagas = [
    takeLatest(pickersTypes.PENDING_USER_GET_REQUEST, getPendingUser),
    takeLatest(pickersTypes.PENDING_USER_EXPORT_GET_REQUEST, getPendingUserExport),
    takeLatest(pickersTypes.PENDING_USER_GET_MORE_REQUEST, getMorePendingUser),
    takeLatest(detailPickerTypes.PENDING_USER_ADMIN_PICKER_GET_REQUEST, getPendingUserPicker),
    takeLatest(detailPickerTypes.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST, getPendingUserPickerExport),
    takeLatest(detailPickerTypes.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST, postPendingUserDocumentsEdit),
    takeLatest(detailPickerTypes.PICKER_APROVE_POST_REQUEST, postAprovePicker),
    takeLatest(detailPickerTypes.PICKER_EDIT_POST_REQUEST, postEditPicker),
];

export default sagas;

const process = (body) => {
    return {
        ...body,
        dateOfBirth: moment(body.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD"),
        expirationDatePolicyPersonal: moment(body.expirationDatePolicyPersonal, "DD/MM/YYYY").format("YYYY-MM-DD"),
        vehicle: {
            ...body.vehicle,
            [body.vehicleType]: {
                ...body.vehicle[body.vehicleType],
                expirationDatePolicyVehicle: moment(body.vehicle[body.vehicleType].expirationDatePolicyVehicle, "DD/MM/YYYY").format("YYYY-MM-DD"),
                expirationDateIdentificationVehicle: moment(body.vehicle[body.vehicleType].expirationDateIdentificationVehicle, "DD/MM/YYYY").format("YYYY-MM-DD"),
                expirationDateDriverLicense: moment(body.vehicle[body.vehicleType].expirationDateDriverLicense, "DD/MM/YYYY").format("YYYY-MM-DD"),
            }
        }
    };
};

function* getPendingUser({ params }) {
    const response = yield call(
        pickersMiddleware.getPendingUser,
        params
    );
    if (response.status !== 200) {
        yield put(pickersActions.getPendingUserError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(pickersActions.getPendingUserSuccess({ items, limit, offset, hasMore }));
    }
}

function* getMorePendingUser({ params }) {
    const response = yield call(
        pickersMiddleware.getPendingUser,
        params
    );
    if (response.status !== 200) {
        yield put(pickersActions.getPendingUserError());
    } else {
        const { result: {items}, limit, offset, hasMore } = response.data;
        yield put(pickersActions.getMorePendingUserSuccess({ items, limit, offset, hasMore }));
    }
}


function* getPendingUserPicker({ params }) {
    const response = yield call(
        pickersMiddleware.getPendingUserPicker,
        params
    );
    if (response.status !== 200) {
        yield put(detailPickerActions.getPendingUserPickerError());
    } else {
        const { result } = response.data;
        yield put(detailPickerActions.getPendingUserPickerSuccess(result));
    }
}

function* getPendingUserExport({ params }) {
    const response = yield call(
        pickersMiddleware.getPendingUserExport,
        params
    );

    if (response.status !== 200) {
        
        yield put(pickersActions.getPendingUserExportError());
    } 
    else {
        
        createCSV(response)
        yield put(pickersActions.getPendingUserExportSuccess(response));
    }
}

function* getPendingUserPickerExport({ params }) {
    const response = yield call(
        pickersMiddleware.getPendingUserPickerExport,
        params
    );
    if (response.status !== 200) {
        yield put(detailPickerActions.getPendingUserPickerExportError());
    } else {
        createCSV(response)
        yield put(detailPickerActions.getPendingUserPickerExportSuccess(response));
    }
}

function* postPendingUserDocumentsEdit({ params }) {
    let body = process(params);
    const response = yield call(
        pickersMiddleware.postPendingUserDocumentsEdit,
        body
    );
    if (response.status !== 200) {
        yield put(detailPickerActions.getPendingUserPickerDocumentsEditError());
    } else {
        yield put(detailPickerActions.getPendingUserPickerDocumentsEditSuccess(body));
    }
}

function* postAprovePicker({ params }) {
    let body = process(params);
    const response = yield call(
        pickersMiddleware.postAprovePicker,
        body
    );
    if (response.status !== 200) {
        yield put(detailPickerActions.getAprovePickerError());
    } else {
        yield put(detailPickerActions.getAprovePickerSuccess(body));
    }
}

function* postEditPicker({ params }) {
    let body = process(params);
    const response = yield call(
        pickersMiddleware.postEditPicker,
        body
    );
    if (response.status !== 200) {
        yield put(detailPickerActions.getEditPickerError());
    } else {
        yield put(detailPickerActions.getEditPickerSuccess(body));
    }
}