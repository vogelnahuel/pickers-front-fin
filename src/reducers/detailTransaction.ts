import {
  DetailTransactionCancelItemType,
  postCancelType,
  postDevolutionUndeliveredType,
  postDnideliveredResponseType,
} from "sagas/types/detailTransactions";

import { RootState } from "store";
import {
  DetailTransactionActionsType,
  DetailTransactionActionType,
  DetailTransactionInicialStateType,
  DetailTransactionSelectorType,
  DetailTransactionTypeType,
} from "./types/detailTransaction";
export const TRANSACTIONS = "DETAIL_TRANSACTIONS";

export const types: DetailTransactionTypeType = {
  DETAIL_TRANSACTIONS_ID_REQUEST: `${TRANSACTIONS}_ID_REQUEST`,
  DETAIL_TRANSACTIONS_ID_SUCCESS: `${TRANSACTIONS}_ID_SUCCESS`,
  DETAIL_TRANSACTIONS_ID_ERROR: `${TRANSACTIONS}_ID_ERROR`,

  DETAIL_TRANSACTIONS_MENSSAGES_REQUEST: `${TRANSACTIONS}_MENSSAGES_REQUEST`,
  DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS: `${TRANSACTIONS}_MENSSAGES_SUCCESS`,
  DETAIL_TRANSACTIONS_MENSSAGES_ERROR: `${TRANSACTIONS}_MENSSAGES_ERROR`,

  DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST: `${TRANSACTIONS}_DEVOLUTION_UNDELIVERED_REQUEST`,
  DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_SUCCESS: `${TRANSACTIONS}_DEVOLUTION_UNDELIVERED_SUCCESS`,
  DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_ERROR: `${TRANSACTIONS}_DEVOLUTION_UNDELIVERED_ERROR`,

  DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST: `${TRANSACTIONS}_REASONS_CANCELED_REQUEST`,
  DETAIL_TRANSACTIONS_REASONS_CANCELED_SUCCESS: `${TRANSACTIONS}_REASONS_CANCELED_SUCCESS`,
  DETAIL_TRANSACTIONS_REASONS_CANCELED_ERROR: `${TRANSACTIONS}_REASONS_CANCELED_ERROR`,

  DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST: `${TRANSACTIONS}_FINISH_RETURNED_REQUEST`,
  DETAIL_TRANSACTIONS_FINISH_RETURNED_SUCCESS: `${TRANSACTIONS}_FINISH_RETURNED_SUCCESS`,
  DETAIL_TRANSACTIONS_FINISH_RETURNED_ERROR: `${TRANSACTIONS}_FINISH_RETURNED_ERROR`,

  DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST: `${TRANSACTIONS}_FINISH_LOST_REQUEST`,
  DETAIL_TRANSACTIONS_FINISH_LOST_SUCCESS: `${TRANSACTIONS}_FINISH_LOST_SUCCESS`,
  DETAIL_TRANSACTIONS_FINISH_LOST_ERROR: `${TRANSACTIONS}_FINISH_LOST_ERROR`,

  DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST: `${TRANSACTIONS}_DNI_DELIVERED_REQUEST`,
  DETAIL_TRANSACTIONS_DNI_DELIVERED_SUCCESS: `${TRANSACTIONS}_DNI_DELIVERED_SUCCESS`,
  DETAIL_TRANSACTIONS_DNI_DELIVERED_ERROR: `${TRANSACTIONS}_DNI_DELIVERED_ERROR`,

  CLOSE_MODAL_DETAIL_TRANSACTIONS: "CLOSE_MODAL_DETAIL_TRANSACTIONS",

  SET_MESSAGE_DETAIL_TRANSACTIONS: "SET_MESSAGE_DETAIL_TRANSACTIONS",
  RESET_MESSAGE_DETAIL_TRANSACTIONS: "RESET_MESSAGE_DETAIL_TRANSACTIONS",
};

export const INITIAL_STATE: DetailTransactionInicialStateType = {
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

export const actions: DetailTransactionActionsType = {
  getDetailTransactionRequest: (id: string) => ({
    type: types.DETAIL_TRANSACTIONS_ID_REQUEST,
    id,
  }),
  getResetMessageDetailTransaccions: () => ({
    type: types.RESET_MESSAGE_DETAIL_TRANSACTIONS,
  }),
  getDetailTransactionSuccess: (
    detailTransaction: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_ID_SUCCESS,
    detailTransaction,
  }),
  getDetailTransactionError: () => ({
    type: types.DETAIL_TRANSACTIONS_ID_ERROR,
  }),

  getDetailTransactionMenssagesRequest: (id: string) => ({
    type: types.DETAIL_TRANSACTIONS_MENSSAGES_REQUEST,
    id,
  }),
  getDetailTransactionMenssagesSuccess: (
    detailTransactionMessages: DetailTransactionCancelItemType[]
  ) => ({
    type: types.DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS,
    detailTransactionMessages,
  }),
  getDetailTransactionMenssagesError: () => ({
    type: types.DETAIL_TRANSACTIONS_MENSSAGES_ERROR,
  }),

  getDetailTransactionDevolutionUndeliveredRequest: (
    params: postDevolutionUndeliveredType,
    id: string
  ) => ({
    type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST,
    params,
    id,
  }),
  getDetailTransactionDevolutionUndeliveredSuccess: (
    transactions: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_SUCCESS,
    transactions,
  }),
  getDetailTransactionDevolutionUndeliveredError: () => ({
    type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_ERROR,
  }),

  getDetailTransactionReasonsCanceledRequest: (
    params: postCancelType,
    id: string
  ) => ({
    type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST,
    params,
    id,
  }),
  getDetailTransactionReasonsCanceledSuccess: (
    transactions: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_SUCCESS,
    transactions,
  }),
  getDetailTransactionReasonsCanceledError: () => ({
    type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_ERROR,
  }),

  getDetailTransactionFinishReturnedRequest: (id: string) => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST,
    id,
  }),
  getDetailTransactionFinishReturnedSuccess: (
    transactions: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_SUCCESS,
    transactions,
  }),
  getDetailTransactionFinishReturnedError: () => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_ERROR,
  }),

  getDetailTransactionFinishLostRequest: (id: string) => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST,
    id,
  }),
  getDetailTransactionFinishLostSuccess: (
    transactions: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_LOST_SUCCESS,
    transactions,
  }),
  getDetailTransactionFinishLostError: () => ({
    type: types.DETAIL_TRANSACTIONS_FINISH_LOST_ERROR,
  }),

  getDetailTransactionDniDeliveredRequest: (
    params: postDnideliveredResponseType,
    id: string
  ) => ({
    type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST,
    params,
    id,
  }),
  getDetailTransactionDniDeliveredSuccess: (
    transactions: DetailTransactionTypeType
  ) => ({
    type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_SUCCESS,
    transactions,
  }),
  getDetailTransactionDniDeliveredError: () => ({
    type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_ERROR,
  }),

  getCloseModalDetailTransaction: () => ({
    type: types.CLOSE_MODAL_DETAIL_TRANSACTIONS,
  }),
  setMessageSelected: (messageSelected: DetailTransactionCancelItemType) => ({
    type: types.SET_MESSAGE_DETAIL_TRANSACTIONS,
    messageSelected,
  }),
};

export const selectors: DetailTransactionSelectorType = {
  getDetailTransaction: ({detailTransaction}: RootState) =>
    detailTransaction.detailTransaction,
  getDetailTransactionMessages: ({detailTransaction}: RootState) =>
    detailTransaction.messages,
  getSelectedMessage: ({detailTransaction}: RootState) =>
    detailTransaction.messageSelected,
};

const reducer = (
  state: DetailTransactionInicialStateType = INITIAL_STATE,
  action: DetailTransactionActionType
) => {
  switch (action.type) {
    case types.RESET_MESSAGE_DETAIL_TRANSACTIONS:
      return {
        ...state,
        messageSelected: undefined,
      };
    case types.DETAIL_TRANSACTIONS_ID_SUCCESS:
      return {
        ...state,
        detailTransaction: action.detailTransaction,
      };
    case types.DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS:
      return {
        ...state,
        messages: action.detailTransactionMessages,
      };
    case types.SET_MESSAGE_DETAIL_TRANSACTIONS:
      return {
        ...state,
        messageSelected: action.messageSelected,
      };

    default:
      return state;
  }
};

export default reducer;