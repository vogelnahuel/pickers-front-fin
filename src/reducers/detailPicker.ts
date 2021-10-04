
export const types:any = {
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

export const INITIAL_STATE = {
    fetching: false,
    dirty: false,
    nameDisplay: "",
    pendingUserAdminPicker: {},
    pendingUserAdminPickerExport:{},
};

export const actions = {
    getPendingUserPickerRequest: (params:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_REQUEST,
        params,
    }),
    getPendingUserPickerSuccess: (pendingUserAdminPicker:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_SUCCESS,
        pendingUserAdminPicker
    }),
    getPendingUserPickerError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_ERROR,
    }),
    setDirty: (dirty:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_SET_DIRTY,
        dirty
    }),
    getPendingUserPickerExportRequest: (params:any,element:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST,
        params,
        element
    }),
    getPendingUserPickerExportSuccess: (pendingUserAdminPickerExport:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS,
        pendingUserAdminPickerExport
    }),
    getPendingUserPickerExportError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR,
    }),
    getPendingUserPickerDocumentsEditRequest: (params:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST,
        params,
    }),
    getPendingUserPickerDocumentsEditSuccess: (body:any) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS,
        body
    }),
    getPendingUserPickerDocumentsEditError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR,
    }),

    getAprovePickerRequest: (params:any, goBack:any) => ({
        type: types.PICKER_APROVE_POST_REQUEST,
        params,
        goBack
    }),
    getAprovePickerSuccess: (body:any) => ({
        type: types.PICKER_APROVE_POST_SUCCESS,
        body
    }),
    getAprovePickerError: () => ({
        type: types.PICKER_APROVE_POST_ERROR,
    }),

    getEditPickerRequest: (params:any, goBack:any) => ({
        type: types.PICKER_EDIT_POST_REQUEST,
        params,
        goBack
    }),
    getEditPickerSuccess: (body:any) => ({
        type: types.PICKER_EDIT_POST_SUCCESS,
        body
    }),
    getEditPickerError: () => ({
        type: types.PICKER_EDIT_POST_ERROR,
    }),

};

export const selectors = {
    isFetching: ({ pendingUserAdminPicker }:any) => pendingUserAdminPicker.fetching,
    isDirty: ({ pendingUserAdminPicker }:any) => pendingUserAdminPicker.dirty,
    getNameDisplay: ({ pendingUserAdminPicker }:any) => pendingUserAdminPicker.nameDisplay,
    getPendingUserPicker: ({ pendingUserAdminPicker }:any) => pendingUserAdminPicker.pendingUserAdminPicker,
};


const reducer =(state = INITIAL_STATE, action:any) => {
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