import {
  createSlice,
  PayloadAction,
  Action,
  createSelector,
} from "@reduxjs/toolkit";
import { ParamsMiddlewareType, PickerType } from "pages/pickers/types";
import {
  DetailPickerStateType,
  PickerWrongFilePayloadType,
} from "./types/detailPicker";

import { RootState } from "store";
import { endsWithAny } from "utils/endsWithAny";
import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { ExpandableFileSaveParamsType } from "component/admin/ExpandableFile/types";
import { ActionErrorPickersType } from "./types/pickers";

const wrongFilesInitialValue = {
  "dni-front": false,
  "dni-back": false,
  "user-face": false,
  "cbu-certificate": false,
  "driver-insurance-card": false,
  "cuit-certificate": false,
  "driver-license": false,
  "vehicle-identification-back": false,
  "vehicle-identification-front": false,
};

export const initialState: DetailPickerStateType = {
  fetching: false,
  serverError: [],
  dirty: false,
  wrongFiles: wrongFilesInitialValue,
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
        content: [],
      },
      accountingData: {
        status: "",
        content: [],
      },
      vehicle: {
        status: "",
        content: [],
      },
    },
  },
};

const SLICE_NAME = "detailPicker";

const isRequestAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && type.endsWith("Request");
};

const isResponseAction = (action: Action<string>) => {
  const { type } = action;
  return type.startsWith(SLICE_NAME) && endsWithAny(type, ["Error", "Success"]);
};

export const detailPickerSlice = createSlice({
  name: SLICE_NAME,
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
    setWrongFile: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerWrongFilePayloadType>
    ) => {
      const { type, value } = action.payload;
      state.wrongFiles[type] = value;
    },
    resetWrongFiles: (state: DetailPickerStateType) => {
      state.wrongFiles = wrongFilesInitialValue;
      state.serverError = [];
    },
    getPendingUserPickerExportRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<ParamsMiddlewareType>
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
    getPickerFileRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<PickerFileRequestType>
    ) => {},
    getPickerFileSuccess: () => {},
    getPickerFileError: () => {},

    getPickerFileSaveRequest: (
      state: DetailPickerStateType,
      action: PayloadAction<ExpandableFileSaveParamsType>
    ) => {},
    getPickerFileSaveSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<ActionErrorPickersType>
    ) => {
      const {
        payload: { tag },
      } = action;
      state.serverError = state.serverError.filter((t) => t !== tag);
    },
    getPickerFileSaveError: (
      state: DetailPickerStateType,
      action: PayloadAction<ActionErrorPickersType>
    ) => {
      if (!state.serverError?.includes(action.payload.tag))
        state.serverError?.push(action.payload.tag);
    },
    getPickerFileDeleteRequest: (
      state: DetailPickerStateType, //estado actual del  state
      action: any // params Payload<tipo>
    ) => {},
    getPickerFileDeleteSuccess: (
      state: DetailPickerStateType,
      action: PayloadAction<ActionErrorPickersType>
    ) => {
      const {
        payload: { tag },
      } = action;
      state.serverError = state.serverError.filter((t) => t !== tag);
    },
    getPickerFileDeleteError: (
      state: DetailPickerStateType,
      action: PayloadAction<ActionErrorPickersType>
    ) => {
      if (!state.serverError?.includes(action.payload.tag))
        state.serverError?.push(action.payload.tag);
    },
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

// Has picker wrong files?
export const hasPickerWrongFilesSelector = createSelector(
  (state: RootState) => state.detailPicker,
  (picker) =>
    Object.values(picker.wrongFiles).some((v) => v) ||
    picker.serverError?.length > 0
);
export const hasPickerAllFilesLoadedSelector = createSelector(
  (state: RootState) => state.detailPicker,
  (picker) => {
    const personalData = picker.pendingUserAdminPicker.files.personalData;
    const accountingData = picker.pendingUserAdminPicker.files.accountingData;
    const vehicle = picker.pendingUserAdminPicker.files.vehicle;
    const type = picker.pendingUserAdminPicker.vehicle.type;

    if (type === "motorcycle") {
      return (
        personalData.status === "COMPLETED" &&
        accountingData.status === "COMPLETED" &&
        vehicle.status === "COMPLETED"
      );
    }
    return (
      personalData.status === "COMPLETED" &&
      accountingData.status === "COMPLETED"
    );
  }
);

// Se exportan todas las acciones
export const actions = detailPickerSlice.actions;
