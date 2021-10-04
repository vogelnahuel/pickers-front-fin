export type  getTransactionType={
    type: string;
    params:paramsTypeGetTransaction
    element?: HTMLElement; 
}
export type paramsTypeGetTransaction={
    date?: {from: string, until: string}
    inAlert?: boolean
    limit: number
    maxMinDeliveryDate?: string
    minMinDeliveryDate?: string
    offset?: number
    state?:string
    pickerId?:number
    transactionCode?:string
}
export type TransactionResponseContent={
        data: TransactionResponseType;
        status: number;
}
export type TransactionResponseType={
    hasMore?: boolean
    limit?: number
    offset?: number
    statusCode?:number
    error?:string
    message?:string
    result: {
        items:[]
    }
}
export type transactionGetMoreType = {
    type: string;
    params:paramsTypeGetTransaction
    element?: HTMLElement; 
}
export type getExportType={
    type: string;
    params:paramsTypeGetExportTransaction
    element?: HTMLElement; 
}
export type paramsTypeGetExportTransaction={
    date?: {from: string, until: string}
    inAlert?: boolean
    limit: number
    maxMinDeliveryDate?: string
    minMinDeliveryDate?: string
    offset?: number
    state?:string
    pickerId?:number
    transactionCode?:string
}


export type getTransactionsExportContent={
    data: string;
    status: number;
}