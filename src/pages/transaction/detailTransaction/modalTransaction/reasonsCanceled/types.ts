import { DetailTransactionCancelItemType, DetailTransactionType } from "sagas/types/detailTransactions";

export type ReasonCanceledPropsType={
    detailTransaction:DetailTransactionType,
    messages:DetailTransactionCancelItemType[]
    selectedMessage: DetailTransactionCancelItemType,
    back:Function
    next:Function
    reasonsCanceledConfirm: string,

    getMessages:Function,
    setMessageSelected:Function
    resetMessage:Function
}