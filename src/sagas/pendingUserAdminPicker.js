import { call, takeLatest, put } from "redux-saga/effects";
import { types, actions } from "reducers/pendingUserAdminPicker";
import * as pendingUserAdminPickerMiddleware from "middleware/pendingUserPicker";

import moment from "moment";

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
        console.log(result)

        response.data.result.accountingData.fiscalNumber=response.data.result.accountingData.fiscalNumber.slice(0,-9)+" - "+response.data.result.accountingData.fiscalNumber.slice(2,-1)+" - "+response.data.result.accountingData.fiscalNumber.slice(10)
        response.data.result.dateOfBirth=response.data.result.dateOfBirth?moment(response.data.result.dateOfBirth).format('DD/MM/YYYY'):response.data.result.dateOfBirth
       
        if(response.data.result.vehicleType === "motorcycle"){
           response.data.result.vehicle.motorcycle.expirationDateDriverLicense=response.data.result.vehicle.motorcycle.expirationDateDriverLicense?moment(response.data.result.vehicle.motorcycle.expirationDateDriverLicense).format('DD/MM/YYYY'):response.data.result.vehicle.motorcycle.expirationDateDriverLicense
            response.data.result.vehicle.motorcycle.expirationDateIdentificationVehicle=response.data.result.vehicle.motorcycle.expirationDateIdentificationVehicle?moment(response.data.result.vehicle.motorcycle.expirationDateIdentificationVehicle).format('DD/MM/YYYY'):response.data.result.vehicle.motorcycle.expirationDateIdentificationVehicle
            response.data.result.expirationDatePolicyPersonal=response.data.result.expirationDatePolicyPersonal?moment(response.data.result.expirationDatePolicyPersonal).format('DD/MM/YYYY'):response.data.result.expirationDatePolicyPersonal
            response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle=response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle?moment(response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle).format('DD/MM/YYYY'):response.data.result.vehicle.motorcycle.sexpirationDatePolicyVehicle
        }
        if(response.data.result.vehicleType === "bicycle"){
            response.data.result.vehicle.motorcycle.expirationDateDriverLicense=response.data.result.vehicle.motorcycle.expirationDateDriverLicense?moment(response.data.result.vehicle.motorcycle.expirationDateDriverLicense).format('DD/MM/YYYY'):response.data.result.vehicle.motorcycle.expirationDateDriverLicense
             response.data.result.expirationDatePolicyPersonal=response.data.result.expirationDatePolicyPersonal?moment(response.data.result.expirationDatePolicyPersonal).format('DD/MM/YYYY'):response.data.result.expirationDatePolicyPersonal
             response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle=response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle?moment(response.data.result.vehicle.motorcycle.expirationDatePolicyVehicle).format('DD/MM/YYYY'):response.data.result.vehicle.motorcycle.sexpirationDatePolicyVehicle
         }
        
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
        yield put(actions.getPendingUserPickerExportSuccess(response));
    }

}