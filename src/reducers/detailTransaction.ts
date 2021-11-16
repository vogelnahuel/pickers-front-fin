import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DetailTransactionCancelItemType,
  DetailTransactionType,
  postCancelType,
  postDevolutionUndeliveredType,
  postDnideliveredResponseType
} from "sagas/types/detailTransactions";
import { RootState } from "store";
import {
  DetailTransactionInicialStateType
} from "./types/detailTransaction";

export const initialState: DetailTransactionInicialStateType = {
  detailTransaction: {
    transaction: {
      id: 0,
      orderNumber: "",
      transactionCode: "",
      inAlert: false,
      sellerId: "",
      externalPickerId: "",
      state: {
        id: 0,
        name: "",
        tag: "",
      },
      sla: "",
      minDeliveryDateTime: "",
      maxDeliveryDateTime: "",
      finishDeliveryTime: "",
      createdAt: "",
      earning: 0,
    },
    origin: {
      name: "",
      street: "",
      streetNumber: "",
      locality: "",
      neighborhood: "",
      state: "",
      postalCode: "",
      country: "",
      floor: "",
      apartment: "",
      observation: "",
      latitude: 0,
      longitude: 0,
      formattedAddress: "",
      distance: 0,
    },
    destination: {
      name: "",
      street: "",
      streetNumber: "",
      locality: "",
      neighborhood: "",
      state: "",
      postalCode: "",
      country: "",
      floor: "",
      apartment: "",
      observation: "",
      latitude: 0,
      longitude: 0,
      formattedAddress: "",
      distance: 0,
    },
    client: {
      name: "",
      lastName: "",
      identificationNumber: "",
      phone: "",
    },
    products: [],
    transactionHistory: [],
    picker: {
      id: "Sin asignar",
      name: "Sin asignar",
      surname: "",
      phone: {
        countryNumber: "",
        areaNumber: "-",
        number: "-",
      },
    },
    seller: {
      id: 0,
      name: "",
      urlNotification: "",
      tag: "",
    },
  },
  messages: [],
  messageSelected: undefined,
};

export const detailTransactionSlice = createSlice({
  name: "detailTransaction",
  initialState,
  reducers: {
    getDetailTransactionRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<string>
    ) => {},
    getResetMessageDetailTransaccions: (
      state: DetailTransactionInicialStateType
    ) => {
      state.messageSelected = undefined;
    },
    getDetailTransactionSuccess: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<DetailTransactionType>
    ) => {
      state.detailTransaction = action.payload;
    },
    getDetailTransactionError: () => {},
    getDetailTransactionMenssagesRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<string>
    ) => {},
    getDetailTransactionMenssagesSuccess: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<DetailTransactionCancelItemType[]>
    ) => {
      state.messages = action.payload;
    },
    getDetailTransactionMenssagesError: () => {},
    getDetailTransactionDevolutionUndeliveredRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<{id: number,params: postDevolutionUndeliveredType}>
    ) => {},
    getDetailTransactionDevolutionUndeliveredError: () => {},
    getDetailTransactionReasonsCanceledRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<{id: string,params: postCancelType}>
    ) => {},
    getDetailTransactionReasonsCanceledError: () => {},
    getDetailTransactionFinishReturnedRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<string>
    ) => {},
    getDetailTransactionFinishReturnedError: () => {},
    getDetailTransactionFinishLostRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<string>
    ) => {},
    getDetailTransactionFinishLostError: () => {},
    getDetailTransactionDniDeliveredRequest: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<{id: string, params: postDnideliveredResponseType}>
    ) => {},
    getDetailTransactionDniDeliveredError: () => {},
    setMessageSelected: (
      state: DetailTransactionInicialStateType,
      action: PayloadAction<DetailTransactionCancelItemType>
    ) => {
      state.messageSelected = action.payload
    },
  },
});

export const detailTransactionSelector = (state: RootState) => state.detailTransaction;

export const actions = detailTransactionSlice.actions;

export default detailTransactionSlice.reducer;
