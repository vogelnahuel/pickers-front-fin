import { PreliTransactionItem } from "reducers/types/preliquidation";

export type TransactionsProps = {
    quantity: number;
    total: number;
    items: PreliTransactionItem[]; 
}