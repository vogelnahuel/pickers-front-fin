
import { FilterTransactionsType, TransactionResponseTypeResult } from "sagas/types/transactions"


export type TransactionsTypes={
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
export type TransactionStateType={
    fetching: boolean,
    exportDisabled: boolean,
    transactions:TransactionResponseTypeResult[],
    filters: FilterTransactionsType,
    filtersExtra:FiltersExtraType,
    filtersExtraSeeMore: FiltersExtraSeeMoreType,
    seeMore:boolean,
    detailTransactionModalOpen:boolean
}
export type FiltersExtraSeeMoreType={
    limit:number,
    offset: number
}
export type FiltersExtraType={
    limit:number,
    offset: number
}
export type GetTransactionsSuccessType={
    items:TransactionResponseTypeResult[]
    limit:number
    offset:number
    hasMore:boolean
}

export type SetFilterType={
    minMinDeliveryDate:string
    maxMinDeliveryDate:string
    state:string
    pickerId:number
    inAlert:boolean
    transactionCode:string
}

export type SetFilterExtraType={
    limit ?: number
}
export type SelectorTransactionType={
    isFetching:Function,
    isExportDisabled:Function,
    getTransactions:Function,
    getFilters:Function,
    getFiltersExtra:Function,
    getSeeMore:Function,
    getFiltersExtraSeeMore:Function,
    getDetailTransactionModalOpen:Function
}
export type TransactionActionsType={
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
export type TransactionActionType = {
    type:string,
    transactions:any//Todo revisar esto  //TransactionResponseType
    filters:FilterTransactionsType,
    enabled:string | number | undefined
    filtersExtra:SetFilterExtraType
}