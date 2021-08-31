
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
    getPendingUserPickerDocumentsEditSuccess: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS,
    }),
    getPendingUserPickerDocumentsEditError: () => ({
        type: types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR,
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
                    fetching: false,
                };
        case types.PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR:
            return{
                ...state,
                modalExportPicker:false
            };


        default:
            return state;
    }
};

export default reducer;