import { paramsTypeGetTransaction } from "sagas/types/transactions";
import { RootState } from "store";
import { actionTransactionType, getTransactionsSuccessType, InicialStateType, setFilterExtraType, setFilterType, transactionsTypes } from "./types/transaction";

export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types:transactionsTypes = {
    TRANSACTIONS_GET_REQUEST: `${TRANSACTIONS}_GET_REQUEST`,
    TRANSACTIONS_GET_MORE_REQUEST: `${TRANSACTIONS}_GET_MORE_REQUEST`,
    TRANSACTIONS_GET_SUCCESS: `${TRANSACTIONS}_GET_SUCCESS`,
    TRANSACTIONS_GET_MORE_SUCCESS: `${TRANSACTIONS}_GET_MORE_SUCCESS`,
    TRANSACTIONS_SET_EXTRA_FILTERS: `${TRANSACTIONS}_SET_EXTRA_FILTERS`,

    TRANSACTIONS_GET_ERROR: `${TRANSACTIONS}_GET_ERROR`,
    TRANSACTIONS_EXPORT_REQUEST: `${TRANSACTIONS}_EXPORT_REQUEST`,
    TRANSACTIONS_EXPORT_SUCCESS: `${TRANSACTIONS}_EXPORT_SUCCESS`,
    TRANSACTIONS_EXPORT_ERROR: `${TRANSACTIONS}_EXPORT_ERROR`,
    TRANSACTIONS_SET_FILTERS: `${TRANSACTIONS}_SET_FILTERS`,
    TRANSACTIONS_EXPORT_ENABLED: `${TRANSACTIONS}_EXPORT_ENABLED`,
    TRANSACTIONS_RESET: `${TRANSACTIONS}_RESET`,
};

export const INITIAL_STATE:InicialStateType = {
    fetching: false,
    exportDisabled: true,
    transactions: [],
    filters: {},
    filtersExtra:{
        limit: 3,
        offset: 0
    },
    filtersExtraSeeMore: {
        limit:15,
        offset: 0
    },
    seeMore:true,
};

export const actions:actionTransactionType = {
    reset: () => ({
        type: types.TRANSACTIONS_RESET
    }),
    getTransactionsRequest: (params:paramsTypeGetTransaction) => ({
        type: types.TRANSACTIONS_GET_REQUEST,
        params,
    }),
    getMoreTransactionsRequest: (params:paramsTypeGetTransaction) => ({
        type: types.TRANSACTIONS_GET_MORE_REQUEST,
        params,
    }),
    getTransactionsSuccess: (transactions:getTransactionsSuccessType) => ({
        type: types.TRANSACTIONS_GET_SUCCESS,
        transactions
    }),
    getMoreTransactionsSuccess: (transactions:getTransactionsSuccessType) => ({
        type: types.TRANSACTIONS_GET_MORE_SUCCESS,
        transactions
    }),
    getTransactionsError: () => ({
        type: types.TRANSACTIONS_GET_ERROR,
    }),
    setTransactionFilters: (filters:setFilterType) => ({
        type: types.TRANSACTIONS_SET_FILTERS,
        filters
    }),
    setTransactionExtraFilters: (filtersExtra:setFilterExtraType) => ({
        type: types.TRANSACTIONS_SET_EXTRA_FILTERS,
        filtersExtra
    }),
    setExportEnabled: (enabled:string | number | undefined) => ({
        type: types.TRANSACTIONS_EXPORT_ENABLED,
        enabled
    }),
    getTransactionsExportRequest: (params:paramsTypeGetTransaction,element:HTMLElement) => ({
        type: types.TRANSACTIONS_EXPORT_REQUEST,
        params,
        element
    }),
    getTransactionsExportSuccess: () => ({
        type: types.TRANSACTIONS_EXPORT_SUCCESS,
    }),
    getTransactionsExportError: () => ({
        type: types.TRANSACTIONS_EXPORT_ERROR,
    }),
};

export const selectors = {
    isFetching: ({ transactions }:RootState) => transactions.fetching,
    isExportDisabled: ({ transactions }:RootState) => transactions.exportDisabled,
    getTransactions: ({ transactions }:RootState) => transactions.transactions,
    getFilters:({transactions}:RootState) => transactions.filters,
    getFiltersExtra:({transactions}:RootState) => transactions.filtersExtra,
    getSeeMore:({transactions}:RootState) => transactions.seeMore,
    getFiltersExtraSeeMore:({transactions}:RootState) => transactions.filtersExtraSeeMore,
};


const reducer =(state:InicialStateType = INITIAL_STATE, action:any = {}) => {
    switch (action.type) {
        case types.TRANSACTIONS_RESET:
            return {
                ...INITIAL_STATE,
            };
        case types.TRANSACTIONS_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.TRANSACTIONS_GET_SUCCESS:
            return {
                ...state,
                transactions: action.transactions.items,
                seeMore: action.transactions.hasMore,
                filtersExtraSeeMore: {
                    ...state.filtersExtraSeeMore,
                    offset: action.transactions.offset + action.transactions.limit
                },
                fetching: false,
            };
        case types.TRANSACTIONS_GET_MORE_SUCCESS:
            return {
                ...state,
                transactions: state.transactions.concat(action.transactions.items),
                seeMore: action.transactions.hasMore,
                filtersExtraSeeMore: {
                    ...state.filtersExtraSeeMore,
                    offset: action.transactions.offset + action.transactions.limit
                },
                fetching: false,
            };
        case types.TRANSACTIONS_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        case types.TRANSACTIONS_SET_FILTERS:
            return {
                ...state,
                filters: action.filters,
            };
        case types.TRANSACTIONS_SET_EXTRA_FILTERS:
            return {
                ...state,
                filtersExtra: { ...state.filtersExtra, ...action.filtersExtra },
            };
        case types.TRANSACTIONS_EXPORT_ENABLED:
            return {
                ...state,
                exportDisabled: action.enabled === undefined,
            };
        case types.TRANSACTIONS_EXPORT_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.TRANSACTIONS_EXPORT_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case types.TRANSACTIONS_EXPORT_ERROR:
            return {
                ...state,
                fetching: false,
            };
        default:
            return state;
    }
};

export default reducer;