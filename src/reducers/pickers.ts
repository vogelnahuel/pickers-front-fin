import {  ParamsTypeMiddleware, PickersParamsType, PickersResponse } from "../pages/pickers/types";
import {  PickersTypes, StateType } from "./types/pickeres";

export const PENDING_USER = "pendingUser/PENDING_USER";


export const types:PickersTypes = {
    PENDING_USER_GET_REQUEST: `${PENDING_USER}_GET_REQUEST`,
    PENDING_USER_GET_SUCCESS: `${PENDING_USER}_GET_SUCCESS`,
    PENDING_USER_GET_ERROR: `${PENDING_USER}_GET_ERROR`,
    PENDING_USER_SET_FILTERS: `${PENDING_USER}_SET_FILTER`,
    PENDING_USER_SET_EXTRA_FILTERS: `${PENDING_USER}_SET_EXTRA_FILTER`,
    PENDING_USER_SET_ACTUAL_PAGE: `${PENDING_USER}_SET_ACTUAL_PAGE`,


    PENDING_USER_EXPORT_GET_REQUEST: `${PENDING_USER}_EXPORT_GET_REQUEST`,
    PENDING_USER_EXPORT_GET_SUCCESS: `${PENDING_USER}_EXPORT_GET_SUCCESS`,
    PENDING_USER_EXPORT_GET_ERROR: `${PENDING_USER}_EXPORT_GET_ERROR`,


    PENDING_USER_GET_MORE_REQUEST: `${PENDING_USER}_GET_MORE_REQUEST`,
    PENDING_USER_GET_MORE_SUCCESS: `${PENDING_USER}_GET_MORE_SUCCESS`,
    PENDING_USER_GET_MORE_ERROR: `${PENDING_USER}_GET_MORE_ERROR`,

    PENDING_USER_RESET: `${PENDING_USER}_RESET`,

};

export const INITIAL_STATE:StateType = {
    fetching: false,
    users: [],
    filters: {},
    filtersExtra: {
        limit: 5,
        offset: 0
    },
    filtersExtraSeeMore: {
        limit: 15,
        offset: 0
    },
    seeMore: true,
    pag: 15,
    actualPage: "PENDING",
};

export const actions = {
    reset: () => ({
        type: types.PENDING_USER_RESET
    }),
    getPendingUserRequest: (params:ParamsTypeMiddleware) => ({
        type: types.PENDING_USER_GET_REQUEST,
        params,
    }),
    getPendingUserSuccess: (pendingUsers:PickersResponse) => ({
        type: types.PENDING_USER_GET_SUCCESS,
        pendingUsers
    }),
    getPendingUserError: () => ({
        type: types.PENDING_USER_GET_ERROR,
    }),
    setPendingUserFilters: (filters:PickersParamsType) => ({
        type: types.PENDING_USER_SET_FILTERS,
        filters,
    }),
    setActualPage: (page:String) => ({
        type: types.PENDING_USER_SET_ACTUAL_PAGE,
        page,
    }),
    setPendingUserExtraFilters: (extraFilters:PickersParamsType) => ({
        type: types.PENDING_USER_SET_EXTRA_FILTERS,
        extraFilters,
    }),
    getMorePendingUserRequest: (params:ParamsTypeMiddleware) => ({
        type: types.PENDING_USER_GET_MORE_REQUEST,
        params,
    }),
    getMorePendingUserSuccess: (pendingUsers:PickersResponse) => ({
        type: types.PENDING_USER_GET_MORE_SUCCESS,
        pendingUsers
    }),
    getMorePendingUserError: () => ({
        type: types.PENDING_USER_GET_MORE_ERROR,
    }),

    getPendingUserExportRequest: (params:ParamsTypeMiddleware, element:HTMLElement) => ({
        type: types.PENDING_USER_EXPORT_GET_REQUEST,
        params,
        element
    }),
    getPendingUserExportSuccess: (params:PickersParamsType) => ({
        type: types.PENDING_USER_EXPORT_GET_SUCCESS,
        params,
    }),
    getPendingUserExportError: (params?:PickersParamsType) => ({
        type: types.PENDING_USER_EXPORT_GET_ERROR,
        params,
    }),

};

export const selectors = {
    isFetching: ({ pendingUser }:any) => pendingUser.fetching,
    getPendingUser: ({ pendingUser }:any) => pendingUser.users,
    getFilters: ({ pendingUser }:any) => pendingUser.filters,
    getFiltersExtra: ({ pendingUser }:any) => pendingUser.filtersExtra,
    getFiltersExtraSeeMore: ({ pendingUser }:any) => pendingUser.filtersExtraSeeMore,
    getSeeMore: ({ pendingUser }:any) => pendingUser.seeMore,
    getPag: ({ pendingUser }:any) => pendingUser.pag,
    getActualPage: ({ pendingUser }:any) => pendingUser.actualPage,
};

const reducer = (state:any = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case types.PENDING_USER_RESET:
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
                seeMore: action.pendingUsers.hasMore,
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
                filters: action.filters,
            };
        case types.PENDING_USER_SET_ACTUAL_PAGE:
            return {
                ...state,
                users: [],
                actualPage: action.page,
            };
        case types.PENDING_USER_SET_EXTRA_FILTERS:
            return {
                ...state,
                filtersExtra: { ...state.filtersExtra, ...action.extraFilters },
            };

        case types.PENDING_USER_GET_MORE_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.PENDING_USER_GET_MORE_SUCCESS:
            return {
                ...state,
                users: state.users.concat(action.pendingUsers.items),
                filtersExtraSeeMore: {
                    ...state.filtersExtraSeeMore,
                    offset: action.pendingUsers.offset + action.pendingUsers.limit
                },
                fetching: false,
                seeMore: action.pendingUsers.hasMore,
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