import { AxiosResponse } from "axios";
import * as API from "middleware/api";
import { TransactionsExportContentType, FilterTransactionsType, TransactionResponseContent} from "sagas/types/transactions";
import { GetTransactionIdType, postCancelType, postDevolutionUndeliveredResponseType, postDevolutionUndeliveredType, postDnideliveredResponseType, TransactionCancelResponseType, TransactionIdResponseType, transactionUndeliverableType } from "./types";


export const getTransactions = (params:FilterTransactionsType) :Promise<AxiosResponse<TransactionResponseContent>>=> API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params:FilterTransactionsType): Promise<AxiosResponse<TransactionsExportContentType>> => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);

export const getTransactionId= (params:GetTransactionIdType): Promise<AxiosResponse<TransactionIdResponseType>> => API.get(`/ms-admin-rest/api/v1.0/transactions/${params.id}`);

export const getMessages =  (params:GetTransactionIdType): Promise<AxiosResponse<TransactionCancelResponseType|transactionUndeliverableType>> => API.get(`ms-admin-rest/api/v1.0/transactions/${params.id}/message`);

export const postDevolutionUndelivered = (params:postDevolutionUndeliveredType): Promise<AxiosResponse<postDevolutionUndeliveredResponseType>> => API.post( `/ms-admin-rest/api/v1.0/transactions/${params.impossibleDeliveryReasonId}/in-devolution`,params);

export const postReasonsCanceled = (params:postCancelType): Promise<AxiosResponse<postDevolutionUndeliveredResponseType>> => API.get( `/ms-admin-rest/api/v1.0/transactions/${params.cancellationReasonId}/cancel`,params);

export const postFinishReturned = (params:GetTransactionIdType): Promise<AxiosResponse<postDevolutionUndeliveredResponseType>> => API.get(  `/ms-admin-rest/api/v1.0/transactions/${params.id}/returned`);

export const postFinishLost = (params:GetTransactionIdType): Promise<AxiosResponse<postDevolutionUndeliveredResponseType>> => API.get( `/ms-admin-rest/api/v1.0/transactions/${params.id}/lost`);

export const postDnidelivered = (params:postDnideliveredResponseType): Promise<AxiosResponse<postDevolutionUndeliveredResponseType>> => API.get(`/ms-admin-rest/api/v1.0/transactions/${params.id}/delivered`,params);