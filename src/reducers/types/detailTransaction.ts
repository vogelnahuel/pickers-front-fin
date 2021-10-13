export type DetailTransactionType={
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
}
export type DetailTransactionSelectorType={
    getDetailTransactionID:Function,
    getDetailTransactionMenssages:Function
    getDetailTransactionDevolutionUndelivered:Function,
    getDetailTransactionReasonsCanceled:Function,
    getDetailTransactionFinishReturned:Function,
    getDetailTransactionFinishLost:Function,
    getDetailTransactionDniDelivered:Function,
}
export type DetailTransactionActionType = {
    type:string,
}
export type DetailTransactionInicialStateType={
    fetching: boolean,
    Detailtransactions?:DetailTransactionSelectorType[],
}