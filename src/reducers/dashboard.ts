import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { DashboardState } from "./types/dashboard";

export const initialState: DashboardState = {
  fetching: false,
  dashboard: {},
};

const isRequestAction = (action: AnyAction) => {
  return action.type.endsWith("Request");
};

const isResponseAction = (action: AnyAction) => {
  return action.type.endsWith("Success") || action.type.endsWith("Error");
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboardRequest: (state:DashboardState) =>{},
    getDashboardSuccess: (state:DashboardState, action:any) => {
        const {payload} = action;
        state.dashboard=payload
    },
    getDashboardError: (state:DashboardState)=>{}
  },
  extraReducers: (builder) =>
  builder
    .addMatcher(isRequestAction, (state: DashboardState) => {
      state.fetching = true;
    })
    .addMatcher(isResponseAction, (state: DashboardState) => {
      state.fetching = false;
    }),
});


// Se exporta el reducer/slice para asociarlo en la creación del store
export default dashboardSlice.reducer;

// Selector del slice "pickers"
export const dashboardSelector = (state: RootState) => state.dashboard;

// Se exportan todas las acciones
export const actions = dashboardSlice.actions;
