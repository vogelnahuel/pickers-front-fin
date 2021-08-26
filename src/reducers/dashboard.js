
export const types = {
    DASHBOARD_GET_REQUEST: `DASHBOARD_GET_REQUEST`,
    DASHBOARD_GET_SUCCESS: `DASHBOARD_GET_SUCCESS`,
    DASHBOARD_GET_ERROR: `DASHBOARD_GET_ERROR`,
};



export const INITIAL_STATE = {
    fetching: false,
    dashboard: {},
};

export const actions = {
    getDashboardRequest: () => ({
        type: types.DASHBOARD_GET_REQUEST,
        
    }),
    getDashboardSuccess: (dashboard) => ({
        type: types.DASHBOARD_GET_SUCCESS,
        dashboard
    }),
    getDashboardError: () => ({
        type: types.DASHBOARD_GET_ERROR,
    }),
};

export const selectors = {
    isFetching: ({ dashboard }) => dashboard.fetching,
    getDashboard: ({ dashboard }) => dashboard.dashboard,
};



const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.DASHBOARD_GET_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DASHBOARD_GET_SUCCESS:
            return {
                ...state,
                dashboard: action.dashboard,
                fetching: false,
            };
        case types.DASHBOARD_GET_ERROR:
            return {
                ...state,
                fetching: false,
            };
        default:
            return state;
    }
};
export default reducer;