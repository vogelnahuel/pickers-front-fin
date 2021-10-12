import { TransactionResponseTypeResult } from "sagas/types/transactions"

export type TableTransactionPropsTypes={
    setOpenModalTransaction:Function,
    api:TransactionResponseTypeResult[],
    titulos:string[],
    cargarDatos:Function
}
