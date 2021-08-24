export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types = {
    TRANSACTIONS_GET_REQUEST: `${TRANSACTIONS}_GET_REQUEST`,
    TRANSACTIONS_GET_SUCCESS: `${TRANSACTIONS}_GET_SUCCESS`,
    TRANSACTIONS_GET_ERROR: `${TRANSACTIONS}_GET_ERROR`,
};

export const INITIAL_STATE = {
    fetching: false,
    transactions: [],
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
};

export const selectors = {
    isFetching: ({ transactions }) => transactions.fetching,
    getTransactions: ({ transactions }) => transactions.transactions
};

export default (state = INITIAL_STATE, action = {}) => {
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
        default:
            return state;
    }
};
