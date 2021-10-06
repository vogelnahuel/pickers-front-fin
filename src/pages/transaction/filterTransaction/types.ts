export type FilterContainerPropsType={
    filters: object,
    filtersExtra: {limit: number, offset: number},
    getTransactions: Function,
    reset: Function,
    setFilters: Function
}
export type DateType={
    from:string,
    until:string
}
export type FilterDateType = {
        maxMinDeliveryDate?: string
        minMinDeliveryDate?: string
}
export type FilterValuesType={
    date: {from: string, until: string}
    inAlert: boolean
    pickerId: number
    state: string
    transactionCode: string
}
export type FilterPropsType={
    date?: {from: string, until: string}
    maxMinDeliveryDate?: string
    minMinDeliveryDate?: string
    inAlert?: boolean
    state?: string
}
export type FilterTransactionPropsType= {
    onSubmit:Function, 
    filters?: object, 
    validationSchema:object
}
