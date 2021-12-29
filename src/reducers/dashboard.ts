import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { DashboardType } from "sagas/types/dashboard";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { DashboardState } from "./types/dashboard";

export const initialState: DashboardState = {
  fetching: false,
  dashboard: {},
};

const SLICE_NAME = "dashboard";

const isRequestAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && type.endsWith("Request");
};

const isResponseAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && endsWithAny(type, ["Error", "Success"]);
};

export const dashboardSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getDashboardRequest: () => {},
    getDashboardSuccess: (
      state: DashboardState,
      action: PayloadAction<DashboardType>
    ) => {
      const { payload } = action;
      state.dashboard = payload;
    },
    getDashboardError: () => {},
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

export const dashboardSelector = (state: RootState) => state.dashboard;

export const actions = dashboardSlice.actions;

export default dashboardSlice.reducer;
