import { FilterTransactionsType, TransactionResponseTypeResult } from "sagas/types/transactions"



export type TransactionContainerType ={
     reset:Function
    ,setExtraFilters:Function
    ,getTransactions:Function
    ,setFilters:Function
}
export type URLTransactionContainerType ={
    minMinDeliveryDate?:string,
    maxMinDeliveryDate?:string,
    state?:string,
    date?:{
        from: string,
        until: string
    }
}
export  type TransactionContainerPropsType={
    isExportDisabled:boolean,
    isFetching:boolean,
    transactions:TransactionResponseTypeResult[],
    getMoreTransactions:Function,
    getTransactionsExportRequest:Function,
    filters:FilterTransactionsType,
    seeMore:Function,
    filtersExtraSeeMore:Function,
    resolutionHeightModal:number
}
