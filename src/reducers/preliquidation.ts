import {
  Action,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { LoadingButtonState } from "component/loadingButton/types";
import { detailPreliquidationDatePicker } from "pages/preliquidation/DetailPreliquidation/invoice/types";
import { PagesPreliquidationTypes } from "pages/preliquidation/DetailPreliquidation/types";
import {
  PreliquidationFilterExtraType,
  PreliquidationFiltersType,
} from "pages/preliquidation/filter/types";
import {
  DetailPreliquidationsContentResponseType,
  InvoiceTypes,
  PreliquidationItem,
  PreliquidationParamsMiddlewareType,
  PreliquidationsContentResponseType,
  AdjustAmountMiddlewareType,
  RejectInvoiceMiddlewareType,
} from "sagas/types/preliquidation";
import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import {
  InvoiceFileStatus,
  PreliquidationsSuccessMoreResponseType,
  PreliquitadionStateType,
} from "./types/preliquidation";

export const initialState: PreliquitadionStateType = {
  fetching: false,
  invoiceFileStatus: {
    error: false,
    loading: false,
    message: "",
  },
  adjustingAmount: LoadingButtonState.Idle,
  showEditPreliquidationModal: false,
  preliquidations: [],
  dirty: false,
  preliquidationsSelected: [],
  filters: {},
  filtersExtra: {
    limit: 3,
    offset: 0,
  },
  seeMore: true,
  filtersExtraSeeMore: {
    limit: 15,
    offset: 0,
  },
  invoiceTypes: [],
  detailPreliquidations: {
    id: 0,
    status: {
      id: 0,
      description: "",
      tag: "",
    },
    generatedAt: "",
    fiscalNumber: "",
    companyName: "",
    sapCode: "",
    total: 0.0,
    manualCorrection: {
      maxAllowedPlus: 0.0,
      maxAllowedSubtract: 0.0,
    },
    histories: [],
    transactions: {
      quantity: 0,
      items: [],
    },
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
  actualPage: "preliquidation",
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
      action: PayloadAction<PreliquidationParamsMiddlewareType>
    ) => {},
    getMorePreliquidationsRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationParamsMiddlewareType>
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
      action: PayloadAction<PreliquidationsSuccessMoreResponseType>
    ) => {
      const { payload } = action;
      state.preliquidations = [...state.preliquidations, ...payload.items];
      state.seeMore = payload.hasMore;
      state.filtersExtraSeeMore.offset = payload.offset + payload.limit;
    },
    getPreliquidationsError: () => {},
    getMorePreliquidationsError: () => {},
    setPreliquidationFilters: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationFiltersType>
    ) => {
      state.filters = action.payload;
    },
    setPreliquidationExtraFilters: (
      state: PreliquitadionStateType,
      action: PayloadAction<PreliquidationFilterExtraType>
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
      action: PayloadAction<detailPreliquidationDatePicker>
    ) => {},
    getInvoiceDetailSaveError: () => {},
    getInvoiceDetailSaveSuccess: () => {},
    getInvoiceDetailApproveRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<detailPreliquidationDatePicker>
    ) => {},
    getInvoiceDetailApproveError: () => {},
    getInvoiceDetailApproveSuccess: () => {},
    getInvoiceDetailDeleteRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<RejectInvoiceMiddlewareType>
    ) => {},
    getInvoiceDetailDeleteError: () => {},
    getInvoiceDetailDeleteSuccess: () => {},
    replaceInvoiceFile: (
      state: PreliquitadionStateType,
      action: PayloadAction<{ id: number; content: string }>
    ) => {},
    replaceInvoiceFileError: (state: PreliquitadionStateType) => {
      state.invoiceFileStatus = {
        loading: false,
        error: true,
        message: "component:label.pdfController.serverError",
      };
    },
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
    toggleModalVisibility: (
      state: PreliquitadionStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showEditPreliquidationModal = action.payload;
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
    adjustAmount: (
      state: PreliquitadionStateType,
      action: PayloadAction<AdjustAmountMiddlewareType>
    ) => {
      state.adjustingAmount = LoadingButtonState.Loading;
    },
    adjustAmountError: (state: PreliquitadionStateType) => {
      state.adjustingAmount = LoadingButtonState.Error;
    },
    adjustAmountSuccess: (state: PreliquitadionStateType) => {
      state.adjustingAmount = LoadingButtonState.Success;
    },
    getDetailPreliquidationsRequest: (
      state: PreliquitadionStateType,
      action: PayloadAction<number>
    ) => {
      state.adjustingAmount = LoadingButtonState.Idle;
    },
    getDetailPreliquidationsError: () => {},
    getDetailPreliquidationsSuccess: (
      state: PreliquitadionStateType,
      action: PayloadAction<any>
    ) => {
      state.detailPreliquidations = action.payload;
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
      action: PayloadAction<PagesPreliquidationTypes>
    ) => {
      state.actualPage = action.payload;
    },
    resetAllSelected: (
      state: PreliquitadionStateType,
      action: PayloadAction
    ) => {
      state.preliquidationsSelected = [];
    },
    resetInvoiceDetail: (state: PreliquitadionStateType) => {
      state.invoiceDetail = initialState.invoiceDetail;
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
export const existApprovedPreliquidation = createSelector(
  (state: RootState) => state.preliquidations,
  (preli) => preli.preliquidations.some((p) => p.status.tag === "approved")
);

export default preliquidationSlice.reducer;
