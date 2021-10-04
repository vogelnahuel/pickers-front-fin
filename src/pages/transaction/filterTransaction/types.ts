export type filterContainerProps={
    filters: object,
    filtersExtra: {limit: number, offset: number},
    getTransactions: Function,
    reset: Function,
    setFilters: Function
}
export type dateType={
    from:string,
    until:string
}
export type filterDate = {
        date?: {from: string, until: string}
        maxMinDeliveryDate?: string
        minMinDeliveryDate?: string
}
export type filterValuesType={
    date: {from: string, until: string}
    inAlert: boolean
    pickerId: number
    state: string
    transactionCode: string
}
export type filterPropsType={
    date?: {from: string, until: string}
    maxMinDeliveryDate?: string
    minMinDeliveryDate?: string
    inAlert?: boolean
    state?: string
}



export type filterTransactionPropsType= {
    onSubmit:Function, 
    filters?:filterPropsType, 
    validationSchema:object
}

export type filtersAppliedType={
    date: {from: string, until: string}
    inAlert: boolean
    maxMinDeliveryDate: string
    minMinDeliveryDate: string
    pickerId: number
    state: string
    transactionCode: string

}