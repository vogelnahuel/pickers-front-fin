import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import {
  PreliquidationsApiResponse,
  PreliquidationsContentResponseType,
} from "sagas/types/preliquidation";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { PreliquitadionStateType } from "./types/preliquidation";

export const initialState: PreliquitadionStateType = {
  fetching: false,
  preliquidations: [],
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
      action: PayloadAction<PreliquidationsContentResponseType>
    ) => {
      const { payload } = action;
      state.users = payload.result.items;
      state.seeMore = payload.hasMore;
      state.filtersExtraSeeMore.offset = payload.offset + payload.limit;
    },
    getMorePreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
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
