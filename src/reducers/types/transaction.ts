import { transactionResponseTypeResult } from "sagas/types/transactions"

export type transactionsTypes={
    TRANSACTIONS_GET_REQUEST:string,
    TRANSACTIONS_GET_MORE_REQUEST:string,
    TRANSACTIONS_GET_SUCCESS:string,
    TRANSACTIONS_GET_MORE_SUCCESS:string,
    TRANSACTIONS_SET_EXTRA_FILTERS:string,

    TRANSACTIONS_GET_ERROR:string,
    TRANSACTIONS_EXPORT_REQUEST:string,
    TRANSACTIONS_EXPORT_SUCCESS:string,
    TRANSACTIONS_EXPORT_ERROR:string,
    TRANSACTIONS_SET_FILTERS:string,
    TRANSACTIONS_EXPORT_ENABLED:string,
    TRANSACTIONS_RESET:string
}
export type InicialStateType={
    fetching: boolean,
    exportDisabled: boolean,
    transactions: [],
    filters: object,
    filtersExtra:{
        limit: number,
        offset: number
    },
    filtersExtraSeeMore: {
        limit:number,
        offset: number
    },
    seeMore:boolean,
}

export type getTransactionsSuccessType={
    items:transactionResponseTypeResult[]
    limit?:number
    offset?:number
    hasMore?:boolean
}

export type setFilterType={
    minMinDeliveryDate:string
    maxMinDeliveryDate:string
    state:string
    pickerId:number
    inAlert:true
    transactionCode:string
}
export type setFilterExtraType={
    limit ?: number
}
export type actionTransactionType={
    reset:Function,
    getTransactionsRequest:Function,
    getMoreTransactionsRequest:Function,
    getTransactionsSuccess:Function,
    getMoreTransactionsSuccess:Function,
    getTransactionsError:Function,
    setTransactionFilters:Function,
    setTransactionExtraFilters:Function,
    setExportEnabled:Function,
    getTransactionsExportRequest:Function,
    getTransactionsExportSuccess:Function,
    getTransactionsExportError:Function
}