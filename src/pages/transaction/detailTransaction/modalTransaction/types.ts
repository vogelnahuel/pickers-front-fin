import { DetailTransactionType } from "sagas/types/detailTransactions";

export type HistoryModalTransactionType ={
    detailTransaction:DetailTransactionType;
    cancel:Function;
    finish:Function;
    onSubmit:Function;
}