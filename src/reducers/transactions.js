export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types = {
    TRANSACTIONS_GET_REQUEST: `${TRANSACTIONS}_GET_REQUEST`,
    TRANSACTIONS_GET_SUCCESS: `${TRANSACTIONS}_GET_SUCCESS`,
    TRANSACTIONS_GET_ERROR: `${TRANSACTIONS}_GET_ERROR`,
    TRANSACTIONS_SET_FILTERS: `${TRANSACTIONS}_SET_FILTERS`,
    TRANSACTIONS_EXPORT_ENABLED: `${TRANSACTIONS}_EXPORT_ENABLED`,
    TRANSACTIONS_RESET: `${TRANSACTIONS}_RESET`,
};

export const INITIAL_STATE = {
    fetching: false,
    exportDisabled: true,
    transactions: [],
    filters: {},
    filtersExtra:{
        limit: 5,
        offset: 0
    },
};

export const actions = {
    reset: () => ({
        type: types.TRANSACTIONS_RESET
    }),
    getTransactionsRequest: (params) => ({
        type: types.TRANSACTIONS_GET_REQUEST,
        params,
    }),
    getTransactionsSuccess: (transactions) => ({
        type: types.TRANSACTIONS_GET_SUCCESS,
        transactions
    }),
    getTransactionsError: () => ({
        type: types.TRANSACTIONS_GET_ERROR,
    }),
    setTransactionFilters: (filters) => ({
        type: types.TRANSACTIONS_SET_FILTERS,
        filters
    }),
    setExportEnabled: () => ({
        type: types.TRANSACTIONS_EXPORT_ENABLED,
    }),
};

export const selectors = {
    isFetching: ({ transactions }) => transactions.fetching,
    isExportDisabled: ({ transactions }) => transactions.exportDisabled,
    getTransactions: ({ transactions }) => transactions.transactions,
    getFilters:({transactions}) => transactions.filters,
    getFiltersExtra:({transactions}) => transactions.filtersExtra,
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
                transactions: action.transactions,
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
                filters:action.filters,
            };
        case types.TRANSACTIONS_EXPORT_ENABLED:
            return {
                ...state,
                exportDisabled: false,
            };
        default:
            return state;
    }
};

export default reducer;