import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsMiddlewareType, PickerType } from "pages/pickers/types";
import { DetailPickerStateType } from "./types/detailPicker";
import { ParamGetPendingUser } from "sagas/types/pickers";
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
      id: 0,
      description: "",
    },
    personalData: {
      name: "",
      surname: "",
      dateOfBirth: "",
      identificationNumber: null,
      email: "",
      phone: {},
    },
    accountingData: {
      bankIdentifier: "",
      bankName: "",
      fiscalNumber: "",
    },
    vehicle: {
      bicycle: {
        approve: false,
        expirationDateDriverLicense: "",
        expirationDateIdentificationVehicle: "",
        expirationDatePolicyVehicle: "",
        patent: "",
      },
      motorcycle: {
        approve: false,
        expirationDateDriverLicense: "",
        expirationDateIdentificationVehicle: "",
        expirationDatePolicyVehicle: "",
        patent: "",
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
      action: PayloadAction<ParamGetPendingUser>
    ) => {},
    getPendingUserPickerSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerType>
    ) => {
      const { payload } = action;
      state.pendingUserAdminPicker = payload;
      state.nameDisplay = `${payload.name} ${payload.surname}`;
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
