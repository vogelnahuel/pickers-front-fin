import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { TransactionsExportContentType, FilterTransactionsType, TransactionResponseContent} from "sagas/types/transactions";


export const getTransactions = (params:FilterTransactionsType) :Promise<AxiosResponse<TransactionResponseContent>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params:FilterTransactionsType): Promise<AxiosResponse<TransactionsExportContentType>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);