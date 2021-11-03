import {
  FiltersExtraSeeMoreType,
  FiltersExtraType,
} from "reducers/types/transaction";
import { DetailTransactionHistoryType } from "sagas/types/detailTransactions";
import {
  FilterTransactionsType,
  TransactionResponseTypeResult,
} from "sagas/types/transactions";

export type TransactionHistoryType= {
  transactionHistory:DetailTransactionHistoryType[];
}

export type URLTransactionContainerType = {
  minMinDeliveryDate?: string;
  maxMinDeliveryDate?: string;
  state?: string;
  date?: {
    from: string;
    until: string;
  };
  inAlert?: boolean;
};
export type TransactionContainerPropsType = {
  isFetching: boolean;
  detailTransactionModalOpen:boolean
  isExportDisabled: boolean;
  transactions: TransactionResponseTypeResult[];
  filters: FilterTransactionsType;
  filtersExtra: FiltersExtraType;
  seeMore: boolean;
  filtersExtraSeeMore: FiltersExtraSeeMoreType;

  getTransactionsExportRequest: Function;
  getTransactions: Function;
  getMoreTransactions: Function;
  reset: Function;
  setExtraFilters: Function;
  setFilters: Function;
 
};

export type TransactionType = {
  resolutionHeightModal: number;

  isFetching: boolean;
  isExportDisabled: boolean;
  transactions: TransactionResponseTypeResult[];
  filters: FilterTransactionsType;
  filtersExtra: FiltersExtraType;
  seeMore: boolean;
  filtersExtraSeeMore: FiltersExtraSeeMoreType;

  getTransactionsExportRequest: Function;
  getTransactions: Function;
  getMoreTransactions: Function;
  reset: Function;
  setExtraFilters: Function;
  setFilters: Function;
  detailTransactionModalOpen:boolean
  };
