import {
  FiltersExtraSeeMoreType,
  FiltersExtraType,
} from "reducers/types/transaction";
import {
  FilterTransactionsType,
  TransactionResponseTypeResult,
} from "sagas/types/transactions";


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
  export type TransactionActionTagType = {
    assigned_picker:                    string;
    un_assigning:                       string;
    state_pending_assigment:            string;
    state_assigned:                     string;
    state_in_pickup:                    string;
    state_in_pickup_point:              string;
    state_in_picked_up:                 string;
    state_in_delivery:                  string;
    state_in_delivery_point:            string;
    state_in_devolution:                string;
    state_pickup_cancelled_temporally:  string;
    state_pickup_cancelled_permanently: string;
    state_delivered:                    string;
    state_returned:                     string;
    state_lost:                         string;
    state_initial:                      string;
  }
