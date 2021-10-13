import { DetailTransactionCancelItemType, postCancelType, postDevolutionUndeliveredType, postDnideliveredResponseType } from "sagas/types/detailTransactions";
import {  } from "sagas/types/transactions";
import { RootState } from "store";
import { DetailTransactionActionsType, DetailTransactionActionType, DetailTransactionInicialStateType, DetailTransactionSelectorType, DetailTransactionTypeType } from "./types/detailTransaction";
export const TRANSACTIONS = "DETAIL_TRANSACTIONS";

export const types:DetailTransactionTypeType = {
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
};

export const INITIAL_STATE:DetailTransactionInicialStateType = {
    fetching: false,
    detailtransactions: {
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
                tag: ""
            },
            sla: "",
            minDeliveryDateTime: "",
            maxDeliveryDateTime: "",
            finishDeliveryTime: "",
            createdAt: "",
            earning: 0
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
            distance: 0
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
            distance: 0
        },
        client: {
            name: "",
            lastName: "",
            identificationNumber: "",
            phone: ""
        },
        products: [],
        transactionHistory: [],
        picker: {
            id: 0,
            name: "",
            surname: "",
            phone: {
                countryNumber: "",
                areaNumber: "",
                number: ""
            }
        },
        seller: {
            id: 0,
            name: "",
            urlNotification: "",
            tag: ""
        }
    }
};

export const actions:DetailTransactionActionsType = {
    getDetailTransactionRequest: (id:string) => ({
        type: types.DETAIL_TRANSACTIONS_ID_REQUEST,
        id,
    }),
    getDetailTransactionSuccess: (detailTransaction:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_ID_SUCCESS,
        detailTransaction
    }),
    getDetailTransactionError: () => ({
        type: types.DETAIL_TRANSACTIONS_ID_ERROR,
    }),

    getDetailTransactionMenssagesRequest: (id:string) => ({
        type: types.DETAIL_TRANSACTIONS_MENSSAGES_REQUEST,
        id,
    }),
    getDetailTransactionMenssagesSuccess: (transactions:DetailTransactionCancelItemType) => ({
        type: types.DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS,
        transactions
    }),
    getDetailTransactionMenssagesError: () => ({
        type: types.DETAIL_TRANSACTIONS_MENSSAGES_ERROR,
    }),

    getDetailTransactionDevolutionUndeliveredRequest: ( params:postDevolutionUndeliveredType,id:string) => ({
        type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST,
        params,
        id
    }),
    getDetailTransactionDevolutionUndeliveredSuccess: (transactions:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_SUCCESS,
        transactions
    }),
    getDetailTransactionDevolutionUndeliveredError: () => ({
        type: types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_ERROR,
    }),

    getDetailTransactionReasonsCanceledRequest: (params:postCancelType,id:string) => ({
        type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST,
        params,
        id
    }),
    getDetailTransactionReasonsCanceledSuccess: (transactions:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_SUCCESS,
        transactions
    }),
    getDetailTransactionReasonsCanceledError: () => ({
        type: types.DETAIL_TRANSACTIONS_REASONS_CANCELED_ERROR,
    }),


    getDetailTransactionFinishReturnedRequest: (id:string) => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST,
        id
    }),
    getDetailTransactionFinishReturnedSuccess: (transactions:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_SUCCESS,
        transactions
    }),
    getDetailTransactionFinishReturnedError: () => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_RETURNED_ERROR,
    }),

    getDetailTransactionFinishLostRequest: (id:string) => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST,
        id,
    }),
    getDetailTransactionFinishLostSuccess: (transactions:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_LOST_SUCCESS,
        transactions
    }),
    getDetailTransactionFinishLostError: () => ({
        type: types.DETAIL_TRANSACTIONS_FINISH_LOST_ERROR,
    }),


    getDetailTransactionDniDeliveredRequest: (params:postDnideliveredResponseType,id:string) => ({
        type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST,
        params,
        id
    }),
    getDetailTransactionDniDeliveredSuccess: (transactions:DetailTransactionTypeType) => ({
        type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_SUCCESS,
        transactions
    }),
    getDetailTransactionDniDeliveredError: () => ({
        type: types.DETAIL_TRANSACTIONS_DNI_DELIVERED_ERROR,
    }),
};

export const selectors:DetailTransactionSelectorType = {
    getDetailTransactionID: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionMenssages: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionDevolutionUndelivered: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionReasonsCanceled: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionFinishReturned: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionFinishLost: ({ transactions }:RootState) => transactions.transactions,
    getDetailTransactionDniDelivered: ({ transactions }:RootState) => transactions.transactions,
};


const reducer =(state:DetailTransactionInicialStateType = INITIAL_STATE, action:DetailTransactionActionType ) => {
    switch (action.type) {
        case types.DETAIL_TRANSACTIONS_ID_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_ID_SUCCESS:
            return {
                    ...state,
                    fetching: false,
                    detailTransaction:action.detailTransaction
            };
        case types.DETAIL_TRANSACTIONS_ID_ERROR:
            return {
                  ...state,
                  fetching: false,
              };

        case types.DETAIL_TRANSACTIONS_MENSSAGES_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_MENSSAGES_ERROR:
            return {
                  ...state,
                  fetching: false,
              };

        case types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_ERROR:
                return {
                      ...state,
                      fetching: false,
                  };

        case types.DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_REASONS_CANCELED_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_REASONS_CANCELED_ERROR:
            return {
                  ...state,
                  fetching: false,
              };
        case types.DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_FINISH_RETURNED_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_FINISH_RETURNED_ERROR:
            return {
                  ...state,
                  fetching: false,
              };

        case types.DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_FINISH_LOST_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_FINISH_LOST_ERROR:
            return {
                  ...state,
                  fetching: false,
              };
                   
        case types.DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_DNI_DELIVERED_SUCCESS:
            return {
                    ...state,
                    fetching: true,
            };
        case types.DETAIL_TRANSACTIONS_DNI_DELIVERED_ERROR:
                return {
                      ...state,
                      fetching: false,
                  };       
                          
    
        default:
            break;
    }
};

export default reducer;