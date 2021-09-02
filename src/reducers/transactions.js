export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types = {
    TRANSACTIONS_GET_REQUEST: `${TRANSACTIONS}_GET_REQUEST`,
    TRANSACTIONS_GET_MORE_REQUEST: `${TRANSACTIONS}_GET_MORE_REQUEST`,
    TRANSACTIONS_GET_SUCCESS: `${TRANSACTIONS}_GET_SUCCESS`,
    TRANSACTIONS_GET_MORE_SUCCESS: `${TRANSACTIONS}_GET_MORE_SUCCESS`,

    
    TRANSACTIONS_GET_ERROR: `${TRANSACTIONS}_GET_ERROR`,
    TRANSACTIONS_EXPORT_REQUEST: `${TRANSACTIONS}_EXPORT_REQUEST`,
    TRANSACTIONS_EXPORT_SUCCESS: `${TRANSACTIONS}_EXPORT_SUCCESS`,
    TRANSACTIONS_EXPORT_ERROR: `${TRANSACTIONS}_EXPORT_ERROR`,
    TRANSACTIONS_SET_FILTERS: `${TRANSACTIONS}_SET_FILTERS`,
    TRANSACTIONS_EXPORT_ENABLED: `${TRANSACTIONS}_EXPORT_ENABLED`,
    TRANSACTIONS_CLOSE_EXPORT_MODAL: `${TRANSACTIONS}_CLOSE_EXPORT_MODAL`,
    TRANSACTIONS_RESET: `${TRANSACTIONS}_RESET`,
};

export const INITIAL_STATE = {
    fetching: false,
    exportDisabled: true,
    transactions: [],
    openExportModal: false,
    filters: {},
    filtersExtra:{
        limit: 5,
        offset: 0
    },
    filtersExtraSeeMore: {
        limit:15,
        offset: 0
    }
};

export const actions = {
    reset: () => ({
        type: types.TRANSACTIONS_RESET
    }),
    getTransactionsRequest: (params) => ({
        type: types.TRANSACTIONS_GET_REQUEST,
        params,
    }),
    getMoreTransactionsRequest: (params) => ({
        type: types.TRANSACTIONS_GET_MORE_REQUEST,
        params,
    }),
    getTransactionsSuccess: (transactions) => ({
        type: types.TRANSACTIONS_GET_SUCCESS,
        transactions
    }),
    getMoreTransactionsSuccess: (transactions) => ({
        type: types.TRANSACTIONS_GET_MORE_SUCCESS,
        transactions
    }),
    getTransactionsError: () => ({
        type: types.TRANSACTIONS_GET_ERROR,
    }),
    setTransactionFilters: (filters) => ({
        type: types.TRANSACTIONS_SET_FILTERS,
        filters
    }),
    setExportEnabled: (enabled) => ({
        type: types.TRANSACTIONS_EXPORT_ENABLED,
        enabled
    }),
    getCloseExportModal: () => ({
        type: types.TRANSACTIONS_CLOSE_EXPORT_MODAL,
    }),
    getTransactionsExportRequest: (params) => ({
        type: types.TRANSACTIONS_EXPORT_REQUEST,
        params
    }),
    getTransactionsExportSuccess: () => ({
        type: types.TRANSACTIONS_EXPORT_SUCCESS,
    }),
    getTransactionsExportError: () => ({
        type: types.TRANSACTIONS_EXPORT_ERROR,
    }),
};

export const selectors = {
    isFetching: ({ transactions }) => transactions.fetching,
    isExportDisabled: ({ transactions }) => transactions.exportDisabled,
    getTransactions: ({ transactions }) => transactions.transactions,
    getFilters:({transactions}) => transactions.filters,
    getFiltersExtra:({transactions}) => transactions.filtersExtra,
    getFiltersExtraSeeMore:({transactions}) => transactions.filtersExtraSeeMore,
    getOpenExportModal:({transactions}) => transactions.openExportModal,
};


const reducer =(state = INITIAL_STATE, action = {}) => {
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
                filters: { ...state.filters, ...action.filters },
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
                openExportModal: true,
                fetching: false,
            };
        case types.TRANSACTIONS_EXPORT_ERROR:
            return {
                ...state,
                fetching: false,
            };
        case types.TRANSACTIONS_CLOSE_EXPORT_MODAL:
            return {
                ...state,
                openExportModal: false,
            };
        default:
            return state;
    }
};

export default reducer;