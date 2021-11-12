import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsMiddlewareType, PickerType } from "pages/pickers/types";
import { DetailPickerStateType } from "./types/detailPicker";

import { RootState } from "store";
import { isRequestAction, isResponseAction } from "reducers";

export const initialState: DetailPickerStateType = {
  fetching: false,
  dirty: false,
  nameDisplay: "",
  pendingUserAdminPicker: {
    id: 0,
    enable: false,
    registerDatetime: "",
    status: {
      description: "",
      id: 0,
    },
    personalData: {
      name: "",
      surname: "",
      dateOfBirth: null,
      identificationNumber: null,
      email: "",
      phone: {
        areaNumber: "",
        countryNumber: "",
        number: "",
        registerDate: undefined,
      },
    },
    accountingData: {
      bankIdentifier: "",
      bankName: "",
      fiscalNumber: "",
    },
    vehicle: {
      type: "",
      active: false,
      approve: false,
      patent: "",
      expirationDateDriverLicense: "",
      expirationDateIdentificationVehicle: "",
      expirationDatePolicyVehicle: "",
    },
    files: {
      personalData: {
        status: "",
        contents: [],
      },
      accountingData: {
        status: "",
        contents: [],
      },
      vehicle: {
        status: "",
        contents: [],
      },
    },
  },
};

export const detailPickerSlice = createSlice({
  name: "detailPicker",
  initialState,
  reducers: {
    getPendingUserPickerRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<number>
    ) => {},
    getPendingUserPickerSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      const { payload } = action;
      state.pendingUserAdminPicker = payload;
      state.nameDisplay = `${payload.personalData.name} ${payload.personalData.surname}`;
    },
    getPendingUserPickerError: () => {},
    setDirty: (
      state: DetailPickerStateType,
      action: PayloadAction<boolean>
    ) => {
      state.dirty = action.payload;
    },
    getPendingUserPickerExportRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<{
        params: ParamsMiddlewareType;
        element: HTMLElement;
      }>
    ) => {},
    getPendingUserPickerExportSuccess: () => {},
    getPendingUserPickerExportError: () => {},
    getPendingUserPickerDocumentsEditRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      state.pendingUserAdminPicker = action.payload;
    },
    getPendingUserPickerDocumentsEditSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      state.pendingUserAdminPicker = action.payload;
    },
    getPendingUserPickerDocumentsEditError: () => {},
    getAprovePickerRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<{ params: PickerType; goBack: Function }>
    ) => {
      state.pendingUserAdminPicker = action.payload.params;
    },
    getAprovePickerSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      state.pendingUserAdminPicker = action.payload;
    },
    getAprovePickerError: () => {},
    getEditPickerRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<{ params: PickerType; goBack: Function }>
    ) => {},
    getEditPickerSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      state.pendingUserAdminPicker = action.payload;
    },
    getEditPickerError: () => {},
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isRequestAction, (state: DetailPickerStateType) => {
        state.fetching = true;
      })
      .addMatcher(isResponseAction, (state: DetailPickerStateType) => {
        state.fetching = false;
      }),
});

// Se exporta el reducer/slice para asociarlo en la creación del store
export default detailPickerSlice.reducer;

// Selector del slice "detailPicker"
export const detailPickerSelector = (state: RootState) => state.detailPicker;

// Se exportan todas las acciones
export const actions = detailPickerSlice.actions;
