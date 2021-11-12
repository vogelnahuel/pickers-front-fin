import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import {
  ParamsMiddlewareType,
  PickersParamsType,
  PickersResponse,
} from "pages/pickers/types";
//import { isRequestAction, isResponseAction } from "reducers";
import { RootState } from "store";
import { PickerStateType } from "./types/pickers";

export const initialState: PickerStateType = {
  fetching: false,
  users: [],
  filters: {},
  filtersExtra: {
    limit: 5,
    offset: 0,
  },
  filtersExtraSeeMore: {
    limit: 15,
    offset: 0,
  },
  seeMore: true,
  sizePage: 15,
  actualPage: "PENDING",
};

export const isRequestAction = (action: AnyAction) => {
  return action.type.endsWith("Request");
};

export const isResponseAction = (action: AnyAction) => {
  return action.type.endsWith("Success") || action.type.endsWith("Error");
};

// Una de las ventajas con la que cuenta redux toolkit es la positibilidad de
// escribir "mutating logic" dentro de los reducers.
// No realiza la mutación del estado ya que utiliza la libreria Immer, la cual
// detecta los cambios en un estado "draft" y produce un nuevo estado inmutable.
export const pickersSlice = createSlice({
  name: "pickers",
  initialState,
  reducers: {
    reset: (state: PickerStateType) => {
      state = {
        ...initialState,
        actualPage: state.actualPage,
      };
    },
    getPendingUserRequest: (
      state: PickerStateType,
      action: PayloadAction<ParamsMiddlewareType>
    ) => {},
    getPendingUserSuccess: (
      state: PickerStateType,
      action: PayloadAction<PickersResponse>
    ) => {
      const { payload } = action;
      state.users = payload.items;
      state.seeMore = payload.hasMore;
      state.filtersExtraSeeMore.offset = payload.offset + payload.limit;
    },
    getPendingUserError: () => {},
    setPendingUserFilters: (
      state: PickerStateType,
      action: PayloadAction<PickersParamsType>
    ) => {
      state.filters = action.payload;
    },
    setActualPage: (state: PickerStateType, action: PayloadAction<string>) => {
      state.actualPage = action.payload;
      state.users = [];
    },
    setPendingUserExtraFilters: (
      state: PickerStateType,
      action: PayloadAction<PickersParamsType>
    ) => {
      state.filtersExtra = { ...state.filtersExtra, ...action.payload };
    },
    getMorePendingUserRequest: (
      state: PickerStateType,
      action: PayloadAction<ParamsMiddlewareType>
    ) => {},
    getMorePendingUserSuccess: (
      state: PickerStateType,
      action: PayloadAction<PickersResponse>
    ) => {
      const { payload } = action;
      state.users = [...state.users, ...payload.items];
      state.filtersExtraSeeMore.offset = payload.offset + payload.limit;
      state.seeMore = payload.hasMore;
    },
    getMorePendingUserError: () => {},
    getPendingUserExportRequest: (
      state: PickerStateType,
      action: PayloadAction<{
        params: ParamsMiddlewareType;
        element: HTMLElement;
      }>
    ) => {},
    getPendingUserExportSuccess: () => {},
    getPendingUserExportError: () => {},
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isRequestAction, (state: PickerStateType) => {
        state.fetching = true;
      })
      .addMatcher(isResponseAction, (state: PickerStateType) => {
        state.fetching = false;
      }),
});

// Se exporta el reducer/slice para asociarlo en la creación del store
export default pickersSlice.reducer;

// Selector del slice "pickers"
export const pickersSelector = (state: RootState) => state.pickers;

// Se exportan todas las acciones
export const actions = pickersSlice.actions;
