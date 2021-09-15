
export const types = {
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
    pendingUserAdminPicker: {},
    pendingUserAdminPickerExport:{},
};

export const actions = {
    getPendingUserPickerRequest: (params) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_REQUEST,
        params,
    }),
    getPendingUserPickerSuccess: (pendingUserAdminPicker) => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_SUCCESS,
        pendingUserAdminPicker
    }),
    getPendingUserPickerError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_GET_ERROR,
    }),
    setDirty: (dirty) => ({
        type: types.PENDING_USER_ADMIN_PICKER_SET_DIRTY,
        dirty
    }),
    getPendingUserPickerExportRequest: (params) => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST,
        params,
    }),
    getPendingUserPickerExportSuccess: (pendingUserAdminPickerExport) => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS,
        pendingUserAdminPickerExport
    }),
    getPendingUserPickerExportError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR,
    }),
    getPendingUserPickerDocumentsEditRequest: (params) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST,
        params,
    }),
    getPendingUserPickerDocumentsEditSuccess: (body) => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS,
        body
    }),
    getPendingUserPickerDocumentsEditError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR,
    }),

    getAprovePickerRequest: (params, goBack) => ({
        type: types.PICKER_APROVE_POST_REQUEST,
        params,
        goBack
    }),
    getAprovePickerSuccess: (body) => ({
        type: types.PICKER_APROVE_POST_SUCCESS,
        body
    }),
    getAprovePickerError: () => ({
        type: types.PICKER_APROVE_POST_ERROR,
    }),

    getEditPickerRequest: (params, goBack) => ({
        type: types.PICKER_EDIT_POST_REQUEST,
        params,
        goBack
    }),
    getEditPickerSuccess: (body) => ({
        type: types.PICKER_EDIT_POST_SUCCESS,
        body
    }),
    getEditPickerError: () => ({
        type: types.PICKER_EDIT_POST_ERROR,
    }),

};

export const selectors = {
    isFetching: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.fetching,
    isDirty: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.dirty,
    getPendingUserPicker: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.pendingUserAdminPicker,
};


const reducer =(state = INITIAL_STATE, action = {}) => {
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