import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { getTransactionsExportContent, paramsTypeGetTransaction, TransactionResponseContent} from "sagas/types/transactions";


export const getTransactions = (params:paramsTypeGetTransaction) :Promise<AxiosResponse<TransactionResponseContent>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params:paramsTypeGetTransaction): Promise<AxiosResponse<getTransactionsExportContent>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);