export const PENDING_USER = "pendingUser/PENDING_USER";


export const types = {
    PENDING_USER_GET_REQUEST: `${PENDING_USER}_GET_REQUEST`,
    PENDING_USER_GET_SUCCESS: `${PENDING_USER}_GET_SUCCESS`,
    PENDING_USER_GET_ERROR: `${PENDING_USER}_GET_ERROR`,
};

export const INITIAL_STATE = {
    fetching: false,
    users: [],
};

export const actions = {
    getPendingUserRequest: (params) => ({
        type: types.PENDING_USER_GET_REQUEST,
        params,
    }),
    getPendingUserSuccess: (pendingUsers) => ({
        type: types.PENDING_USER_GET_REQUEST,
        pendingUsers
    }),
    getPendingUserError: () => ({
        type: types.PENDING_USER_GET_REQUEST,
    }),
};

export const selectors = {
    isFetching: ({ pendingUser }) => pendingUser,
    getPendingUser: ({ pendingUser }) => pendingUser.users,
    //getFilters:({transactions}) => transactions.filters,
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
                pendingUsers: action.pendingUsers,
                fetching: false,
            };
        case types.PENDING_USER_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        // case types.TRANSACTIONS_SET_FILTERS:
        //     return {
        //         ...state,
        //         filters:action.filters,
        //     };
        default:
            return state;
    }
};

export default reducer;