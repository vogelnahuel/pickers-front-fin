export const PENDING_USER = "pendingUser/PENDING_USER";


export const types = {
    PENDING_USER_GET_REQUEST: `${PENDING_USER}_GET_REQUEST`,
    PENDING_USER_GET_SUCCESS: `${PENDING_USER}_GET_SUCCESS`,
    PENDING_USER_GET_ERROR: `${PENDING_USER}_GET_ERROR`,
    PENDING_USER_SET_FILTERS: `${PENDING_USER}_SET_FILTER`,
    PENDING_USER_SET_EXTRA_FILTERS:`${PENDING_USER}_SET_EXTRA_FILTER`,
    PENDING_USER_SET_ACTUAL_PAGE: `${PENDING_USER}_SET_ACTUAL_PAGE`,
    
};

export const INITIAL_STATE = {
    fetching: false,
    users: [],
    filters:{},
    filtersExtra:{
        limit: 5,
        offset: 0
    },
    seeMore:true,
    pag:15,
    actualPage:"PENDING",
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
    setActualPage: (page) => ({
        type: types.PENDING_USER_SET_ACTUAL_PAGE,
        page,
    }),
    setPendingUserExtraFilters: (extraFilters) => ({
        type: types.PENDING_USER_SET_EXTRA_FILTERS,
        extraFilters,
    }),
};

export const selectors = {
    isFetching: ({ pendingUser }) => pendingUser,
    getPendingUser: ({ pendingUser }) => pendingUser.users,
    getFilters:({pendingUser}) => pendingUser.filters,
    getFiltersExtra:({pendingUser}) => pendingUser.filtersExtra,
    getSeeMore:({pendingUser}) => pendingUser.seeMore,
    getPag:({pendingUser}) => pendingUser.pag,
    getActualPage:({pendingUser}) => pendingUser.actualPage,
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
                seeMore:!(action.pendingUsers.length<state.filtersExtra.limit)
            };
        case types.PENDING_USER_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
            case types.PENDING_USER_SET_FILTERS:
            return {
                ...state,
                filters: { ...state.filters, ...action.filters },
            };
            case types.PENDING_USER_SET_ACTUAL_PAGE:
                return {
                    ...state,
                    actualPage:action.page,
                };
            case types.PENDING_USER_SET_EXTRA_FILTERS:
                return {
                    ...state,
                    filtersExtra:{ ...state.filtersExtra, ...action.extraFilters },
                };
        default:
            return state;
    }
};

export default reducer;