import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isRequestAction, isResponseAction } from "reducers";
import { FilterTransactionsType } from "sagas/types/transactions";
import { RootState } from "store";
import {
  GetTransactionsSuccessType, SetFilterExtraType,
  SetFilterType, TransactionStateType
} from "./types/transaction";

export const initialState: TransactionStateType = {
  fetching: false,
  detailTransactionModalOpen: false,
  exportDisabled: true,
  transactions: [],
  filters: {
    inAlert: undefined,
    maxMinDeliveryDate: undefined,
    minMinDeliveryDate: undefined,
    offset: undefined,
    state: undefined,
    pickerId: undefined,
    transactionCode: undefined,
  },
  filtersExtra: {
    limit: 3,
    offset: 0,
  },
  filtersExtraSeeMore: {
    limit: 15,
    offset: 0,
  },
  seeMore: true,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state: TransactionStateType) => {
      state = {
        ...initialState,
      };
    },
    getTransactionsRequest: (
      state: TransactionStateType,
      action: PayloadAction<FilterTransactionsType>
      ) => {},
    getMoreTransactionsRequest: (
      state: TransactionStateType,
      action: PayloadAction<FilterTransactionsType>
      ) => {},
    getTransactionsSuccess: (
      state: TransactionStateType,
      action: PayloadAction<GetTransactionsSuccessType>) => {
        state.transactions= action.payload.items;
        state.seeMore= action.payload.hasMore;
        state.filtersExtraSeeMore.offset= action.payload.offset + action.payload.limit;
        state.fetching= false;
    },
    getMoreTransactionsSuccess: (
      state: TransactionStateType,
      action: PayloadAction<GetTransactionsSuccessType>
    ) => {
      state.transactions= state.transactions.concat(action.payload.items);
      state.seeMore= action.payload.hasMore;
      state.filtersExtraSeeMore.offset= action.payload.offset + action.payload.limit;
      state.fetching= false;
    },
    getTransactionsError: () => {},
    setTransactionFilters: (
      state: TransactionStateType,
      action: PayloadAction<SetFilterType>) => {
      state.filters = action.payload;
    },
    setTransactionExtraFilters: (      
      state: TransactionStateType,
      action: PayloadAction<SetFilterExtraType>) => {
      state.filtersExtra = { ...state.filtersExtra, ...action.payload };
    },
    setExportEnabled: (
      state: TransactionStateType,
      action: PayloadAction< string | number | undefined>) => {
      state.exportDisabled= action.payload === undefined;
    },
    getTransactionsExportRequest: (
      state: TransactionStateType,
      action: PayloadAction<FilterTransactionsType>) => {},
    getTransactionsExportSuccess: () => {},
    getTransactionsExportError: () => {},
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isRequestAction, (state: TransactionStateType) => {
        state.fetching = true;
      })
      .addMatcher(isResponseAction, (state: TransactionStateType) => {
        state.fetching = false;
      }),
});

export const transactionsSelector = (state: RootState) => state.transactions;

export const actions = transactionSlice.actions;

export default transactionSlice.reducer;