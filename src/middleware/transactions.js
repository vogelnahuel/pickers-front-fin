import * as API from "config/api";

export const getTransactions = (params) => API.get("/ms-admin-rest/api/v1.0/transactions", params);

export const getTransactionsExport = (params) => API.get("/ms-admin-rest/api/v1.0/transactions.csv", params);