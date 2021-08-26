export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types = {
    TRANSACTIONS_GET_REQUEST: `${TRANSACTIONS}_GET_REQUEST`,
    TRANSACTIONS_GET_SUCCESS: `${TRANSACTIONS}_GET_SUCCESS`,
    TRANSACTIONS_GET_ERROR: `${TRANSACTIONS}_GET_ERROR`,
    TRANSACTIONS_SET_FILTERS: `${TRANSACTIONS}_SET_FILTERS`,
};

export const INITIAL_STATE = {
    fetching: false,
    transactions: [],
    filters:{
        limit:4,
        "filter.inAlert": false,
    },
};

export const actions = {
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
};

export const selectors = {
    isFetching: ({ transactions }) => transactions.fetching,
    getTransactions: ({ transactions }) => transactions.transactions,
    getFilters:({transactions}) => transactions.filters,
};


const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default reducer;