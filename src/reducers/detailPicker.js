
export const types = {
    PENDING_USER_ADMIN_PICKER_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_GET_ERROR: `PENDING_USER_ADMIN_PICKER_GET_ERROR`,

    PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR`,

    PENDING_USER_ADMIN_PICKER_MODAL_EXPORT_CLOSE: `PENDING_USER_ADMIN_PICKER_MODAL_EXPORT_CLOSE`,

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
    modalExportPicker:false,
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


    getPendingUserPickerExportCloseModal: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_MODAL_EXPORT_CLOSE,
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

    getAprovePickerRequest: (params) => ({
        type: types.PICKER_APROVE_POST_REQUEST,
        params,
    }),
    getAprovePickerSuccess: (body) => ({
        type: types.PICKER_APROVE_POST_SUCCESS,
        body
    }),
    getAprovePickerError: () => ({
        type: types.PICKER_APROVE_POST_ERROR,
    }),

    getEditPickerRequest: (params) => ({
        type: types.PICKER_EDIT_POST_REQUEST,
        params,
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
    getModalExportPicker: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.modalExportPicker,
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
                modalExportPicker:true
            };
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        /************************************************************* */
        case types.PENDING_USER_ADMIN_PICKER_MODAL_EXPORT_CLOSE:
            return{
                ...state,
                modalExportPicker:false
            };
        /************************************************************* */
        case types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST:
            return {
                ...state,
                fetching: true,
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