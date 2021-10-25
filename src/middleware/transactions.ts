import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { postCancelType, DevolutionUndeliveredResponseType, postDevolutionUndeliveredType, postDnideliveredResponseType, TransactionCancelResponseType, DetailTransactionResponseType } from "sagas/types/detailTransactions";
import { TransactionsExportContentType, FilterTransactionsType, TransactionResponseContent} from "sagas/types/transactions";



export const getTransactions = (params:FilterTransactionsType) :Promise<AxiosResponse<TransactionResponseContent>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);
export const getTransactionsExport = (params:FilterTransactionsType): Promise<AxiosResponse<TransactionsExportContentType>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);

export const getDetailTransaction= (id:string): Promise<AxiosResponse<DetailTransactionResponseType>> => API.get(`/ms-admin-rest/api/v1.0/transactions/${id}`);
export const getMessages =  (id:string): Promise<AxiosResponse<TransactionCancelResponseType>> => API.get(`ms-admin-rest/api/v1.0/transactions/${id}/message`);
export const postDevolutionUndelivered = (params:postDevolutionUndeliveredType,id:string): Promise<AxiosResponse<DevolutionUndeliveredResponseType>> => API.post( `/ms-admin-rest/api/v1.0/transactions/${id}/in-devolution`,params);
export const postReasonsCanceled = (params:postCancelType,id:string): Promise<AxiosResponse<DevolutionUndeliveredResponseType>> => API.post( `/ms-admin-rest/api/v1.0/transactions/${id}/cancel`,params);
export const postFinishReturned = (id:string): Promise<AxiosResponse<DevolutionUndeliveredResponseType>> => API.post(  `/ms-admin-rest/api/v1.0/transactions/${id}/returned`,{});
export const postFinishLost = (id:string): Promise<AxiosResponse<DevolutionUndeliveredResponseType>> => API.post( `/ms-admin-rest/api/v1.0/transactions/${id}/lost`,{});
export const postDnidelivered = (params:postDnideliveredResponseType,id:string): Promise<AxiosResponse<DevolutionUndeliveredResponseType>> => API.post(`/ms-admin-rest/api/v1.0/transactions/${id}/delivered`,params);
