import { DetailTransactionCancelItemType, DetailTransactionType } from "sagas/types/detailTransactions"

export type ReasonCanceledConfirmPropsType={
    detailTransaction:DetailTransactionType,
    messageSelected?:DetailTransactionCancelItemType

    back:Function

    postReasonsCanceled:Function
}


