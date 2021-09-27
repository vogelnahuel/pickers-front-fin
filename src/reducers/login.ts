import {selectorsTypesLogin} from './typesLogin'
import {ActionLoginType} from './typesLogin'


export const types = {
    LOGIN_GET_REQUEST: `LOGIN_GET_REQUEST`,
    LOGIN_GET_SUCCESS: `LOGIN_GET_SUCCESS`,
    LOGIN_GET_ERROR: `LOGIN_GET_ERROR`,

    LOGOUT: `LOGOUT`,
};



export const INITIAL_STATE = {
    fetching: false,
    login: {},
};

export const actions = {
    getLoginRequest: (params:object) => ({
        type: types.LOGIN_GET_REQUEST,
        params
        
    }),
    getLoginSuccess: (login:object) => ({
        type: types.LOGIN_GET_SUCCESS,
        login
    }),
    getLoginError: () => ({
        type: types.LOGIN_GET_ERROR,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),
};

export const selectors = { 
    isFetching: (state:selectorsTypesLogin )  => state.login.fetching ,
    getLogin:   (state:selectorsTypesLogin ) => state.login.login,
};



const reducer =(state = INITIAL_STATE, action:ActionLoginType ) => {
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

        default:
            return state;
    }
};
export default reducer;