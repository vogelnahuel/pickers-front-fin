import {
  Action,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import {
  DetailPreliquidationsContentResponseType,
  InvoiceTypes,
  PreliquidationItem,
  PreliquidationsContentResponseType,
} from "sagas/types/preliquidation";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import {
  InvoiceFileStatus,
  PreliquitadionStateType,
} from "./types/preliquidation";

export const initialState: PreliquitadionStateType = {
  fetching: false,
  invoiceFileStatus: {
    error: false,
    loading: false,
    message: "",
  },
  preliquidations: [],
  dirty: false,
  preliquidationsSelected: [],
  filters: {},
  filtersExtra: {
    limit: 0,
    offset: 0,
  },
  filtersExtraSeeMore: {
    limit: 0,
    offset: 0,
  },
  seeMore: true,

  actualPage: "",
  invoiceTypes: [],
  detailPreliquidations: {
    id: 0,
    status: {
      id: 0,
      name: "",
      tag: "",
    },
    generatedAt: "",
  },
  invoiceDetail: {
    id: 0,
    emisionDate: "",
    invoiceNumber: "",
    salePoint: "",
    invoiceType: {
      name: "",
      tag: "",
    },
    caeNumber: "",
    fiscalData: {
      fiscalNumber: "",
      companyName: "",
      taxPayerType: "",
      total: 0,
    },
    invoiceFile: {
      upload: false,
      url: null,
    },
    presettementId: undefined,
  },
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
      action: PayloadAction<string | undefined>
    ) => {},
    getInvoiceDetailError: () => {},
    getInvoiceDetailSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<DetailPreliquidationsContentResponseType>
    ) => {
      const { payload } = action;
      const { presettlement, ...invoice } = payload;
      state.invoiceDetail = invoice;
      state.detailPreliquidations = {
        ...state.detailPreliquidations,
        ...presettlement,
      };
    },
    getInvoiceDetailSaveRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {},
    getInvoiceDetailSaveError: () => {},
    getInvoiceDetailSaveSuccess: () => {},
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
    uploadInvoiceFile: (
      state: PreliquitadionStateType,
      action: PayloadAction<{ id: number; content: string }>
    ) => {},
    uploadInvoiceFileError: (state: PreliquitadionStateType) => {
      state.invoiceFileStatus = {
        loading: false,
        error: true,
        message: "component:label.pdfController.serverError",
      };
    },
    uploadInvoiceFileSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<string>
    ) => {
      state.invoiceFileStatus = {
        loading: false,
        error: false,
        message: "",
      };
      state.invoiceDetail.invoiceFile = {
        upload: true,
        url: action.payload,
      };
    },
    deleteInvoiceFileRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<{ id: number }>
    ) => {},
    deleteInvoiceFileError: (state: PreliquitadionStateType) => {
      state.invoiceFileStatus = {
        loading: false,
        error: true,
        message: "component:label.pdfController.serverError",
      };
    },
    deleteInvoiceFileSuccess: (state: PreliquitadionStateType) => {
      state.invoiceFileStatus = {
        loading: false,
        error: false,
        message: "",
      };
      state.invoiceDetail.invoiceFile = {
        upload: false,
        url: null,
      };
    },

    getInvoiceDetailTypesRequest: () => {},
    getInvoiceDetailTypesError: () => {},
    getInvoiceDetailTypesSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<InvoiceTypes[]>
    ) => {
      const { payload } = action;
      state.invoiceTypes = payload;
    },

    setDirty: (
      state: PreliquitadionStateType,
      action: PayloadAction<boolean>
    ) => {
      state.dirty = action.payload;
    },
    setInvoiceFileStatus: (
      state: PreliquitadionStateType,
      action: PayloadAction<InvoiceFileStatus>
    ) => {
      state.invoiceFileStatus = {
        ...state.invoiceFileStatus,
        ...action.payload,
      };
    },
    setActualPage: (
      state: PreliquitadionStateType,
      action: PayloadAction<string>
    ) => {
      state.actualPage = action.payload;
    },

    toggleItem: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationItem>
    ) => {
      const item = action.payload;
      const idx = state.preliquidationsSelected.findIndex(
        (p) => p.id === item.id
      );

      if (idx >= 0) state.preliquidationsSelected.splice(idx, 1);
      else state.preliquidationsSelected.push(item);
    },
    toggleAll: (state: PreliquitadionStateType) => {
      const approvedItems = state.preliquidations.filter(
        (p) => p.status.tag === "approved"
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
    preli.preliquidationsSelected.length > 0 &&
    preli.preliquidations.filter((p) => p.status.tag === "approved").length ===
      preli.preliquidationsSelected.length
);

export default preliquidationSlice.reducer;
