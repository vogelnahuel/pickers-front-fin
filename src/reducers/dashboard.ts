import { DashboardType } from "sagas/types/dashboard";
import { RootState } from "store";
import { ActionDashboardType, ActionType, DashboardState, SelectorsDashboardType } from "./types/dashboard";

export const types = {
    DASHBOARD_GET_REQUEST: `DASHBOARD_GET_REQUEST`,
    DASHBOARD_GET_SUCCESS: `DASHBOARD_GET_SUCCESS`,
    DASHBOARD_GET_ERROR: `DASHBOARD_GET_ERROR`,
};

export const INITIAL_STATE: DashboardState = {
    fetching: false,
    dashboard: {},
};

export const actions: ActionType = {
    getDashboardRequest: () => ({
        type: types.DASHBOARD_GET_REQUEST,
    }),
    getDashboardSuccess: (dashboard:DashboardType) => ({
        type: types.DASHBOARD_GET_SUCCESS,
        dashboard
    }),
    getDashboardError: () => ({
        type: types.DASHBOARD_GET_ERROR,
    }),
};

export const selectors: SelectorsDashboardType = {
    isFetching: ({ dashboard }: RootState) => dashboard.fetching,
    getDashboard: ({ dashboard }: RootState) => dashboard.dashboard,
};

const reducer =(state: DashboardState = INITIAL_STATE, action:ActionDashboardType) => {
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