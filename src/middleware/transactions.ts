import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { paramsTypeGetExportTransaction, paramsTypeGetTransaction} from "sagas/types/transactions";


export const getTransactions = (params:paramsTypeGetTransaction) :Promise<AxiosResponse<any>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params:paramsTypeGetExportTransaction): Promise<AxiosResponse<any>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);