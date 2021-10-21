import { DetailTransactionCancelItemType, DetailTransactionType } from "sagas/types/detailTransactions";

export type ReasonCanceledPropsType={
    detailTransaction:DetailTransactionType,
    Messages:DetailTransactionCancelItemType[]

    onBack:Function
    ReasonsCanceledConfirm:Function,

    getMessages:Function,
    setMessageSelected:Function
}