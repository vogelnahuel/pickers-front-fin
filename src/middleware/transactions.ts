import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { TransactionsExportContentType, FilterTransactionsType, TransactionResponseContent} from "sagas/types/transactions";


export const getTransactions = (params:FilterTransactionsType) :Promise<AxiosResponse<TransactionResponseContent>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params:FilterTransactionsType): Promise<AxiosResponse<TransactionsExportContentType>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);

export const getTransactionId= (params:any): Promise<AxiosResponse<any>> => API.get(`/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}`);

export const getMessages =  (params:any): Promise<AxiosResponse<any>> => API.get(`ms-admin-rest/api/v1.0/transactions/${params.FilterSelectedTransaction.transaction.id}/message`);

export const postDevolutionUndelivered = (params:any): Promise<AxiosResponse<any>> => API.post( `/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}/in-devolution`,params);

export const postReasonsCanceled = (params:any): Promise<AxiosResponse<any>> => API.get( `/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}/cancel`,params);

export const postFinishReturned = (params:any): Promise<AxiosResponse<any>> => API.get(  `/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}/returned`);

export const postFinishLost = (params:any): Promise<AxiosResponse<any>> => API.get( `/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}/lost`);

export const postDnidelivered = (params:any): Promise<AxiosResponse<any>> => API.get(`/ms-admin-rest/api/v1.0/transactions/${params.transaction.id}/delivered`,params);