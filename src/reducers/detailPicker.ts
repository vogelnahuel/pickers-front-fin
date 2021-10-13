import { PickerType, EditPickerResponseType, ParamsMiddlewareType, PickersExportResponseType } from "pages/pickers/types";
import { ParamGetPendingUser } from "sagas/types/pickers";
import { RootState } from "store";
import { ActionType, SelectorType, DetailPickerStateType, DetailPickerTypes, actionType } from "./types/detailPicker";

export const types:DetailPickerTypes = {
    PENDING_USER_ADMIN_PICKER_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_GET_ERROR: `PENDING_USER_ADMIN_PICKER_GET_ERROR`,

    PENDING_USER_ADMIN_PICKER_SET_DIRTY: `PENDING_USER_ADMIN_PICKER_SET_DIRTY`,

    PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR`,

    PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST: `PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST`,
    PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS: `PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR: `PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR`,

    PICKER_EDIT_POST_REQUEST: `PICKER_EDIT_POST_REQUEST`,
    PICKER_EDIT_POST_SUCCESS: `PICKER_EDIT_POST_SUCCESS`,
    PICKER_EDIT_POST_ERROR: `PICKER_EDIT_POST_ERROR`,

    PICKER_APROVE_POST_REQUEST: `PICKER_APROVE_POST_REQUEST`,
    PICKER_APROVE_POST_SUCCESS: `PICKER_APROVE_POST_SUCCESS`,
    PICKER_APROVE_POST_ERROR: `PICKER_APROVE_POST_ERROR`,
};

export const INITIAL_STATE:DetailPickerStateType = {
    fetching: false,
    dirty: false,
    nameDisplay: "",
    pendingUserAdminPicker: {},
};

export const actions:ActionType = {
    getPendingUserPickerRequest: (params:ParamGetPendingUser) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_REQUEST,
        params,
    }),
    getPendingUserPickerSuccess: (pendingUserAdminPicker:PickerType) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_SUCCESS,
        pendingUserAdminPicker
    }),
    getPendingUserPickerError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_ERROR,
    }),
    setDirty: (dirty:boolean) => ({
        type: types.PENDING_USER_ADMIN_PICKER_SET_DIRTY,
        dirty
    }),
    getPendingUserPickerExportRequest: (params:ParamsMiddlewareType,element:HTMLElement) => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST,
        params,
        element
    }),
    getPendingUserPickerExportSuccess: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS,
    }),
    getPendingUserPickerExportError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR,
    }),
    getPendingUserPickerDocumentsEditRequest: (params:PickerType) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST,
        params,
    }),
    getPendingUserPickerDocumentsEditSuccess: (body:EditPickerResponseType) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS,
        body
    }),
    getPendingUserPickerDocumentsEditError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR,
    }),

    getAprovePickerRequest: (params:PickerType, goBack:Function) => ({
        type: types.PICKER_APROVE_POST_REQUEST,
        params,
        goBack
    }),
    getAprovePickerSuccess: (body:EditPickerResponseType) => ({
        type: types.PICKER_APROVE_POST_SUCCESS,
        body
    }),
    getAprovePickerError: () => ({
        type: types.PICKER_APROVE_POST_ERROR,
    }),

    getEditPickerRequest: (params:PickerType, goBack:Function) => ({
        type: types.PICKER_EDIT_POST_REQUEST,
        params,
        goBack
    }),
    getEditPickerSuccess: (body:PickerType) => ({
        type: types.PICKER_EDIT_POST_SUCCESS,
        body
    }),
    getEditPickerError: () => ({
        type: types.PICKER_EDIT_POST_ERROR,
    }),

};

export const selectors:SelectorType = {
    isFetching: ({ pendingUserAdminPicker }:RootState) => pendingUserAdminPicker.fetching,
    isDirty: ({ pendingUserAdminPicker }:RootState) => pendingUserAdminPicker.dirty,
    getNameDisplay: ({ pendingUserAdminPicker }:RootState) => pendingUserAdminPicker.nameDisplay,
    getPendingUserPicker: ({ pendingUserAdminPicker }:RootState) => pendingUserAdminPicker.pendingUserAdminPicker,
};


const reducer =(state:DetailPickerStateType = INITIAL_STATE, action:actionType) => {
    switch (action.type) {
        /************************************************************* */
        case types.PENDING_USER_ADMIN_PICKER_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.PENDING_USER_ADMIN_PICKER_SET_DIRTY:
            return {
                ...state,
                dirty: action.dirty,
            };
        case types.PENDING_USER_ADMIN_PICKER_GET_SUCCESS:
            return {
                ...state,
                pendingUserAdminPicker: action.pendingUserAdminPicker,
                nameDisplay: `${action.pendingUserAdminPicker.name} ${action.pendingUserAdminPicker.surname}`,
                fetching: false,
            };
        case types.PENDING_USER_ADMIN_PICKER_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        /************************************************************* */
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST:
            return {
                ...state,
                fetching: true,

            };
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        /************************************************************* */
        case types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST:
            return {
                ...state,
                fetching: true,
                pendingUserAdminPicker: action.params
            };
        case types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS:
            return {
                ...state,
                pendingUserAdminPicker: action.body,
                fetching: false,
            };
        case types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR:
            return{
                ...state,
                fetching:false
            };
        /************************************************************* */
        case types.PICKER_APROVE_POST_REQUEST:
            return {
                ...state,
                pendingUserAdminPicker: action.params,
                fetching: true,
            };
        case types.PICKER_APROVE_POST_SUCCESS:
            return {
                ...state,
                pendingUserAdminPicker: action.body,
                fetching: false,
            };
        case types.PICKER_APROVE_POST_ERROR:
            return{
                ...state,
                fetching:false
            };
        /************************************************************* */
        case types.PICKER_EDIT_POST_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.PICKER_EDIT_POST_SUCCESS:
            return {
                ...state,
                pendingUserAdminPicker: action.body,
                fetching: false,
            };
        case types.PICKER_EDIT_POST_ERROR:
            return{
                ...state,
                fetching:false
            };
        default:
            return state;
    }
};

export default reducer;