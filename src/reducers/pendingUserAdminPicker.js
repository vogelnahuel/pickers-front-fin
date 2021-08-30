
export const types = {
    PENDING_USER_ADMIN_PICKER_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_GET_ERROR: `PENDING_USER_ADMIN_PICKER_GET_ERROR`,

    PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS`,
    PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR: `PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR`,
};

export const INITIAL_STATE = {
    fetching: false,
    pendingUserAdminPicker: {},
    pendingUserAdminPickerExport:{}
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

};

export const selectors = {
    isFetching: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.fetching,
    getPendingUserPicker: ({ pendingUserAdminPicker }) => pendingUserAdminPicker.pendingUserAdminPicker,
    getPendingUserExportPicker: ({ pendingUserAdminPickerExport }) => pendingUserAdminPickerExport,
};


const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
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

        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST:
                return {
                    ...state,
                    fetching: true,
                };
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS:
                return {
                    ...state,
                    pendingUserAdminPickerExport: action.pendingUserAdminPickerExport,
                    fetching: false,
                };
        case types.PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR:
                return {
                    ...state,
                    fetching: false,
                };

        default:
            return state;
    }
};

export default reducer;