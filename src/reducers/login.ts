
export const types = {
    LOGIN_GET_REQUEST: `LOGIN_GET_REQUEST`,
    LOGIN_GET_SUCCESS: `LOGIN_GET_SUCCESS`,
    LOGIN_GET_ERROR: `LOGIN_GET_ERROR`,

    LOGOUT: `LOGOUT`,
    LOGIN_SET_MODAL_OPEN: `LOGIN_SET_MODAL_OPEN`,
    LOGIN_SET_MODAL_SERVER_ERROR_OPEN: `LOGIN_SET_MODAL_SERVER_ERROR_OPEN`,
};



export const INITIAL_STATE = {
    fetching: false,
    modalOpen: false,
    isModalOpenServerError:false,
    login: {},
};

export const actions = {
    getLoginRequest: (params:any) => ({
        type: types.LOGIN_GET_REQUEST,
        params
        
    }),
    getLoginSuccess: (login:any) => ({
        type: types.LOGIN_GET_SUCCESS,
        login
    }),
    getLoginError: () => ({
        type: types.LOGIN_GET_ERROR,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),
    setModalOpen: (modalOpen:any) => ({
        type: types.LOGIN_SET_MODAL_OPEN,
        modalOpen
    }),
    setmodalOpenServerError: (modalOpenServerError:any) => ({
        type: types.LOGIN_SET_MODAL_SERVER_ERROR_OPEN,
        modalOpenServerError
    }),
};

export const selectors = {
    isFetching: ({ login }:any) => login.fetching,
    isModalOpen: ({ login }:any) => login.modalOpen,
    isModalOpenServerError: ({ login }:any) => login.isModalOpenServerError,
    getLogin: ({ login }:any) => login.login,
};



const reducer =(state = INITIAL_STATE, action:any = {}) => {
    switch (action.type) {
        case types.LOGIN_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
            case types.LOGOUT:
            return {
                    ...INITIAL_STATE
                };
        case types.LOGIN_GET_SUCCESS:
            return {
                ...state,
                login: action.login,
                fetching: false,
            };
        case types.LOGIN_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        case types.LOGIN_SET_MODAL_OPEN:
            return {
                ...state,
                modalOpen: action.modalOpen,
            };
            case types.LOGIN_SET_MODAL_SERVER_ERROR_OPEN:
            return {
                ...state,
                isModalOpenServerError: action.modalOpenServerError,
            };
        default:
            return state;
    }
};
export default reducer;