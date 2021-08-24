import api from '../config/api';
// import { TransactionExportFilters } from './types';
// import { objectToFlatObject } from '../utils/filters';

const TransactionServices = {
  // export: (data ) =>
    // api.post('/apiV2/export/transaction', { selectedFilters: data }),
  getTransactions: (filters) =>
    api.get('/ms-admin-rest/api/v1.0/transactions', {
      // params: objectToFlatObject(filters),
          },
        filters),
  // getDetail: (id: number) => api.get(`/apiV2/transaction/${id}`),
  // process: (transactions: number[]) =>
  //   api.post('/apiV2/orders/point/process', { transactions }),
  // lastTransacrionState: (transactionId: number) =>
  //   api.get(`apiV2/transaction/${transactionId}/payment`),
};

export default TransactionServices;
