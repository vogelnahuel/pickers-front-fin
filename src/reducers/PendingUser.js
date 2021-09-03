export const PENDING_USER = "pendingUser/PENDING_USER";


export const types = {
    PENDING_USER_GET_REQUEST: `${PENDING_USER}_GET_REQUEST`,
    PENDING_USER_GET_SUCCESS: `${PENDING_USER}_GET_SUCCESS`,
    PENDING_USER_GET_ERROR: `${PENDING_USER}_GET_ERROR`,
    PENDING_USER_SET_FILTERS: `${PENDING_USER}_SET_FILTER`,
    PENDING_USER_SET_EXTRA_FILTERS:`${PENDING_USER}_SET_EXTRA_FILTER`,
    PENDING_USER_SET_ACTUAL_PAGE: `${PENDING_USER}_SET_ACTUAL_PAGE`,


    PENDING_USER_EXPORT_GET_REQUEST: `${PENDING_USER}_EXPORT_GET_REQUEST`,
    PENDING_USER_EXPORT_GET_SUCCESS: `${PENDING_USER}_EXPORT_GET_SUCCESS`,
    PENDING_USER_EXPORT_GET_ERROR: `${PENDING_USER}_EXPORT_GET_ERROR`,


    PENDING_USER_GET_MORE_REQUEST: `${PENDING_USER}_GET_MORE_REQUEST`,
    PENDING_USER_GET_MORE_SUCCESS: `${PENDING_USER}_GET_MORE_SUCCESS`,
    PENDING_USER_GET_MORE_ERROR: `${PENDING_USER}_GET_MORE_ERROR`,

    PENDING_USER_RESET: `${PENDING_USER}_RESET`,

};

export const INITIAL_STATE = {
    fetching: false,
    users: [],
    filters:{},
    filtersExtra:{
        limit: 5,
        offset: 0
    },
    filtersExtraSeeMore: {
        limit:15,
        offset: 0
    },
    seeMore:true,
    pag:15,
    actualPage:"PENDING",
    modalExportPicker:false,
};

export const actions = {
    reset: () => ({
        type: types.PENDING_USER_RESET
    }),
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



    getMorePendingUserRequest: (params) => ({
        type: types.PENDING_USER_GET_MORE_REQUEST,
        params,
    }),
    getMorePendingUserSuccess: (pendingUsers) => ({
        type: types.PENDING_USER_GET_MORE_SUCCESS,
        pendingUsers
    }),
    getMorePendingUserError: () => ({
        type: types.PENDING_USER_GET_MORE_ERROR,
    }),



    getPendingUserExportRequest: (params) => ({
        type: types.PENDING_USER_EXPORT_GET_REQUEST,
        params,
    }),

};

export const selectors = {
    isFetching: ({ pendingUser }) => pendingUser.fetching,
    getPendingUser: ({ pendingUser }) => pendingUser.users,
    getFilters:({pendingUser}) => pendingUser.filters,
    getFiltersExtra:({pendingUser}) => pendingUser.filtersExtra,
    getFiltersExtraSeeMore:({pendingUser}) => pendingUser.filtersExtraSeeMore,
    getSeeMore:({pendingUser}) => pendingUser.seeMore,
    getPag:({pendingUser}) => pendingUser.pag,
    getActualPage:({pendingUser}) => pendingUser.actualPage,
    getModalExport:({pendingUser})=> pendingUser.modalExportPicker
    //getMorePendingUserRequest:({pendingUser})=> pendingUser.getMore
};

const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.PENDING_USER_RESET:
            console.log("reset")
            return {
                ...INITIAL_STATE,
            };
        case types.PENDING_USER_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.PENDING_USER_GET_SUCCESS:
            return {
                ...state,
                users: action.pendingUsers.items,
                fetching: false,
                seeMore:action.pendingUsers.hasMore,
                filtersExtraSeeMore: {
                    ...state.filtersExtraSeeMore,
                    offset: action.pendingUsers.offset + action.pendingUsers.limit
                },
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
            
            
            case types.PENDING_USER_GET_MORE_REQUEST:
                return {
                    ...state,
                    fetching: true,
                };
            case types.PENDING_USER_GET_MORE_SUCCESS:
                console.log("Load more",action.pendingUsers.offset, action.pendingUsers.limit)
                debugger
                return {
                    ...state,
                    users: state.users.concat(action.pendingUsers.items),
                    filtersExtraSeeMore: {
                        ...state.filtersExtraSeeMore,
                        offset: action.pendingUsers.offset + action.pendingUsers.limit
                    },
                    fetching: false,
                    seeMore:action.pendingUsers.hasMore,
                };
            case types.PENDING_USER_GET_MORE_ERROR:
                return {
                    ...state,
                    fetching: false,
                };
            

            case types.PENDING_USER_EXPORT_GET_REQUEST:
                return {
                    ...state,
                    fetching: true,
                    
                };
        case types.PENDING_USER_EXPORT_GET_SUCCESS:
                return {
                    ...state,
                    fetching: false,
                    modalExportPicker:true
                };
        case types.PENDING_USER_EXPORT_GET_ERROR:
                return {
                    ...state,
                    fetching: false,
                };
        default:
            return state;
    }
};

export default reducer;