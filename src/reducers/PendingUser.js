export const PENDING_USER = "pendingUser/PENDING_USER";


export const types = {
    PENDING_USER_GET_REQUEST: `${PENDING_USER}_GET_REQUEST`,
    PENDING_USER_GET_SUCCESS: `${PENDING_USER}_GET_SUCCESS`,
    PENDING_USER_GET_ERROR: `${PENDING_USER}_GET_ERROR`,
    PENDING_USER_SET_FILTERS: `${PENDING_USER}_SET_FILTER`,
};

export const INITIAL_STATE = {
    fetching: false,
    users: [],
    filters:{
        limit:5,
    },
};

export const actions = {
    getPendingUserRequest: (params) => ({
        type: types.PENDING_USER_GET_REQUEST,
        params,
    }),
    getPendingUserSuccess: (pendingUsers) => ({
        type: types.PENDING_USER_GET_SUCCESS,
        pendingUsers
    }),
    getPendingUserError: () => ({
        type: types.PENDING_USER_GET_ERROR,
    }),
    setPendingUserFilters: (filters) => ({
        type: types.PENDING_USER_SET_FILTERS,
        filters,
    }),
};

export const selectors = {
    isFetching: ({ pendingUser }) => pendingUser,
    getPendingUser: ({ pendingUser }) => pendingUser.users,
    getFilters:({pendingUser}) => pendingUser.filters,
};

const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.PENDING_USER_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.PENDING_USER_GET_SUCCESS:
            return {
                ...state,
                users: action.pendingUsers,
                fetching: false,
            };
        case types.PENDING_USER_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
            case types.PENDING_USER_SET_FILTERS:
                console.log("PENDING_USER_SET_FILTERS")
            return {
                ...state,
                filters: action.filters
            };
        default:
            return state;
    }
};

export default reducer;