import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { PreliquitadionStateType } from "./types/preliquidation";

export const initialState: PreliquitadionStateType = {
  fetching: false,
  preliquidations: [],
  filters: {},
  filtersExtra: {},
  filtersExtraSeeMore: {},
  seeMore: true,
};

const SLICE_NAME = "preliquidation";

const isRequestAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && type.endsWith("Request");
};

const isResponseAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && endsWithAny(type, ["Error", "Success"]);
};

export const preliquidationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset: (state: PreliquitadionStateType) => {
      state = {
        ...initialState,
      };
    },
    getPreliquidationsRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getMoreTransactionsPreliquidationsRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getPreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getMorePreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    setPreliquidationFilters: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {
      state.filters = action.payload;
    },
    getPreliquidationsError: () => {},
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isRequestAction, (state: PreliquitadionStateType) => {
        state.fetching = true;
      })
      .addMatcher(isResponseAction, (state: PreliquitadionStateType) => {
        state.fetching = false;
      }),
});

export const preliquidationSelector = (state: RootState) =>
  state.preliquidations;

export const actions = preliquidationSlice.actions;

export default preliquidationSlice.reducer;