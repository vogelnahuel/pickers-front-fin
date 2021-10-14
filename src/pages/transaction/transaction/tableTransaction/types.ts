import { TransactionResponseTypeResult } from "sagas/types/transactions"

export type TableTransactionPropsTypes={
    transactions:TransactionResponseTypeResult[],
    getDetailTransaction:Function
}
