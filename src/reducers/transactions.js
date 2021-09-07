export const TRANSACTIONS = "transactions/TRANSACTIONS";

export const types = {
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
    TRANSACTIONS_CLOSE_EXPORT_MODAL: `${TRANSACTIONS}_CLOSE_EXPORT_MODAL`,
    TRANSACTIONS_OPEN_ERROR_DATE_MODAL: `${TRANSACTIONS}_OPEN_ERROR_DATE_MODAL`,
    TRANSACTIONS_RESET: `${TRANSACTIONS}_RESET`,
};

export const INITIAL_STATE = {
    fetching: false,
    exportDisabled: true,
    transactions: [],
    openExportModal: false,
    openErrorDatePicker:false,
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
    setTransactionExtraFilters: (filtersExtra) => ({
        type: types.TRANSACTIONS_SET_EXTRA_FILTERS,
        filtersExtra
    }),
    setExportEnabled: (enabled) => ({
        type: types.TRANSACTIONS_EXPORT_ENABLED,
        enabled
    }),
    setOpenErrorDatePicker: (param) => ({
        type: types.TRANSACTIONS_OPEN_ERROR_DATE_MODAL,
        param
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
    getSeeMore:({transactions}) => transactions.seeMore,
    getFiltersExtraSeeMore:({transactions}) => transactions.filtersExtraSeeMore,
    getOpenExportModal:({transactions}) => transactions.openExportModal,
    getOpenErrorDatePicker:({transactions}) => transactions.openErrorDatePicker,
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
            case types.TRANSACTIONS_OPEN_ERROR_DATE_MODAL:
            return {
                ...state,
                openErrorDatePicker: action.param,
            };
        default:
            return state;
    }
};

export default reducer;