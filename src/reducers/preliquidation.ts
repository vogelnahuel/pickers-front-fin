import {
  Action,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import {
  DetailPreliquidationsContentResponseType,
  PreliquidationItem,
  PreliquidationsContentResponseType,
} from "sagas/types/preliquidation";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { PreliquitadionStateType } from "./types/preliquidation";

export const initialState: PreliquitadionStateType = {
  fetching: false,
  preliquidations: [],
  dirty: false,
  preliquidationsSelected: [],
  filters: {},
  filtersExtra: {
    limit: 0,
    offset: 0
  },
  filtersExtraSeeMore: {
    limit: 0,
    offset: 0
  },
  seeMore: true,
  detailPreliquidations: {
      id: 0,
      emisionDate: "",
      invoiceNumber: "",
      salePoint: "",
      invoiceType: "",
      caeNumber: "",
      fiscalData: {
        fiscalNumber: "",
        companyName: "",
        taxPayerType: "",
        total: 0
      },
      invoiceFile: {
        upload: false,
        url: null
      }
  }
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
    getMorePreliquidationsRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getPreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationsContentResponseType>
    ) => {
      const { payload } = action;
      state.preliquidations = payload.result.items;
      state.seeMore = payload.hasMore;
      state.filtersExtraSeeMore.offset = payload.offset + payload.limit;
    },
    getMorePreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getPreliquidationsError: () => {},
    getMorePreliquidationsError: () => {},
    setPreliquidationFilters: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {
      state.filters = action.payload;
    },
    setPreliquidationExtraFilters: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {
      state.filtersExtra = { ...state.filtersExtra, ...action.payload };
    },
    
    getInvoiceDetailRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getInvoiceDetailError: () => {},
    getInvoiceDetailSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<DetailPreliquidationsContentResponseType>
    ) => {
      const { payload } = action;
      state.detailPreliquidations = payload;
    },
    getInvoiceDetailSaveRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getInvoiceDetailSaveError: () => {},
    getInvoiceDetailSaveSuccess: ()=>{},
    getInvoiceDetailApproveRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getInvoiceDetailApproveError: () => {},
    getInvoiceDetailApproveSuccess: () => {},
    getInvoiceDetailDeleteRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getInvoiceDetailDeleteError: () => {},
    getInvoiceDetailDeleteSuccess: () => {},

    setDirty: (
      state: PreliquitadionStateType,
      action: PayloadAction<boolean>
    ) => {
      state.dirty = action.payload;
    },

    toggleItem: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationItem>
    ) => {
      const item = action.payload;
      const idx = state.preliquidationsSelected.findIndex(p => p.id === item.id);
      
      if (idx >= 0) state.preliquidationsSelected.splice(idx, 1);
      else state.preliquidationsSelected.push(item);
    },
    toggleAll: (state: PreliquitadionStateType) => {
      const approvedItems = state.preliquidations.filter(
        (p) => p.status.tag === "APPROVED"
      );
      // Estan todas las preli seleccionadas
      if (approvedItems.length === state.preliquidationsSelected.length)
        state.preliquidationsSelected = [];
      else state.preliquidationsSelected = approvedItems;
    },
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

export const allPreliquidationsSelected = createSelector(
  (state: RootState) => state.preliquidations,
  (preli) =>
    preli.preliquidations.filter((p) => p.status.tag === "APPROVED").length ===
    preli.preliquidationsSelected.length
);

export default preliquidationSlice.reducer;
