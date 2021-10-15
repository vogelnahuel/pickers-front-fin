import { DetailTransactionType } from "sagas/types/detailTransactions";

export type DetailTransactionPropsType={
    detailTransaction:DetailTransactionType,
    resolutionHeightModal:number,
    closeModalDetailTransaction:Function
}

export type DetailTransactionContainerType={
    detailTransaction:DetailTransactionType,
    closeModalDetailTransaction:Function
}