import { DetailTransactionCancelItemType, DetailTransactionType } from "sagas/types/detailTransactions";

export type ReasonCanceledPropsType={
    detailTransaction:DetailTransactionType,
    messages:DetailTransactionCancelItemType[]
    selectedMessage: DetailTransactionCancelItemType,
    onBack:Function
    ReasonsCanceledConfirm:Function,

    getMessages:Function,
    setMessageSelected:Function
    resetMessage:Function
}