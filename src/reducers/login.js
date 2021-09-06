
export const types = {
    LOGIN_GET_REQUEST: `LOGIN_GET_REQUEST`,
    LOGIN_GET_SUCCESS: `LOGIN_GET_SUCCESS`,
    LOGIN_GET_ERROR: `LOGIN_GET_ERROR`,

    LOGOUT: `LOGOUT`,
    LOGIN_SET_MODAL_OPEN: `LOGIN_SET_MODAL_OPEN`,
};



export const INITIAL_STATE = {
    fetching: false,
    modalOpen: false,
    login: {},
};

export const actions = {
    getLoginRequest: (params) => ({
        type: types.LOGIN_GET_REQUEST,
        params
        
    }),
    getLoginSuccess: (login) => ({
        type: types.LOGIN_GET_SUCCESS,
        login
    }),
    getLoginError: () => ({
        type: types.LOGIN_GET_ERROR,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),
    setModalOpen: (modalOpen) => ({
        type: types.LOGIN_SET_MODAL_OPEN,
        modalOpen
    }),
};

export const selectors = {
    isFetching: ({ login }) => login.fetching,
    isModalOpen: ({ login }) => login.modalOpen,
    getLogin: ({ login }) => login.login,
};



const reducer =(state = INITIAL_STATE, action = {}) => {
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
        default:
            return state;
    }
};
export default reducer;