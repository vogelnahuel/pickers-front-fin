import { DetailTransactionCancelItemType, DetailTransactionType } from "sagas/types/detailTransactions"

export type DetailTransactionTypeType={
    DETAIL_TRANSACTIONS_ID_REQUEST: string,
    DETAIL_TRANSACTIONS_ID_SUCCESS: string,
    DETAIL_TRANSACTIONS_ID_ERROR: string,

    DETAIL_TRANSACTIONS_MENSSAGES_REQUEST: string,
    DETAIL_TRANSACTIONS_MENSSAGES_SUCCESS: string,
    DETAIL_TRANSACTIONS_MENSSAGES_ERROR: string,

    DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_REQUEST: string,
    DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_SUCCESS: string,
    DETAIL_TRANSACTIONS_DEVOLUTION_UNDELIVERED_ERROR: string,

    DETAIL_TRANSACTIONS_REASONS_CANCELED_REQUEST: string,
    DETAIL_TRANSACTIONS_REASONS_CANCELED_SUCCESS: string,
    DETAIL_TRANSACTIONS_REASONS_CANCELED_ERROR: string,

    DETAIL_TRANSACTIONS_FINISH_RETURNED_REQUEST: string,
    DETAIL_TRANSACTIONS_FINISH_RETURNED_SUCCESS: string,
    DETAIL_TRANSACTIONS_FINISH_RETURNED_ERROR: string,

    DETAIL_TRANSACTIONS_FINISH_LOST_REQUEST: string,
    DETAIL_TRANSACTIONS_FINISH_LOST_SUCCESS: string,
    DETAIL_TRANSACTIONS_FINISH_LOST_ERROR: string,

    DETAIL_TRANSACTIONS_DNI_DELIVERED_REQUEST: string,
    DETAIL_TRANSACTIONS_DNI_DELIVERED_SUCCESS: string,
    DETAIL_TRANSACTIONS_DNI_DELIVERED_ERROR: string,
    CLOSE_MODAL_DETAIL_TRANSACTIONS:string,
    SET_MESSAGE_DETAIL_TRANSACTIONS:string
}
export type DetailTransactionInitialStateType={
    detailTransaction:any
}

export type DetailTransactionActionsType={
    getDetailTransactionRequest:Function,
    getDetailTransactionSuccess:Function,
    getDetailTransactionError:Function,

    getDetailTransactionMenssagesRequest:Function,
    getDetailTransactionMenssagesSuccess:Function,
    getDetailTransactionMenssagesError:Function,

    getDetailTransactionDevolutionUndeliveredRequest:Function,
    getDetailTransactionDevolutionUndeliveredSuccess:Function,
    getDetailTransactionDevolutionUndeliveredError:Function,

    getDetailTransactionReasonsCanceledRequest:Function,
    getDetailTransactionReasonsCanceledSuccess:Function,
    getDetailTransactionReasonsCanceledError:Function,

    getDetailTransactionFinishReturnedRequest:Function,
    getDetailTransactionFinishReturnedSuccess:Function,
    getDetailTransactionFinishReturnedError:Function,

    getDetailTransactionFinishLostRequest:Function,
    getDetailTransactionFinishLostSuccess:Function,
    getDetailTransactionFinishLostError:Function,

    getDetailTransactionDniDeliveredRequest:Function,
    getDetailTransactionDniDeliveredSuccess:Function,
    getDetailTransactionDniDeliveredError:Function,
    getCloseModalDetailTransaction:Function
    setMessageSelected:Function
}
export type DetailTransactionSelectorType={
    getDetailTransaction:Function,
    getDetailTransactionFetching:Function,
    getDetailTransactionMessages:Function
    getDetailTransactionMessage:Function
}
export type DetailTransactionActionType = {
    type:string,
    detailTransaction:DetailTransactionType,
    detailTransactionMessages:DetailTransactionCancelItemType[],
    messageSelected:DetailTransactionCancelItemType
}
export type DetailTransactionInicialStateType={
    fetching: boolean,
    detailTransaction:DetailTransactionType,
    message: DetailTransactionCancelItemType[]
    messageSelected:DetailTransactionCancelItemType
    
}